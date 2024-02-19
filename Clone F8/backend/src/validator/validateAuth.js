import jwt from 'jsonwebtoken';

const validateAuth = {
    register: (req, res, next) => {
        const { type } = req.query;
        const { name, email, password, code } = req.body;

        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!regexEmail.test(email)) {
            return res.status(400).json({
                statusCode: 2,
                message: 'Email không đúng định dạng',
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                statusCode: 3,
                message: 'Mật khẩu tối thiểu 8 kí tự',
            });
        }
        if (name.length < 2) {
            return res.status(400).json({
                statusCode: 6,
                message: 'Tên không hợp lệ',
            });
        }

        if (type === 'admin') {
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

                    if (user.admin) {
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
        } else {
            if (code.length !== 6) {
                return res.status(400).json({
                    statusCode: 6,
                    message: 'Mã xác minh có 6 số',
                });
            } else {
                next();
            }
        }
    },

    login: (req, res, next) => {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                statusCode: 2,
                message: 'Email là bắt buộc',
            });
        } else if (!password) {
            return res.status(400).json({
                statusCode: 2,
                message: 'Mật khẩu là bắt buộc',
            });
        } else {
            next();
        }
    },
};

export default validateAuth;
