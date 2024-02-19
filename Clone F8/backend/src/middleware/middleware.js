import jwt from 'jsonwebtoken';

const middleware = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;

        if (token) {
            const accessToken = token;
            jwt.verify(accessToken, 'jwt-access-key', (error, user) => {
                if (error) {
                    return res.status(403).json({
                        statusCode: 3,
                        message: 'Token đã hết hạn',
                    });
                }
                req.user = user;
                next();
            });
        } else {
            res.status(401).json({
                statusCode: 3,
                message: 'Bạn chưa được xác thực',
            });
        }
    },

    verifyTokenAndAdmin: (req, res, next) => {
        middleware.verifyToken(req, res, () => {
            if (req.user.admin) {
                next();
            } else {
                res.status(403).json({
                    statusCode: 3,
                    message: 'Bạn không có quyền này',
                });
            }
        });
    },

    veryAdminGetData: (req, res, next) => {
        const { type } = req.query;

        if (type !== 'all' && type !== 'uid') {
            next();
            return;
        }

        const token = req.headers.token;
        if (token) {
            jwt.verify(token, 'jwt-access-key', (error, user) => {
                if (error) {
                    return res.status(403).json({
                        statusCode: 3,
                        message: 'Token đã hết hạn',
                    });
                } else if ((type === 'all' || type === 'uid') && user.admin) {
                    req.user = user;
                    next();
                } else {
                    res.status(403).json({
                        statusCode: 3,
                        message: 'Bạn không có quyền này',
                    });
                }
            });
        } else {
            res.status(401).json({
                statusCode: 3,
                message: 'Bạn chưa được xác thực',
            });
        }
    },

    validateDataUpdateCourse: (req, res, next) => {
        const { id } = req.query;
        const { title, slug, image, priority, price, oldPrice, preOrderPrice, learnWhat } = req.body;

        if (id.length < 24) {
            return res.status(400).json({
                statusCode: 1,
                message: 'Uid khóa học không hợp lệ',
            });
        }

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
        } else if (!image) {
            res.status(400).json({
                statusCode: 1,
                message: 'Ảnh nền là bắt buộc',
            });
        } else if (!priority) {
            res.status(400).json({
                statusCode: 1,
                message: 'Sự ưu tiên là bắt buộc',
            });
        } else if (!learnWhat) {
            res.status(400).json({
                statusCode: 1,
                message: 'Mô những gì sẽ học được là bắt buộc',
            });
        } else if (price === '' || oldPrice === '' || preOrderPrice === '') {
            res.status(400).json({
                statusCode: 1,
                message: 'Giá là bắt buộc',
            });
        } else {
            next();
        }
    },
};

export default middleware;
