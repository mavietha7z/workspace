const validateLesson = {
    create: (req, res, next) => {
        const { chapterId } = req.query;
        const { nameLesson, timeVideo, urlVideo } = req.body;

        if (chapterId.length < 24) {
            return res.status(400).json({
                statusCode: 1,
                message: 'Id chương không hợp lệ',
            });
        }

        if (!nameLesson) {
            res.status(400).json({
                statusCode: 1,
                message: 'Tên bài là bắt buộc',
            });
        } else if (!urlVideo) {
            res.status(400).json({
                statusCode: 1,
                message: 'Url video bài là bắt buộc',
            });
        } else if (!timeVideo) {
            res.status(400).json({
                statusCode: 1,
                message: 'Thời gian bài là bắt buộc',
            });
        } else {
            next();
        }
    },
};

export default validateLesson;
