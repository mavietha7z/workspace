import bcrypt from 'bcrypt';
import { User } from '../model';
import { generateAccessToken } from '../configs';

const userController = {
    // [POST] /api/auth/register
    registerUser: async (req, res) => {
        try {
            const { full_name, email, phone_number } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const user = await new User({
                full_name,
                email,
                phone_number,
                password: hashed,
            }).save();

            const accessToken = generateAccessToken(user);

            const {
                password,
                createdAt,
                updatedAt,
                __v,
                _id,
                my_services,
                my_comments,
                is_status,
                is_admin,
                ...other
            } = user._doc;

            res.status(200)
                .cookie('access_key', accessToken, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    sameSite: 'strict',
                })
                .json({
                    code: 200,
                    data: { ...other },
                });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    // [POST] /api/auth/login
    loginUser: async (req, res) => {
        try {
            const { email_phone, password } = req.body;

            const user = await User.findOne({ $or: [{ email: email_phone }, { phone_number: email_phone }] }).select(
                'full_name password email phone_number is_admin is_status'
            );

            if (!user) {
                return res.status(404).json({
                    error: 'Tài khoản không tồn tại',
                });
            }

            if (!user.is_status) {
                return res.status(400).json({
                    error: 'Tài khoản đã bị khóa',
                });
            }

            const isPassword = await bcrypt.compare(password, user.password);

            if (!isPassword) {
                return res.status(400).json({
                    error: 'Mật khẩu không chính xác',
                });
            }

            const accessToken = generateAccessToken(user);
            const { password: passwordUser, _id, is_admin, is_status, ...other } = user._doc;

            res.status(200)
                .cookie('access_key', accessToken, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    sameSite: 'strict',
                })
                .json({
                    code: 200,
                    data: { ...other },
                });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    getCurrentUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('email full_name phone_number -_id');

            res.status(200).json({
                code: 200,
                data: user,
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    // [GET] /api/auth/get-users
    getUsers: async (req, res) => {
        try {
            const { page } = req.query;

            const numberPage = Number(page);
            const pageSize = 10;
            const skip = (numberPage - 1) * pageSize;
            const count = await User.countDocuments({});
            const pages = Math.ceil(count / pageSize);

            const users = await User.find({})
                .select('-password -__v -my_comments -my_services')
                .skip(skip)
                .limit(pageSize)
                .sort({ createdAt: 1 })
                .exec();

            res.status(200).json({
                code: 200,
                data: users,
                pages,
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { type, id } = req.query;
            const user = await User.findById(id).select('is_status is_admin');

            if (type === 'role') {
                await user.updateOne({ is_admin: !user.is_admin });
            } else if (type === 'status') {
                await user.updateOne({ is_status: !user.is_status });
            } else {
                return res.status(400).json({
                    error: 'Tham số không hợp lệ',
                });
            }

            res.status(200).json({
                code: 200,
                message: 'Cập nhật thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },
};

export default userController;
