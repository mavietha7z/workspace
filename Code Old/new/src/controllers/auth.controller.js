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
                message: 'Đăng ký người dùng thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi yêu cầu' });
        }
    },

    // [POST] /api/auth/login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Auth.findOne({ email, status: true }).select('full_name email status password');

            if (!user) {
                return res.status(404).json({
                    error: 'Tài khoản người dùng không tồn tại',
                });
            }

            const isPassword = await bcrypt.compare(password, user.password);

            if (!isPassword) {
                return res.status(400).json({
                    error: 'Mật khẩu người dùng không chính xác',
                });
            }

            const accessToken = generateAccessToken(user);
            const { password: newPass, status, _id, ...other } = user._doc;

            res.status(200)
                .cookie('access_key', accessToken, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    sameSite: 'strict',
                })
                .json({
                    status: 200,
                    message: 'Đăng nhập tài khoản thành công',
                    data: { ...other },
                });
        } catch (error) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi yêu cầu' });
        }
    },

    // [GET] /api/auth/logout
    logout: async (req, res) => {
        res.redirect('/admincp/login');
    },
};

export default authController;
