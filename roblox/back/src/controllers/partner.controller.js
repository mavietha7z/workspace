import { Partner } from '../models';

const partnerController = {
    // [GET] /api/partners
    getPartners: async (req, res) => {
        try {
            const { id, type } = req.query;

            if (id && type && type === 'active') {
                const data = await Partner.findById(id).select('-_id partner_name');

                if (data.active) {
                    return res.status(200).json({
                        status: 400,
                        message: 'Đối tác đã được bật',
                    });
                }

                return res.status(200).json({
                    status: 200,
                    data,
                });
            }

            if (id && !type) {
                const partners = await Partner.findById(id).select('-_id partner_id partner_key status');

                return res.status(200).json({
                    status: 200,
                    data: partners,
                });
            }

            const data = await Partner.find({ active: true })
                .select('partner_name partner_id partner_key status createdAt')
                .sort({ createdAt: -1 });

            const actives = await Partner.find({ active: false })
                .select('partner_name status createdAt')
                .sort({ createdAt: -1 });

            res.status(200).json({
                status: 200,
                data,
                actives,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // [DELETE] /api/partners/destroy
    destroyPartners: async (req, res) => {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({
                    error: 'Tham số là bắt buộc',
                });
            }

            const partner = await Partner.findById(id);

            if (!partner) {
                return res.status(404).json({
                    error: 'Đối tác không tồn tại',
                });
            }

            await partner.updateOne({ active: false, status: false, partner_id: '', partner_key: '' });

            res.status(200).json({
                status: 200,
                message: 'Tắt đối tác thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // [PUT] /api/partners/update
    updatePartners: async (req, res) => {
        try {
            const { id, type } = req.query;

            const partners = await Partner.findById(id);

            if (!partners) {
                return res.status(404).json({
                    error: 'Đối tác không tồn tại',
                });
            }

            if (type) {
                await partners.updateOne({ status: !partners.status });

                return res.status(200).json({
                    status: 200,
                    message: 'Cập nhật đối tác thành công',
                });
            }

            await partners.updateOne(req.body);

            res.status(200).json({
                status: 200,
                message: 'Cập nhật đối tác thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // [POST] /api/partners/actions
    actionsPartners: async (req, res) => {
        try {
            const partners = await Partner.find({ active: true });
            if (partners.length > 0) {
                return res.status(400).json({
                    error: 'Vui lòng tắt đối tác đang hoạt động',
                });
            }

            const partner = await Partner.findById(req.query.id);
            if (!partner) {
                return res.status(404).json({
                    error: 'Đối tác không tồn tại',
                });
            }

            await partner.updateOne(req.body);

            res.status(200).json({
                status: 200,
                message: 'Bật đối tác thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },
};

export default partnerController;
