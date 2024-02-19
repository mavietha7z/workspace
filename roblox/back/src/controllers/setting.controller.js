import { Setting, Stat } from '../models';

const settingController = {
    // [POST] /api/settings/create
    createSetting: async (req, res) => {
        try {
            await new Setting(req.body).save();

            res.status(200).json({
                status: 200,
                message: 'OK',
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // [GET] /api/settings
    getSettings: async (req, res) => {
        try {
            const { role } = req.user;

            let setting;
            if (role === 'ADMIN') {
                setting = await Setting.findOne({}).select('-_id website_status notify_status notify_url chargings');
            } else {
                setting = await Setting.findOne({}).select('-_id website_status notify_status notify_url');
            }

            if (!setting) {
                return res.status(404).json({
                    error: 'Cài đặt không có dữ liệu',
                });
            }

            res.status(200).json({
                status: 200,
                data: setting,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // [PUT] /api/settings/update
    updateSetting: async (req, res) => {
        try {
            const { role } = req.user;
            const { type } = req.query;

            const setting = await Setting.findOne({});

            if (!setting) {
                return res.status(404).json({
                    error: 'Cài đặt không tồn tại',
                });
            }

            if (role === 'ADMIN' && type === 'chargings') {
                const { partner_id, partner_key, partner_url, rate } = req.body;

                await setting.updateOne({
                    'chargings.partner_id': partner_id,
                    'chargings.partner_key': partner_key,
                    'chargings.partner_url': partner_url,
                    'chargings.rate': rate,
                });
            } else {
                await setting.updateOne(req.body);
            }

            res.status(200).json({
                status: 200,
                message: 'Cập nhật thành công',
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // [DELETE] /api/settings/destroy-data
    destroyData: async (req, res) => {
        try {
            const { role } = req.user;
            const { type, date } = req.query;

            if (!role || role !== 'ADMIN') {
                return res.status(403).clearCookie('access_key').json({
                    error: 'Bạn không có quyền này',
                });
            }

            let duration = parseInt(date);
            const unit = date.slice(-1);

            function calculateDate(duration, unit) {
                const currentDate = new Date();

                switch (unit) {
                    case 'd':
                        duration = duration + 1;
                        currentDate.setDate(currentDate.getDate() - duration);
                        break;
                    case 'm':
                        currentDate.setMonth(currentDate.getMonth() - duration);
                        break;
                    default:
                        return res.status(400).json({
                            error: 'Đơn vị thời gian không hợp lệ',
                        });
                }

                return currentDate;
            }

            const date_start = calculateDate(duration, unit);

            if (type === 'charging') {
                await Stat.deleteMany({ createdAt: { $lt: date_start } });
            } else {
                return res.status(400).json({
                    error: 'Tham số không hợp lệ',
                });
            }

            res.status(200).json({
                status: 200,
                message: `Xóa dữ liệu nạp thẻ cũ hơn ${date} thành công`,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },
};

export default settingController;
