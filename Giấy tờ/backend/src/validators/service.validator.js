import { User } from '../model';

const serviceValidator = {
    createService: async (req, res, next) => {
        const { title, priority, content, content_html } = req.body;

        if (!title || title.length < 2) {
            return res.status(400).json({
                error: 'Tên dịch vụ không hợp lệ',
            });
        }
        if (!priority) {
            return res.status(400).json({
                error: 'Sự ưu tiên không hợp lệ',
            });
        }
        if (!content || !content_html) {
            return res.status(400).json({
                error: 'Nội dung là bắt buộc',
            });
        }

        const user = await User.findById(req.user.id).select('_id');

        if (!user) {
            return res.status(403).clearCookie('access_key').json({
                code: 403,
                error: 'Tài khoản không tồn tại',
            });
        }

        req.user = user;
        next();
    },
};

export default serviceValidator;
