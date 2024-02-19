const validateCourse = {
    create: (req, res, next) => {
        const { type } = req.query;
        const { title, slug, video, priority, price, oldPrice, whatLearn, description, comingSoon } = req.body;

        if (!title) {
            return res.status(400).json({
                statusCode: 1,
                message: 'Tên là bắt buộc',
            });
        }
        if (!slug) {
            return res.status(400).json({
                statusCode: 1,
                message: 'Slug là bắt buộc',
            });
        }
        if (priority === '') {
            return res.status(400).json({
                statusCode: 1,
                message: 'Sự ưu tiên là bắt buộc',
            });
        }

        if (type === 'pro' && comingSoon === '1') {
            if (!req.files.image) {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Ảnh xem trước là bắt buộc',
                });
            } else {
                next();
            }
        } else {
            if (!video) {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Video là bắt buộc',
                });
            } else if (!req.files || !req.files.image || !req.files.icon) {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Ảnh và icon là bắt buộc',
                });
            } else if (!whatLearn) {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Mô tả học được những gì là bắt buộc',
                });
            } else {
                if (type === 'free') {
                    if (!description) {
                        res.status(400).json({
                            statusCode: 1,
                            message: 'Mô tả là bắt buộc',
                        });
                    } else {
                        next();
                    }
                } else {
                    if (price === '' || oldPrice === '') {
                        res.status(400).json({
                            statusCode: 1,
                            message: 'Giá là bắt buộc',
                        });
                    } else {
                        next();
                    }
                }
            }
        }
    },
};

export default validateCourse;
