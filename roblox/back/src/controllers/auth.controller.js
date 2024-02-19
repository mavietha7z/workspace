import bcrypt from 'bcrypt';
import { Auth } from '../models';
import { generateAccessToken } from '../configs';

const authController = {
    // [POST] /api/auth/register
    register: async (req, res) => {
        try {
            const { password, ...other } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);

            await new Auth({ password: hashed, ...other }).save();

            res.status(200).json({
                status: 200,
                message: 'Đăng ký thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // [POST] /api/auth/login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Auth.findOne({ email, admin: true }).select(
                'full_name email avatar_url status password admin role'
            );

            if (!user) {
                return res.status(404).json({
                    error: 'Tài khoản không tồn tại',
                });
            }

            const isPassword = await bcrypt.compare(password, user.password);

            if (!isPassword) {
                return res.status(400).json({
                    error: 'Mật khẩu không chính xác',
                });
            }

            const accessToken = generateAccessToken(user);
            const { password: passwordUser, status, email: emailUser, _id, admin, role, ...other } = user._doc;

            res.status(200)
                .cookie('access_key', accessToken, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    sameSite: 'strict',
                })
                .json({
                    status: 200,
                    message: 'Đăng nhập thành công',
                    data: { ...other },
                });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // [POST] /api/auth/logout
    logout: async (req, res) => {
        res.status(200).clearCookie('access_key').json({
            status: 200,
            message: 'Đăng xuất thành công',
        });
    },

    // [GET] /api/auth/current-user
    current: async (req, res) => {
        try {
            const { id } = req.user;

            const user = await Auth.findById(id).select('full_name avatar_url -_id');

            res.status(200).json({
                status: 200,
                data: user,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },
};

export default authController;
