import { Chapter } from '../model/chapter.model';
import { Lesson } from '../model/lesson.model';

const lessonController = {
    // Lấy dữ liệu bài học bằng id
    getLessonById: async (req, res) => {
        try {
            const { id } = req.query;

            if (id.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid không hợp lệ',
                });
            }

            const lesson = await Lesson.findById(id);

            if (!lesson) {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Bài không tồn tại',
                });
            } else {
                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: lesson,
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Thêm bài học mới
    createLesson: async (req, res) => {
        try {
            const { chapterId } = req.query;
            const { nameLesson, timeVideo, urlVideo, thumbNail, descHTML, descMarkdown } = req.body;

            const chapter = await Chapter.findById(chapterId);

            if (chapter) {
                const newLesson = new Lesson({
                    nameLesson,
                    timeVideo,
                    urlVideo,
                    thumbNail,
                    chapterId,
                    descHTML,
                    descMarkdown,
                });

                const saveLesson = await newLesson.save();
                await chapter.updateOne({ $push: { lesson: saveLesson._id } });

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                });
            } else {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Chương không tồn tại',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

export default lessonController;
