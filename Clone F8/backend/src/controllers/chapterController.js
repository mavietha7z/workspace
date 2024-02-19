import { Course } from '../model/course.model';
import { Chapter } from '../model/chapter.model';
import { Lesson } from '../model/lesson.model';

const chapterController = {
    // Thêm mới chương
    createChapter: async (req, res) => {
        try {
            const { name } = req.body;
            const { id } = req.query;

            if (id.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Id khóa học không hợp lệ',
                });
            }

            const course = await Course.findById(id);
            if (!name) {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Tên chương là bắt buộc',
                });
            } else if (!course) {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Khóa học không tồn tại',
                });
            } else {
                const newChapter = new Chapter({
                    nameChapter: name,
                    courseId: id,
                });

                const saveChapter = await newChapter.save();
                await course.updateOne({ $push: { chapter: saveChapter._id } });

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: saveChapter,
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Đổi tên chương
    renameChapter: async (req, res) => {
        try {
            const { id } = req.query;
            const { name } = req.body;

            if (id.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid chương không hợp lệ',
                });
            } else if (!name) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Tên là bắt buộc',
                });
            } else {
                const chapter = await Chapter.findByIdAndUpdate(id, { $set: { nameChapter: name } });

                if (chapter) {
                    const chapters = await Course.findById(chapter.courseId).populate({
                        path: 'chapter',
                        model: 'Chapter',
                        populate: {
                            path: 'lesson',
                            model: 'Lesson',
                            select: 'nameLesson timeVideo urlVideo',
                        },
                    });

                    res.status(200).json({
                        statusCode: 0,
                        message: 'Yêu cầu thành công',
                        data: chapters.chapter,
                    });
                } else {
                    res.status(404).json({
                        statusCode: 2,
                        message: 'Chương không tồn tại',
                    });
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Xóa chương
    deleteChapter: async (req, res) => {
        try {
            const { id } = req.query;

            if (id.length < 24) {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Uid chapter không hợp lệ',
                });
            } else {
                const chapter = await Chapter.findById(id);

                if (chapter) {
                    if (chapter.createdAt > new Date('2023-02-13')) {
                        await Lesson.deleteMany({ _id: { $in: chapter.lesson } });
                        await chapter.delete();

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
                        message: 'Chương không tồn tại',
                    });
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

export default chapterController;
