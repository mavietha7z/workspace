import { Category } from '../model';

const categoryController = {
    createCategory: async (req, res) => {
        try {
            await new Category(req.body).save();

            res.status(200).json({
                code: 200,
                message: 'Thêm mới thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    getCategories: async (req, res) => {
        try {
            const { id } = req.query;
            if (id) {
                const category = await Category.findById(id)
                    .select('title slug priority is_status -_id')
                    .sort({ priority: 1 });

                if (!category) {
                    return res.status(404).json({
                        error: 'Danh mục không tồn tại',
                    });
                }

                return res.status(200).json({
                    code: 200,
                    data: category,
                });
            }

            const categories = await Category.find({}).select(
                'title slug priority is_status services createdAt updatedAt'
            );

            res.status(200).json({
                code: 200,
                data: categories,
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const { id } = req.query;

            await Category.findByIdAndUpdate(id, req.body);

            res.status(200).json({
                code: 200,
                message: 'Cập nhật thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    destroyCategory: async (req, res) => {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({
                    error: 'UID không hợp lệ',
                });
            }

            const category = Category.findById(id);

            if (category) {
                await category.deleteOne();

                res.status(200).json({
                    code: 200,
                    message: 'Xóa thành công',
                });
            } else {
                res.status(404).json({
                    error: 'Danh mục không tồn tại',
                });
            }
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    moreServices: async (req, res) => {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(404).json({
                    error: 'UID không hợp lệ',
                });
            }

            const category = Category.findById(id);

            if (!category) {
                return res.status(404).json({
                    error: 'Danh mục không tồn tại',
                });
            }

            await category.updateOne({ $push: { services: { $each: req.body } } });

            const newCategory = await Category.find({}).select(
                'title slug priority is_status services createdAt updatedAt'
            );
            const data = await Category.findById(id).select('services').populate({ path: 'services', select: 'title' });

            res.status(200).json({
                code: 200,
                message: 'Thêm thành công',
                data: newCategory,
                services: data.services,
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    removeService: async (req, res) => {
        try {
            const { id } = req.query;
            const { data } = req.body;

            if (!id) {
                return res.status(400).json({
                    error: 'UID không hợp lệ',
                });
            }

            if (!data) {
                return res.status(400).json({
                    error: 'Dịch vụ không hợp lệ',
                });
            }

            const category = await Category.findById(id);
            await category.updateOne({ $pull: { services: data } });

            res.status(200).json({
                code: 200,
                message: 'Xóa dịch vụ thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Client
    clientGetCategories: async (req, res) => {
        try {
            const categories = await Category.find({ is_status: true })
                .select('title slug services -_id')
                .populate({ path: 'services', select: 'title slug -_id', sort: 'priority' })
                .sort({ priority: 1 });

            res.status(200).json({
                code: 200,
                data: categories,
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },
};

export default categoryController;
