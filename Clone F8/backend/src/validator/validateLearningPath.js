const validateLearningPath = {
    create: (req, res, next) => {
        const { title, slug, content, description, priority } = req.body;

        if (!title) {
            res.status(400).json({
                statusCode: 1,
                message: 'Tên là bắt buộc',
            });
        } else if (!slug) {
            res.status(400).json({
                statusCode: 1,
                message: 'Slug là bắt buộc',
            });
        } else if (!content) {
            res.status(400).json({
                statusCode: 1,
                message: 'Nội dung là bắt buộc',
            });
        } else if (!description) {
            res.status(400).json({
                statusCode: 1,
                message: 'Mô tả là bắt buộc',
            });
        } else if (!priority) {
            res.status(400).json({
                statusCode: 1,
                message: 'Ưu tiên là bắt buộc',
            });
        } else if (!req.file) {
            res.status(400).json({
                statusCode: 1,
                message: 'Ảnh là bắt buộc',
            });
        } else {
            next();
        }
    },

    createGroup: (req, res, next) => {
        const { title, description, priority } = req.body;

        if (!title) {
            res.status(400).json({
                statusCode: 1,
                message: 'Tên nhóm là bắt buộc',
            });
        } else if (!description) {
            res.status(400).json({
                statusCode: 1,
                message: 'Mô tả là bắt buộc',
            });
        } else if (!priority) {
            res.status(400).json({
                statusCode: 1,
                message: 'Sự ưu tiên là bắt buộc',
            });
        } else {
            next();
        }
    },

    update: (req, res, next) => {
        const { id } = req.query;
        const { title, description, priority, image, slug, content } = req.body;

        if (id.length < 24) {
            return res.status(400).json({
                statusCode: 1,
                message: 'Uid không hợp lệ',
            });
        }

        if (!title) {
            res.status(404).json({
                statusCode: 1,
                message: 'Tên lộ trình là bắt buộc',
            });
        } else if (!description) {
            res.status(404).json({
                statusCode: 1,
                message: 'Mô tả là bắt buộc',
            });
        } else if (!priority) {
            res.status(404).json({
                statusCode: 1,
                message: 'Sự ưu tiên là bắt buộc',
            });
        } else if (!image) {
            res.status(404).json({
                statusCode: 1,
                message: 'Ảnh là bắt buộc',
            });
        } else if (!content) {
            res.status(404).json({
                statusCode: 1,
                message: 'Nội dung là bắt buộc',
            });
        } else if (!slug) {
            res.status(400).json({
                statusCode: 1,
                message: 'Slug là bắt buộc',
            });
        } else {
            next();
        }
    },
};

export default validateLearningPath;
