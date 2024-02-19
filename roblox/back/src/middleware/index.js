import jwt from 'jsonwebtoken';
import { Auth } from '../models';
import { generateAccessToken } from '../configs';

const middleware = {
    // ADMIN
    verifyAdmin: (req, res, next) => {
        const { access_key } = req.cookies;

        if (!access_key) {
            return res.status(401).json({
                status: 401,
                error: 'Bạn chưa được xác minh',
            });
        }

        jwt.verify(access_key, 'jwt-access-key', async (error, user) => {
            if (error) {
                return res.status(403).clearCookie('access_key').json({
                    status: 403,
                    error: 'Mã xác minh đã hết hạn',
                });
            }

            if (!user.admin) {
                return res.status(403).clearCookie('access_key').json({
                    status: 403,
                    error: 'Bạn không có quyền này',
                });
            }

            if (!user.status) {
                return res.status(403).clearCookie('access_key').json({
                    status: 403,
                    error: 'Tài khoản bạn đã bị khóa',
                });
            }

            const userToken = await Auth.findById(user.id).select('admin status role');

            if (!userToken) {
                return res.status(401).clearCookie('access_key').json({
                    status: 401,
                    error: 'Bạn chưa được xác minh',
                });
            }

            req.user = user;
            const accessToken = generateAccessToken(userToken);

            res.cookie('access_key', accessToken, {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'strict',
            });
            next();
        });
    },
};

export default middleware;
