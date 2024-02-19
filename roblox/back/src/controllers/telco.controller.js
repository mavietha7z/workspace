import { Telco } from '../models';

const telcosController = {
    // [POST] /api/telcos/create
    createTelco: async (req, res) => {
        try {
            await new Telco(req.body).save();

            res.status(200).json({
                status: 200,
                message: 'Thêm mới thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // [GET] /api/telcos
    getTelcos: async (req, res) => {
        try {
            const { id, page } = req.query;

            if (id && !page) {
                const telco = await Telco.findById(id).select('-updatedAt -createdAt -_id -__v');

                return res.status(200).json({
                    status: 200,
                    data: telco,
                });
            }

            const pageSize = 20;
            const skip = (req.page - 1) * pageSize;
            const count = await Telco.countDocuments({});
            const pages = Math.ceil(count / pageSize);

            const telcos = await Telco.find({})
                .select('telco discount priority product_code image_url status createdAt updatedAt')
                .skip(skip)
                .limit(pageSize)
                .sort({ priority: 1 })
                .exec();

            res.status(200).json({
                status: 200,
                data: telcos,
                pages,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // [DELETE] /api/telcos/delete
    destroyTelco: async (req, res) => {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({
                    error: 'Tham số là bắt buộc',
                });
            }

            const telco = await Telco.findById(id);

            if (!telco) {
                return res.status(404).json({
                    error: 'Thẻ không tồn tại',
                });
            }

            await telco.deleteOne();

            res.status(200).json({
                status: 200,
                message: 'Xóa thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // [PUT] /api/telcos/update
    updateTelco: async (req, res) => {
        try {
            const { id, type } = req.query;

            const telco = await Telco.findById(id);

            if (!telco) {
                return res.status(404).json({
                    error: 'Loại thẻ không tồn tại',
                });
            }

            if (type) {
                await telco.updateOne({ status: !telco.status });

                return res.status(200).json({
                    status: 200,
                    message: 'Cập nhật thành công',
                });
            }

            await telco.updateOne(req.body);

            res.status(200).json({
                status: 200,
                message: 'Cập nhật thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // [POST] /api/telcos/actions
    actionsTelcos: async (req, res) => {
        try {
            const { type } = req.query;
            let updateObject = {};
            let message = '';

            switch (type) {
                case 'off':
                    updateObject = { $set: { status: false } };
                    message = 'Tắt đã chọn thành công';
                    break;
                case 'on':
                    updateObject = { $set: { status: true } };
                    message = 'Bật đã chọn thành công';
                    break;
                case 'delete':
                    await Telco.deleteMany({ _id: { $in: req.body } });
                    message = 'Xóa đã chọn thành công';
                    break;
                default:
                    return res.status(400).json({
                        error: 'Tham số không hợp lệ',
                    });
            }

            if (type === 'off' || type === 'on') {
                await Telco.updateMany({ _id: { $in: req.body } }, updateObject);
            }

            res.status(200).json({
                status: 200,
                message,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // [POST] /api/telcos/search
    searchTelcos: async (req, res) => {
        try {
            const { type, keyword } = req.query;

            let objectWhere = {};
            if (type === 'code') {
                objectWhere.product_code = new RegExp(keyword, 'i');
            } else if (type === 'name') {
                objectWhere.telco = new RegExp(keyword, 'i');
            } else {
                return res.status(400).json({
                    error: 'Tham số không hợp lệ',
                });
            }

            const telcos = await Telco.find(objectWhere)
                .select('telco discount image_url priority product_code status createdAt updatedAt')
                .sort({ priority: 1 })
                .limit(10);

            res.status(200).json({
                status: 200,
                data: telcos,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    getTelcoByPlayers: async (req, res) => {
        try {
            const { country, language } = req.query;

            if (!country || !language) {
                return res.status(400).json({
                    error: 'error_require_params',
                });
            }

            if (country !== 'VN' || language !== 'vi') {
                return res.status(400).json({
                    error: 'error_params',
                });
            }

            const data = await Telco.find({ status: true })
                .select('telco value discount priority')
                .sort({ priority: 1 });

            res.status(200).json({
                status: 200,
                data,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },
};

export default telcosController;
