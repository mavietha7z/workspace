import { config } from 'dotenv';
import { User } from '../model/user.model';
import { Course } from '../model/course.model';
import { VerifyEmail } from '../model/verify.model';

config();

const userController = {
    // Lấy tất dữ liệu người dùng theo type
    getUsers: async (req, res) => {
        try {
            const { type, id, page } = req.query;

            if (type === 'all' && !id && !page) {
                const allUsers = await User.find({}).select('-password');

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: allUsers,
                });
            } else if (type === 'uid' && id && !page) {
                const user = await User.findById(id).select('-password');

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: user,
                });
            } else if (type === 'lock' && !id && !page) {
                const users = await User.find({ status: false }).select('-password');

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: users,
                });
            } else if (page) {
                const numberPage = Number(page);
                const pageSize = 20;
                const skip = (numberPage - 1) * pageSize;
                const count = await User.countDocuments();
                const totalPages = Math.ceil(count / pageSize);

                const users = await User.find({})
                    .select('admin avatar createdAt email name status tick updatedAt username')
                    .skip(skip)
                    .limit(pageSize)
                    .sort({ createdAt: -1 })
                    .exec();

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: users,
                    totalPages: totalPages,
                });
            } else {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Yêu cầu không hợp lệ',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Xóa người dùng theo type
    deleteUser: async (req, res) => {
        try {
            const { id } = req.query;

            if (id.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid không hợp lệ',
                });
            }
            const user = await User.findById(id);
            const verifyEmail = await VerifyEmail.findOne({ email: user.email });

            if (user) {
                if (user.createdAt > new Date('2023-02-13')) {
                    await user.delete();
                    await verifyEmail.delete();

                    res.status(200).json({
                        statusCode: 0,
                        message: 'Yêu cầu thành công',
                    });
                } else {
                    res.status(403).json({
                        statusCode: 3,
                        message: 'Forbidden - Cannot delete data before 13-02-2023',
                    });
                }
            } else {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Người dùng không tồn tại',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Đăng ký khóa học
    registerCourse: async (req, res) => {
        try {
            const { id } = req.user;
            const { path } = req.query;

            const course = await Course.findOne({ slug: path });

            if (!course) {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Khóa học không tồn tại',
                });
            } else {
                const newCourse = {
                    course: course._id,
                    progression: 0,
                    lastCompletedAt: new Date(),
                };

                await User.findByIdAndUpdate(id, { $push: { myCourses: newCourse } });

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Lấy dữ liệu trang cá nhân bằng username
    getUserByUserName: async (req, res) => {
        try {
            const { username } = req.params;

            const user = await User.findOne({ username })
                .select('-password -notify -myBlogs -status -email -username -postSave -myComments')
                .populate({
                    path: 'myCourses',
                    populate: {
                        path: 'course',
                        model: 'Course',
                        select: 'title image description slug',
                    },
                })
                .populate({
                    path: 'activities',
                    populate: {
                        path: 'partner user',
                        model: 'User',
                        select: 'name username tick avatar admin',
                    },
                });

            if (!user) {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Người dùng không tồn tại',
                });
            } else {
                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: user,
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Thay đổi avatar người dùng
    changeAvatarUser: async (req, res) => {
        try {
            const urlAvatar = req.file.path;
            const { id } = req.user;

            await User.findByIdAndUpdate(id, { avatar: urlAvatar });

            res.status(200).json({
                statusCode: 0,
                message: 'Yêu cầu thành công',
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Thay đổi ảnh bìa người dùng
    changeCoverUser: async (req, res) => {
        try {
            const urlCover = req.file.path;
            const { id } = req.user;

            await User.findByIdAndUpdate(id, { cover: urlCover });

            res.status(200).json({
                statusCode: 0,
                message: 'Yêu cầu thành công',
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Thay đổi thông tin người dùng
    changeInfoUser: async (req, res) => {
        try {
            // Lấy giá trị người dùng cần cập nhật gửi lên
            const { id } = req.user;
            const keyData = Object.keys(req.body)[0];
            const valueData = req.body[keyData];

            // Hàm kiểm tra xem dữ liệu người dùng gửi lên hợp lệ hay không
            const isValidate = async (keyData, valueData) => {
                switch (keyData) {
                    case 'facebook':
                        return valueData.includes('https://www.facebook.com/');
                    case 'twitter':
                        return valueData.includes('https://twitter.com/');
                    case 'instagram':
                        return valueData.includes('https://www.instagram.com/');
                    case 'youtube':
                        return valueData.includes('https://www.youtube.com/channel/');
                    case 'linkedin':
                        return valueData.includes('https://www.linkedin.com/in/');
                    case 'name':
                        const checkName = /^[\u00C0-\u1FFF\u2C00-\uD7FF\w ]+$/;
                        return checkName.test(valueData) && valueData.length >= 2;
                    case 'bio':
                        return valueData.length > 1 && valueData.length <= 50;
                    default:
                        return false;
                }
            };

            const check = await isValidate(keyData, valueData);
            if (!check) {
                return res.status(400).json({
                    statusCode: 1,
                    message: `${keyData} không hợp lệ`,
                });
            } else {
                await User.findByIdAndUpdate(id, { [keyData]: valueData }, { new: true }).select('-password');

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Xem thông báo theo type
    markWatched: async (req, res) => {
        try {
            const { watch, type } = req.query;
            const { id } = req.user;

            if (type === 'all' && !watch) {
                await User.updateMany({ _id: id }, { $set: { 'notify.$[].watch': true } });

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                });
            } else if (type === 'odd' && watch) {
                await User.updateOne({ _id: id, 'notify._id': watch }, { $set: { 'notify.$.watch': true } });

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                });
            } else {
                res.status(404).json({
                    statusCode: 1,
                    message: 'Yêu cầu không hợp lệ',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Lấy dữ liệu bài viết đã lưu
    getPostSave: async (req, res) => {
        try {
            const { id } = req.user;

            const postSave = await User.findById(id)
                .select('postSave')
                .populate({
                    path: 'postSave',
                    populate: {
                        path: 'post',
                        model: 'Blog',
                        select: 'title slug author',
                        populate: {
                            path: 'author',
                            model: 'User',
                            select: 'name',
                        },
                    },
                });

            res.status(200).json({
                statusCode: 0,
                message: 'Yêu cầu thành công',
                data: postSave.postSave,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Thay đổi trạng thái
    toggleStatusChange: async (req, res) => {
        try {
            const { type, id } = req.query;

            if (id.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid người dùng không hợp lệ',
                });
            }

            const user = await User.findById(id);

            if (user) {
                if (type === 'status') {
                    user.status = !user.status;
                    await user.save();

                    res.status(200).json({
                        statusCode: 0,
                        message: 'Yêu cầu thành công',
                    });
                } else if (type === 'tick') {
                    user.tick = !user.tick;
                    await user.save();

                    res.status(200).json({
                        statusCode: 0,
                        message: 'Yêu cầu thành công',
                    });
                } else {
                    res.status(400).json({
                        statusCode: 1,
                        message: 'Yêu cầu không hợp lệ',
                    });
                }
            } else {
                res.status(400).json({
                    statusCode: 2,
                    message: 'Người dùng không tồn tại',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

export default userController;
