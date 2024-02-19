const categoryValidator = {
    createCategory: (req, res, next) => {
        const { title, priority } = req.body;

        if (!title) {
            return res.status(400).json({
                error: 'Tên danh mục không hợp lệ',
            });
        }

        if (!priority) {
            return res.status(400).json({
                error: 'Sự ưu tiên không hợp lệ',
            });
        }

        next();
    },

    updateCategory: (req, res, next) => {
        const { id } = req.query;

        categoryValidator.createCategory(req, res, () => {
            if (!id) {
                return res.status(400).json({
                    error: 'UID không hợp lệ',
                });
            }
            next();
        });
    },
};

export default categoryValidator;
