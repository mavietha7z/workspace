import jwt from 'jsonwebtoken';
import { Auth } from '../models';
import { generateAccessToken } from '../configs';

const middleware = {
    checkLogin: async (req, res, next) => {
        const { access_key } = req.cookies;

        if (!access_key) {
            return res.redirect('/admincp/login');
        }

        jwt.verify(access_key, 'jwt-access-key', async (error, user) => {
            if (error) {
                return res.redirect('/admincp/login');
            }

            if (!user.status) {
                return res.redirect('/admincp/login');
            }

            const userToken = await Auth.findById(user.id).select('status');
            if (!userToken) {
                return res.redirect('/admincp/login');
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

    verifyAdmin: async (req, res, next) => {
        const { access_key } = req.cookies;

        if (!access_key) {
            return res.status(403).clearCookie('access_key').json({
                status: 403,
                error: 'error_require_cookie',
            });
        }

        jwt.verify(access_key, 'jwt-access-key', async (error, user) => {
            if (error) {
                return res.status(403).clearCookie('access_key').json({
                    status: 403,
                    error: 'Mã xác thực của bạn đã hết hạn',
                });
            }

            if (!user.status) {
                return res.status(403).clearCookie('access_key').json({
                    status: 403,
                    error: 'Tài khoản của bạn đã bị khóa',
                });
            }

            const userToken = await Auth.findById(user.id).select('status');
            if (!userToken) {
                return res.status(403).clearCookie('access_key').json({
                    status: 403,
                    error: 'Người dùng không tồn tại',
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

    logoutUser: async (req, res, next) => {
        res.status(200).clearCookie('access_key');

        next();
    },
};

export default middleware;
