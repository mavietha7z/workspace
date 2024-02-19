const validateBlog = {
    createPosts: (req, res, next) => {
        const { title } = req.body;

        if (!title) {
            return res.status(404).json({
                statusCode: 1,
                message: 'Tiêu đề là bắt buộc',
            });
        }
        if (title.length < 2) {
            return res.status(404).json({
                statusCode: 1,
                message: 'Tiêu đề tối thiểu 2 ký tự',
            });
        }
        next();
    },
};

export default validateBlog;
