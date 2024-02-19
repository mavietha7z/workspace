import cron from 'node-cron';
import { Course } from '../model/course.model';
import { User } from '../model/user.model';

const incrementAmount = 10;
cron.schedule('0 * * * *', async () => {
    try {
        const courses = await Course.find({});

        for (const course of courses) {
            const randomNumber = Math.floor(Math.random() * incrementAmount);
            await course.updateOne({ $inc: { userLearning: randomNumber } });
        }
    } catch (error) {
        console.log('error: ', error);
    }
}).start();

const courseController = {
    // Thêm mới khóa học
    createCourse: async (req, res) => {
        try {
            const { type } = req.query;
            const { title, slug, video, priority, price, oldPrice, preOrderPrice, whatLearn, description, comingSoon } =
                req.body;

            const isSlug = await Course.findOne({ slug });

            if (isSlug) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Slug đã tồn tại',
                });
            }

            const image = req.files['image'][0].path;

            if (type === 'pro' && comingSoon === '1') {
                const newCourse = new Course({
                    title,
                    slug,
                    priority,
                    image,
                    comingSoon: true,
                    pro: true,
                });
                await newCourse.save();

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                });
            } else {
                const whatLearnJson = JSON.parse(whatLearn);
                const icon = req.files['icon'][0].path;

                if (type === 'free') {
                    const newCourse = new Course({
                        title,
                        slug,
                        video,
                        priority,
                        learnWhat: whatLearnJson,
                        description,
                        image,
                        icon,
                    });
                    await newCourse.save();

                    res.status(200).json({
                        statusCode: 0,
                        message: 'Yêu cầu thành công',
                    });
                } else {
                    const newCourse = new Course({
                        title,
                        slug,
                        video,
                        priority,
                        price,
                        oldPrice,
                        preOrderPrice,
                        learnWhat: whatLearnJson,
                        comingSoon,
                        image,
                        icon,
                        pro: true,
                        selling: true,
                    });
                    await newCourse.save();

                    res.status(200).json({
                        statusCode: 0,
                        message: 'Yêu cầu thành công',
                    });
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Lấy khóa học theo type
    getCourses: async (req, res) => {
        try {
            const { type, id } = req.query;

            const coursesPro = await Course.find({ pro: true, status: true })
                .select(
                    'image priority slug userLearning comingSoon published selling oldPrice preOrderPrice title price'
                )
                .sort({ priority: 1 });

            const coursesFree = await Course.find({ pro: false, status: true })
                .select('image priority slug userLearning comingSoon published selling oldPrice preOrderPrice title')
                .sort({ priority: 1 });

            if (type === 'all') {
                const courses = await Course.find({})
                    .populate({
                        path: 'chapter',
                        model: 'Chapter',
                        populate: {
                            path: 'lesson',
                            model: 'Lesson',
                        },
                    })
                    .sort({ createdAt: -1 });

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: courses,
                });
            } else if (type === 'tab') {
                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: { coursesPro, coursesFree },
                });
            } else if (type === 'pro') {
                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: coursesPro,
                });
            } else if (type === 'free') {
                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: coursesFree,
                });
            } else if (type === 'uid') {
                const course = await Course.findById(id)
                    .select('chapter title')
                    .populate({
                        path: 'chapter',
                        model: 'Chapter',
                        populate: {
                            path: 'lesson',
                            model: 'Lesson',
                            select: 'nameLesson timeVideo urlVideo',
                        },
                    });

                if (course) {
                    res.status(200).json({
                        statusCode: 0,
                        message: 'Yêu cầu thành công',
                        data: course,
                    });
                } else {
                    res.status(404).json({
                        statusCode: 2,
                        message: 'Khóa học không tồn tại',
                    });
                }
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

    // Lấy dữ liệu quá học bằng slug
    getCourseByPathName: async (req, res) => {
        try {
            const { course } = req.query;
            const { id } = req.user;

            if (!course) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Parameter không được để trống',
                });
            }

            const courseRegistered = await User.findById(id)
                .select('myCourses')
                .populate({
                    path: 'myCourses',
                    populate: {
                        path: 'course',
                        model: 'Course',
                        select: 'slug',
                    },
                });

            const registered = courseRegistered.myCourses.find((myCourse) => myCourse.course.slug === course);

            const courses = await Course.findOne({ slug: course }).populate({
                path: 'chapter',
                populate: {
                    path: 'lesson',
                    model: 'Lesson',
                    select: 'nameLesson timeVideo',
                },
            });

            if (courses) {
                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: courses,
                    registered: !!registered,
                });
            } else {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Khóa học không tồn tại',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Cập nhật khóa học
    updateCourse: async (req, res) => {
        try {
            const { id } = req.query;
            const {
                title,
                image,
                icon,
                comingSoon,
                preOrder,
                pro,
                published,
                priority,
                slug,
                video,
                price,
                oldPrice,
                preOrderPrice,
                description,
                learnWhat,
            } = req.body;

            const course = await Course.findById(id);

            if (!course) {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Khóa học không tồn tại',
                });
            } else {
                if (course.createdAt > new Date('2023-02-13')) {
                    const isSlug = await Course.findOne({ slug });

                    if (isSlug && isSlug.slug !== course.slug) {
                        return res.status(400).json({
                            statusCode: 1,
                            message: 'Slug đã tồn tại',
                        });
                    }

                    const newCourse = {
                        title,
                        image,
                        icon,
                        comingSoon,
                        preOrder,
                        pro,
                        published,
                        priority,
                        slug,
                        video,
                        price,
                        oldPrice,
                        preOrderPrice,
                        description,
                        learnWhat,
                    };

                    await course.updateOne({ $set: newCourse });

                    res.status(200).json({
                        statusCode: 0,
                        message: 'Cập nhật khóa học thành công',
                    });
                } else {
                    res.status(403).json({
                        statusCode: 3,
                        message: 'Forbidden - Cannot update data before 13-02-2023',
                    });
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Xóa khóa học theo type
    deleteCourse: async (req, res) => {
        try {
            const { type, id } = req.query;

            if (type === 'uid' && id) {
                if (id.length < 24) {
                    return res.status(400).json({
                        statusCode: 1,
                        message: 'Uid khóa học không hợp lệ',
                    });
                }

                const course = await Course.findById(id);
                if (course) {
                    if (course.createdAt > new Date('2023-02-13')) {
                        await course.delete();

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
                        message: 'Khóa học không tồn tại',
                    });
                }
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

    // Bật tắt trạng thái khóa học
    toggleStatusCourse: async (req, res) => {
        try {
            const { id } = req.query;

            if (id.length < 24) {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Uid không hợp lệ',
                });
            } else {
                const course = await Course.findById(id);

                if (course) {
                    course.status = !course.status;
                    await course.save();

                    res.status(200).json({
                        statusCode: 0,
                        message: 'Yêu cầu thành công',
                    });
                } else {
                    res.status(404).json({
                        statusCode: 2,
                        message: 'Khóa học không tồn tại',
                    });
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Lấy dữ liệu bài học đã đăng ký
    getCoursesRegistered: async (req, res) => {
        try {
            const { id } = req.user;

            const user = await User.findOne({ _id: id })
                .select('myCourses')
                .populate({
                    path: 'myCourses',
                    populate: {
                        path: 'course',
                        model: 'Course',
                        select: 'title image slug userLearning userProgress lastCompletedAt',
                    },
                });

            const { myCourses, ...other } = user._doc;

            res.status(200).json({
                statusCode: 0,
                message: 'Yêu cầu thành công',
                data: myCourses,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

export default courseController;
