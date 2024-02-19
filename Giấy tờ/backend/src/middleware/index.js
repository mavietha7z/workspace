import jwt from 'jsonwebtoken';
import { User } from '../model';
import { generateAccessToken } from '../configs';

const middleware = {
    verifyAdmin: (req, res, next) => {
        const { access_key } = req.cookies;

        if (!access_key) {
            return res.status(401).json({
                code: 401,
                error: 'Bạn chưa được xác minh',
            });
        }

        jwt.verify(access_key, 'jwt-access-key', async (error, user) => {
            if (error) {
                return res.status(403).clearCookie('access_key').json({
                    code: 403,
                    error: 'Mã xác thực hết hạn',
                });
            }

            if (!user.status) {
                return res.status(403).clearCookie('access_key').json({
                    code: 403,
                    error: 'Tài khoản đã bị khóa',
                });
            }

            if (!user.admin) {
                return res.status(403).clearCookie('access_key').json({
                    code: 403,
                    error: 'Bạn không có quyền này',
                });
            }

            const userToken = await User.findById(user.id).select('is_admin is_status');
            const accessToken = generateAccessToken(userToken);

            res.cookie('access_key', accessToken, {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'strict',
            });
            req.user = user;
            next();
        });
    },
};

export default middleware;
