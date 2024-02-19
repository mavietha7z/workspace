import { Category, Service, Setting, User } from '../model';

const settingController = {
    // [POST] /api/settings/create
    createSetting: async (req, res) => {
        try {
            const setting = await new Setting(req.body).save();

            res.status(200).json({
                code: 200,
                data: setting,
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    // [POST] /api/settings
    getSetting: async (req, res) => {
        try {
            const setting = await Setting.find({}).select('phone_number telegram_url facebook_url logo_url -_id');

            res.status(200).json({
                code: 200,
                data: setting[0],
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    updateSetting: async (req, res) => {
        try {
            const settings = await Setting.find({});

            await settings[0].updateOne(req.body);

            res.status(200).json({
                code: 200,
                message: 'Update successfully',
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    getHomePage: async (req, res) => {
        try {
            const countCategory = await Category.countDocuments({});
            const countService = await Service.countDocuments({});
            const countUser = await User.countDocuments({});

            res.status(200).json({
                code: 200,
                data: {
                    countCategory,
                    countService,
                    countUser,
                },
            });
        } catch (error) {
            console.log('error: ', error);
            res.status(500).json({ error: 'Server error' });
        }
    },
};

export default settingController;
