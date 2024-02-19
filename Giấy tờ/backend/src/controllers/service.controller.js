import { Category, Service } from '../model';

const serviceController = {
    createService: async (req, res) => {
        try {
            await new Service({
                user: req.user._id,
                ...req.body,
            }).save();

            res.status(200).json({
                code: 200,
                message: 'Thêm mới dịch vụ thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    getServices: async (req, res) => {
        try {
            const { id, type } = req.query;

            if (id && !type) {
                const service = await Service.findById(id).select('title priority is_status content description -_id');

                return res.status(200).json({
                    code: 200,
                    data: service,
                });
            }

            if (type === 'category') {
                const category = await Category.findById(id)
                    .select('services')
                    .populate({ path: 'services', select: 'title' });
                const services = await Service.find({
                    _id: { $nin: category.services },
                }).select('title');

                return res.status(200).json({
                    code: 200,
                    data: services,
                    services: category.services,
                });
            }

            const services = await Service.find({})
                .select(
                    'title slug user comments createdAt updatedAt priority is_status views_count image_url description'
                )
                .populate({ path: 'user', select: 'full_name' })
                .sort({ priority: 1 });

            res.status(200).json({
                code: 200,
                data: services,
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    getDetailsServices: async (req, res) => {
        try {
            const { slug } = req.params;

            const service = await Service.findOne({ slug }).select(
                'title comments content_html createdAt views_count -_id'
            );

            const views_count = service.views_count + 1;
            await service.updateOne({ views_count });

            res.status(200).json({
                code: 200,
                data: service,
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    updateService: async (req, res) => {
        try {
            const service = await Service.findById(req.query.id);

            if (!service) {
                return res.status(404).json({
                    error: 'Dịch vụ không tồn tại',
                });
            }
            await service.updateOne({ user: req.user._id, ...req.body });

            res.status(200).json({
                code: 200,
                message: 'Cập nhật dịch vụ thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    destroyService: async (req, res) => {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({
                    error: 'UID không hợp lệ',
                });
            }

            const service = await Service.findById(id);

            if (!service) {
                return res.status(404).json({
                    error: 'Dịch vụ không tồn tại',
                });
            }

            await service.deleteOne();

            res.status(200).json({
                code: 200,
                message: 'Xóa dịch vụ thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },
};

export default serviceController;
