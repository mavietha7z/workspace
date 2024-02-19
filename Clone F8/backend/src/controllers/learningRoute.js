import mongoose from 'mongoose';
import { Course } from '../model/course.model';
import { Learning } from '../model/learning.model';

const learningRoute = {
    // Lấy dữ liệu lộ trình học
    getLearningRoute: async (req, res) => {
        try {
            const { type } = req.query;

            if (type === 'tab') {
                const frontEnd = await Learning.findById('63b463f061e0c8dc9ddfa91e')
                    .select('description title image priority slug status')
                    .populate({
                        path: 'groups',
                        select: 'courses',
                        populate: {
                            path: 'courses',
                            model: 'Course',
                            select: 'title icon slug',
                        },
                    });

                const backEnd = await Learning.findById('63b52754bd5c401fb17d0a3a')
                    .select('description title image priority slug status')
                    .populate({
                        path: 'groups',
                        select: 'courses',
                        populate: {
                            path: 'courses',
                            model: 'Course',
                            select: 'title icon slug',
                        },
                    });

                const allCoursesFrontEnd = [];
                for (let i = 0; i < frontEnd.groups.length; i++) {
                    for (let j = 0; j < frontEnd.groups[i].courses.length; j++) {
                        allCoursesFrontEnd.push(frontEnd.groups[i].courses[j]);
                    }
                }

                const allCoursesBackEnd = [];
                for (let i = 0; i < backEnd.groups.length; i++) {
                    for (let j = 0; j < backEnd.groups[i].courses.length; j++) {
                        allCoursesBackEnd.push(backEnd.groups[i].courses[j]);
                    }
                }

                let { groups: frontEndGroups, ...frontEndOther } = frontEnd._doc;
                let { groups: backEndGroups, ...backEndOther } = backEnd._doc;

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: [
                        { ...frontEndOther, courses: allCoursesFrontEnd },
                        { ...backEndOther, courses: allCoursesBackEnd },
                    ],
                });
            } else if (type === 'all') {
                const learningPath = await Learning.find({}).sort({ createdAt: -1 });

                return res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: learningPath,
                });
            } else {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Yêu cầu không hợp lệ',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Thêm mới lộ trình học
    createLearningPath: async (req, res) => {
        try {
            const { title, slug, content, description, priority } = req.body;
            const image = req.file.path;

            const newLearningPath = new Learning({
                title,
                content,
                description,
                image,
                priority,
                slug,
            });

            await newLearningPath.save();

            res.status(200).json({
                statusCode: 0,
                message: 'Yêu cầu thành công',
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Thêm mới nhóm khóa học vào lộ trình học
    createGroupLearningPath: async (req, res) => {
        try {
            const { id } = req.query;
            const { title, description, priority } = req.body;
            const learningPath = await Learning.findById(id);

            if (learningPath) {
                const newGroup = {
                    title,
                    description,
                    priority,
                };

                await learningPath.updateOne({ $push: { groups: newGroup } });
                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                });
            } else {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Lộ trình không tồn tại',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Thêm mới khóa học vào nhóm học trong lộ trình học
    addCourseToGroup: async (req, res) => {
        try {
            const { groupId } = req.query;
            const { learningPathId, courseId } = req.body;

            if (learningPathId.length < 24 || courseId.length < 24 || groupId.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid không hợp lệ',
                });
            }

            const learningPath = await Learning.findById(learningPathId);
            const course = await Course.findById(courseId);

            if (!learningPath) {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Lộ trình không tồn tại',
                });
            } else if (!course) {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Khóa học không tồn tại',
                });
            } else {
                const group = learningPath.groups.findIndex((group) => group._id.toString() === groupId);

                if (group !== -1) {
                    const course = learningPath.groups[group].courses.includes(mongoose.Types.ObjectId(courseId));

                    if (course) {
                        res.status(400).json({
                            statusCode: 1,
                            message: 'Khóa học đã tồn tại trong nhóm',
                        });
                    } else {
                        await Learning.updateOne(
                            { _id: learningPathId, 'groups._id': groupId },
                            { $push: { 'groups.$.courses': courseId } }
                        );

                        res.status(200).json({
                            statusCode: 0,
                            message: 'Yêu cầu thành công',
                        });
                    }
                } else {
                    res.status(404).json({
                        statusCode: 2,
                        message: 'Nhóm không tồn tại',
                    });
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Lấy lộ trình học bằng id
    getLearningPathById: async (req, res) => {
        try {
            const { id } = req.params;

            if (id.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid không hợp lệ',
                });
            }

            const learningPath = await Learning.findById(id);

            if (learningPath) {
                const courses = await Course.find({}).select('title');

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: learningPath,
                    courses: courses,
                });
            } else {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Lộ trình không tồn tại',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Lấy lộ trình học bằng slug
    getLearningRouteBySlug: async (req, res) => {
        try {
            const { slug } = req.params;

            if (!slug) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Parameter không được bỏ trống',
                });
            }

            const learningPath = await Learning.findOne({ slug }).populate({
                path: 'groups',
                populate: {
                    path: 'courses',
                    model: 'Course',
                    select: 'title image slug price description',
                },
            });

            if (!learningPath) {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Lộ trình không tồn tại',
                });
            } else {
                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: learningPath,
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Thay đổi trạng thái
    toggleStatus: async (req, res) => {
        try {
            const { id } = req.query;

            if (id.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid không hợp lệ',
                });
            }

            const learningPath = await Learning.findById(id);

            if (learningPath) {
                learningPath.status = !learningPath.status;
                await learningPath.save();

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                });
            } else {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Lộ trình không tồn tại',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Xóa lộ trình học
    deleteLearningPath: async (req, res) => {
        try {
            const { id } = req.query;

            if (id.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid không hợp lệ',
                });
            }

            const learningPath = await Learning.findById(id);

            if (learningPath) {
                if (learningPath.createdAt > new Date('2023-02-13')) {
                    await learningPath.delete();

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
                    message: 'Lộ trình học không tồn tại',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Cập nhật lộ trình học
    updateLearningPath: async (req, res) => {
        try {
            const { id } = req.query;
            const { title, description, priority, image, slug, content } = req.body;

            const checkSlug = await Learning.findOne({ slug });

            if (checkSlug && checkSlug._id.toString() !== id) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Slug đã tồn tại',
                });
            }

            const learningPath = await Learning.findById(id);

            if (learningPath) {
                if (learningPath.createdAt > new Date('2023-02-13')) {
                    const newLearningPath = {
                        title,
                        content,
                        description,
                        image,
                        priority,
                        slug,
                    };

                    await learningPath.updateOne({ $set: newLearningPath });

                    res.status(200).json({
                        statusCode: 0,
                        message: 'Yêu cầu thành công',
                    });
                } else {
                    res.status(403).json({
                        statusCode: 3,
                        message: 'Forbidden - Cannot update data before 13-02-2023',
                    });
                }
            } else {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Lộ trình không tồn tại',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

export default learningRoute;
