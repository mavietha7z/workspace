import { Setting, Telco } from '../models';

const settingController = {
    // [POST] /api/settings
    updateSetting: async (req, res) => {
        try {
            const setting = await Setting.findOne({});
            if (!setting) {
                return res.status(404).json({
                    error: 'Dữ liệu cài đặt không tồn tại',
                });
            }

            await setting.updateOne(req.body);

            res.status(200).json({
                status: 200,
                message: 'Cập nhật cài đặt thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi yêu cầu' });
        }
    },

    // [POST] /api/telcos
    updateTelco: async (req, res) => {
        try {
            const { type, telco } = req.query;

            if (!type || !telco) {
                return res.status(400).json({
                    error: 'Tham số cập nhật là bắt buộc',
                });
            }
            if (type !== 'status') {
                return res.status(400).json({
                    error: 'Tham số cập nhật không hợp lệ',
                });
            }

            const result = await Telco.findOne({ telco });
            if (!result) {
                return res.status(404).json({
                    error: `Thẻ ${telco} không tồn tại`,
                });
            }

            await result.updateOne({ status: !result.status });

            res.status(200).json({
                status: 200,
                message: `Cập nhật thẻ ${telco} thành công`,
            });
        } catch (error) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi yêu cầu' });
        }
    },
};

export default settingController;
