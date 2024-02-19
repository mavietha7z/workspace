import { Partner } from '../models';

const partnerController = {
    // [POST] /api/partners
    updatePartner: async (req, res) => {
        try {
            const { type, partner_name } = req.query;

            if (!type || !partner_name) {
                return res.status(404).json({
                    error: 'Tham số cập nhật là bắt buộc',
                });
            }

            const partner = await Partner.findOne({ partner_name });
            if (!partner) {
                return res.status(404).json({
                    error: `Đối tác ${partner_name} không tồn tại`,
                });
            }

            if (type === 'status') {
                await partner.updateOne({ status: !partner.status });

                return res.status(200).json({
                    status: 200,
                    message: 'Cập nhật trạng thái đối tác thành công',
                });
            }
            if (type === 'active') {
                await partner.updateOne({ active: !partner.active });

                return res.status(200).json({
                    status: 200,
                    message: 'Cập nhật hoạt động đối tác thành công',
                });
            }
            if (type === 'tab') {
                await partner.updateOne(req.body);

                return res.status(200).json({
                    status: 200,
                    message: 'Cập nhật đối tác thành công',
                });
            }

            res.status(400).json({
                error: 'Tham số không hợp lệ',
            });
        } catch (error) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi yêu cầu' });
        }
    },
};

export default partnerController;
