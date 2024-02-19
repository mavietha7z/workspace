const User = require('../models/user');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (user) => {
    const jwtKey = process.env.JWT_SECRET_KEY;
    const { _id: id, name, email } = user;

    return jwt.sign(
        {
            id,
            name,
            email,
        },
        jwtKey,
        { expiresIn: '1d' }
    );
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: 'Vui lòng điền đầy đủ thông tin',
            });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                error: 'Email không đúng định dạng',
            });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                error: 'Mật khẩu không hợp lệ',
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                error: 'Email đã được sử dụng',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: newPassword,
        });

        const saveUser = await newUser.save();
        const tokenUser = createToken(saveUser);

        res.status(200)
            .cookie('secret_key', tokenUser, {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'strict',
            })
            .json({
                status: 200,
                message: 'Đăng ký tài khoản thành công',
                data: {
                    id: saveUser._id,
                    name: saveUser.name,
                    email: saveUser.email,
                    token: tokenUser,
                },
            });
    } catch (error) {
        res.status(500).json('Lỗi hệ thống vui lòng thử lại sau');
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'Vui lòng điền đầy đủ thông tin',
            });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                error: 'Email không đúng định dạng',
            });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                error: 'Mật khẩu không hợp lệ',
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                error: 'Tài khoản của bạn không tồn tại',
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                error: 'Mật khẩu không chính xác vui lòng thử lại',
            });
        }

        const tokenUser = createToken(user);

        res.status(200)
            .cookie('secret_key', tokenUser, {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'strict',
            })
            .json({
                status: 200,
                message: 'Đăng nhập tài khoản thành công',
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    token: tokenUser,
                },
            });
    } catch (error) {
        res.status(500).json('Lỗi hệ thống vui lòng thử lại sau');
    }
};

const findUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                error: 'Tài khoản không tồn tại',
            });
        }

        res.status(200).json({
            status: 200,
            message: 'OK',
            data: user,
        });
    } catch (error) {
        res.status(500).json('Lỗi hệ thống vui lòng thử lại sau');
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.find({}).select('-password');

        res.status(200).json({
            status: 200,
            message: 'OK',
            data: user,
        });
    } catch (error) {
        res.status(500).json('Lỗi hệ thống vui lòng thử lại sau');
    }
};

module.exports = { registerUser, loginUser, findUser, getUser };
