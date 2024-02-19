const validatorPartner = {
    // [POST] /api/sliders/actions
    actionsPartners: async (req, res, next) => {
        const { id } = req.query;
        const { partner_id, partner_key, status, active } = req.body;

        if (!id) {
            return res.status(400).json({
                error: 'Tham số là bắt buộc',
            });
        }

        if (!partner_id) {
            return res.status(400).json({
                error: 'Partner id là bắt buộc',
            });
        }

        if (!partner_key) {
            return res.status(400).json({
                error: 'Partner key là bắt buộc',
            });
        }

        if (typeof status !== 'boolean' || typeof active !== 'boolean') {
            return res.status(400).json({
                error: 'Kiểu dữ liệu không hợp lệ',
            });
        }

        next();
    },

    // [PUT] /api/partners/update
    updatePartners: (req, res, next) => {
        const { id, type } = req.query;
        if (type && type !== 'status') {
            return res.status(400).json({
                error: 'Tham số không hợp lệ',
            });
        }

        if (id && type === 'status') {
            return next();
        }

        const { partner_id, partner_key } = req.body;

        if (!id) {
            return res.status(400).json({
                error: 'Tham số là bắt buộc',
            });
        }

        if (!partner_id) {
            return res.status(400).json({
                error: 'ID đối tác là bắt buộc',
            });
        }

        if (!partner_key) {
            return res.status(400).json({
                error: 'Key đối tác là bắt buộc',
            });
        }

        next();
    },
};

export default validatorPartner;
