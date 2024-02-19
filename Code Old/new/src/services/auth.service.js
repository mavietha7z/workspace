const authService = {
    // [POST] /api/auth/login
    login: (req, res, next) => {
        const { email, password } = req.body;
        const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!regexEmail.test(email)) {
            return res.status(400).json({
                error: 'Email người dùng không hợp lệ',
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                error: 'Mật khẩu người dùng không hợp lệ',
            });
        }

        next();
    },

    // [POST] /api/auth/register
    register: (req, res, next) => {
        const { full_name } = req.body;

        authService.login(req, res, () => {
            if (full_name.length < 2) {
                return res.status(400).json({
                    error: 'Tên người dùng không hợp lệ',
                });
            }

            next();
        });
    },
};

export default authService;
