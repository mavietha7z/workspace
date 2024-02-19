import { User } from '../model';

const userValidator = {
    registerUser: async (req, res, next) => {
        const { full_name, email, phone_number, password } = req.body;

        const regexPhone = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (full_name.length < 3) {
            return res.status(400).json({
                error: 'Tên không hợp lệ',
            });
        }

        if (!regexEmail.test(email)) {
            return res.status(400).json({
                error: 'Email không hợp lệ',
            });
        }

        if (!regexPhone.test(phone_number)) {
            return res.status(400).json({
                error: 'SĐT không hợp lệ',
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                error: 'Mật khẩu không hợp lệ',
            });
        }

        const isEmail = await User.findOne({ email });
        const isPhone = await User.findOne({ phone_number });

        if (isEmail) {
            return res.status(400).json({
                error: 'Email đã tồn tại',
            });
        }

        if (isPhone) {
            return res.status(400).json({
                error: 'SĐT đã tồn tại',
            });
        }

        next();
    },

    loginUser: (req, res, next) => {
        const { email_phone, password } = req.body;

        if (!email_phone) {
            return res.status(400).json({
                error: 'SĐT hoặc Email là bắt buộc',
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                error: 'Mật khẩu không hợp lệ',
            });
        }

        next();
    },

    getUsers: (req, res, next) => {
        const { page } = req.query;

        if (!page) {
            return res.status(400).json({
                error: 'Tham số là bắt buộc',
            });
        }

        next();
    },

    updateUser: (req, res, next) => {
        const { type, id } = req.query;

        if (!type || !id) {
            return res.status(400).json({
                error: 'Tham số là bắt buộc',
            });
        }

        next();
    },
};

export default userValidator;
