import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { Blog } from '../model/blog.model';
import { User } from '../model/user.model';
import { VerifyEmail } from '../model/verify.model';
import { generateAccessToken, generateRefreshToken, convertNameToUsername, contentSendMail } from '../config';

let refreshArray = [];

const authController = {
    // Xác minh email người dùng
    verifyEmail: async (req, res) => {
        try {
            const { email } = req.body;
            const checkEmail = await VerifyEmail.findOne({ email: email });

            // Hàm tạo mã code 6 số ngẫu nhiên
            const generateRandomString = () => {
                let randomNumbers = [];
                for (let i = 0; i < 6; i++) {
                    randomNumbers.push(Math.floor(Math.random() * 10));
                }
                return randomNumbers.join('');
            };

            const code = generateRandomString();
            const contentMail = contentSendMail(code);

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'clone.fullstack@gmail.com',
                    pass: 'irlvmkmrenprtrtd',
                },
            });

            if (!checkEmail) {
                // Nếu email chưa tồn tại trong database thì tạo mới và thêm mã code
                const newCodeVerify = new VerifyEmail({
                    email: email,
                    code: [code],
                });
                await newCodeVerify.save();

                // Xóa mã code sau 120s
                setTimeout(async () => {
                    await VerifyEmail.updateOne({ email: email }, { $pull: { code: code } });
                }, 120000);

                await transporter.sendMail({
                    from: `"F8" <${'clone.fullstack@gmail.com'}>`,
                    to: email,
                    subject: `${code} là mã xác minh của bạn`,
                    html: contentMail,
                });

                return res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                });
            } else if (!checkEmail.status) {
                // Nếu email đã tồn tại và status = false thì push thêm mã code vào mảng code
                await VerifyEmail.updateOne(
                    {
                        email: email,
                    },
                    { $push: { code: code } }
                );

                // Xóa mã code sau 120s
                setTimeout(async () => {
                    await VerifyEmail.updateOne({ email: email }, { $pull: { code: code } });
                }, 120000);

                await transporter.sendMail({
                    from: `"F8" <'clone.fullstack@gmail.com>`,
                    to: email,
                    subject: `${code} là mã xác minh của bạn`,
                    html: contentMail,
                });

                return res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                });
            } else {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Email đã được xác minh',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Đăng ký tài khoản mới
    registerUser: async (req, res) => {
        try {
            const { type } = req.query;
            const { name, email, password, phone, role, code } = req.body;

            let username = convertNameToUsername(name);
            const checkUser = await User.findOne({ email });
            const userExists = await User.exists({ username });

            const newNotify = {
                avatar: 'https://res.cloudinary.com/dwld3bqia/image/upload/v1672150348/Avatar/unnamed_wla4e3.png',
                description: 'Hãy luôn đam mê, kiên trì và theo đuổi mục tiêu tới cùng bạn nhé',
                timestamps: Date.now(),
                watch: false,
            };

            if (checkUser) {
                return res.status(400).json({
                    statusCode: 5,
                    message: 'Email đã tồn tại',
                });
            }

            // Nếu username tồn tại thì thêm số vào sau
            if (userExists) {
                let count = 1;
                while (await User.exists({ username: `${username}${count}` })) {
                    count++;
                }
                username = `${username}${count}`;
            }

            if (type === 'admin') {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.body.password, salt);

                const newUser = new User({
                    name: name,
                    email: email,
                    password: hashed,
                    username: username,
                    phone: phone,
                    admin: role,
                    notify: newNotify,
                });

                const newEmailVery = new VerifyEmail({
                    email: email,
                    status: true,
                });
                // Lưu người dùng vào database và đổi trạng thái email thành đã xác minh
                await newEmailVery.save();
                await newUser.save();

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                });
            } else {
                const veriEmail = await VerifyEmail.findOne({ email });
                // Nếu chưa gửi mã xác minh email thì trả về lỗi
                if (!veriEmail) {
                    return res.status(400).json({
                        statusCode: 1,
                        message: 'Vui lòng gửi mã xác nhận',
                    });
                }

                if (!veriEmail.code.includes(code)) {
                    res.status(400).json({
                        message: 'Mã xác minh không hợp lệ',
                        statusCode: 4,
                    });
                } else if (name && email && password && veriEmail.code.includes(code)) {
                    const salt = await bcrypt.genSalt(10);
                    const hashed = await bcrypt.hash(req.body.password, salt);

                    const newUser = new User({
                        name: name,
                        email: email,
                        password: hashed,
                        username: username,
                        phone: phone,
                        admin: role,
                        notify: newNotify,
                    });

                    // Lưu người dùng vào database và đổi trạng thái email thành đã xác minh
                    await VerifyEmail.updateOne({ email: email }, { $set: { status: true } });
                    const user = await newUser.save();

                    const accessToken = generateAccessToken(user);
                    const refreshToken = generateRefreshToken(user);
                    refreshArray.push(refreshToken);
                    const { password, ...other } = user._doc;

                    res.status(200)
                        .cookie('refreshToken', refreshToken, {
                            httpOnly: true,
                            secure: false,
                            path: '/',
                            sameSite: 'strict',
                        })
                        .json({
                            statusCode: 0,
                            message: 'Yêu cầu thành công',
                            data: { ...other, accessToken },
                        });
                } else {
                    res.status(404).json({
                        statusCode: 7,
                        message: 'Yêu cầu thất bại',
                    });
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Đăng nhập tài khoản người dùng
    loginUser: async (req, res) => {
        try {
            const { role } = req.query;
            const { email, password } = req.body;
            const user = await User.findOne({ email: email });

            if (!user) {
                return res.status(404).json({
                    statusCode: 2,
                    message: 'Tài khoản không tồn tại',
                });
            }
            const validPassword = await bcrypt.compare(password, user.password);

            if (!user.status) {
                return res.status(404).json({
                    statusCode: 2,
                    message: 'Tài khoản của bạn đã bị khóa',
                });
            } else if (!validPassword) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Mật khẩu không chính xác',
                });
            }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            refreshArray.push(refreshToken);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });

            if (role === 'admin') {
                if (user.admin) {
                    const { password, ...other } = user._doc;

                    return res.status(200).json({
                        statusCode: 0,
                        message: 'Yêu cầu thành công',
                        data: { ...other, accessToken },
                    });
                } else {
                    return res.status(403).json({
                        statusCode: 3,
                        message: 'Bạn không có quyền này',
                    });
                }
            } else {
                const { password, ...other } = user._doc;
                return res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: { ...other, accessToken },
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Đăng xuất người dùng
    logoutUser: async (req, res) => {
        res.clearCookie('refreshToken');
        refreshArray = refreshArray.filter((token) => token !== req.cookies.refreshToken);

        res.status(200).json({
            statusCode: 0,
            message: 'Yêu cầu thành công',
        });
    },

    // Tạo mới tokens
    requestToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken)
            return res.status(401).json({
                statusCode: 1,
                message: 'Bạn chưa đăng nhập',
            });

        if (!refreshArray.includes(refreshToken)) {
            return res.status(403).json({
                statusCode: 1,
                message: 'Token không chính xác',
            });
        }

        jwt.verify(refreshToken, 'jwt-refresh-key', (error, user) => {
            if (error) {
                return res.status(500).json(error);
            }

            refreshArray = refreshArray.filter((token) => token !== refreshToken);

            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);
            refreshArray.push(newRefreshToken);

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });

            res.status(200).json({
                statusCode: 0,
                message: 'Yêu cầu thành công',
                data: { accessToken: newAccessToken },
            });
        });
    },

    // Lấy thông báo người dùng
    getNotify: async (req, res) => {
        try {
            const { id } = req.user;
            const user = await User.findById(id).select('notify');

            res.status(200).json({
                statusCode: 0,
                message: 'Yêu cầu thành công',
                data: user.notify,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Thêm / xóa bài viết vào mục đã lưu
    toggleBookmark: async (req, res) => {
        try {
            const { id: postId } = req.query;
            const { id } = req.user;

            let checkPost = await Blog.findById(postId);
            let checkUser = await User.findById(id);

            if (postId.length < 24) {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Uid bài viết không hợp lệ',
                });
            } else if (!checkPost) {
                res.status(404).json({
                    statusCode: 2,
                    message: `Bài viết không tồn tại`,
                });
            } else {
                const checkPostSaveIndex = checkUser.postSave.findIndex((idPost) => idPost.post.toString() === postId);

                // Tạo token cho người dùng
                const accessToken = generateAccessToken(checkUser);
                const refreshToken = generateRefreshToken(checkUser);

                refreshArray.push(refreshToken);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                });

                // Thêm vào mục đã lưu
                if (checkPostSaveIndex === -1) {
                    await checkUser.updateOne({ $push: { postSave: { post: checkPost._id } } });
                    const newUser = await User.findById(id).select('-password');

                    res.status(200).json({
                        statusCode: 0,
                        message: 'Thêm vào mục đã lưu',
                        data: { ...newUser._doc, accessToken },
                    });
                } else {
                    await checkUser.updateOne({ $pull: { postSave: { post: checkPost._id } } });
                    const newUser = await User.findById(id).select('-password');

                    res.status(200).json({
                        statusCode: 0,
                        message: 'Xóa khỏi mục đã lưu',
                        data: { ...newUser._doc, accessToken },
                    });
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Cập nhật dữ liệu người dùng hiện tại
    currentUser: async (req, res) => {
        try {
            const { id } = req.user;
            const user = await User.findById(id).select('-password');

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            refreshArray.push(refreshToken);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });

            res.status(200).json({
                statusCode: 0,
                data: { ...user._doc, accessToken },
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

export default authController;
