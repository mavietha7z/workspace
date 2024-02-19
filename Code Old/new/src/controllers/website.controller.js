import jwt from 'jsonwebtoken';
import { formatTimestamp } from '../configs';
import { Auth, Partner, Setting, Stat, Telco } from '../models';

const websiteController = {
    // [GET] /admincp
    admincpController: async (req, res) => {
        try {
            const result = await Stat.find({})
                .select(
                    'telco code serial declared_value value amount request_id partner message status createdAt updatedAt'
                )
                .populate({
                    path: 'telco',
                    select: 'telco',
                    model: 'Telco',
                })
                .populate({
                    path: 'partner',
                    select: 'partner_name',
                    model: 'Partner',
                });

            const stats = result.map((stat) => {
                const {
                    telco,
                    code,
                    serial,
                    declared_value,
                    value,
                    amount,
                    request_id,
                    partner,
                    message,
                    status,
                    createdAt,
                    updatedAt,
                } = stat;

                return {
                    telco: telco.telco,
                    code,
                    serial,
                    declared_value,
                    value,
                    amount,
                    request_id,
                    partner: partner.partner_name,
                    message,
                    status,
                    createdAt: formatTimestamp(createdAt),
                    updatedAt: formatTimestamp(updatedAt),
                };
            });

            res.render('admin.ejs', { stats });
        } catch (error) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi yêu cầu' });
        }
    },

    // [GET] /admincp/login
    loginAdmin: async (req, res) => {
        try {
            const { access_key } = req.cookies;

            jwt.verify(access_key, 'jwt-access-key', async (error, user) => {
                if (error) {
                    return res.render('login.ejs');
                }

                const userToken = await Auth.findById(user.id).select('status');

                if (userToken) {
                    return res.redirect('/admincp');
                }

                res.render('login.ejs');
            });
        } catch (error) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi yêu cầu' });
        }
    },

    // [GET] /admincp/partners
    partnerController: async (req, res) => {
        try {
            const result = await Partner.find({}).select('partner_name partner_id partner_key active status createdAt');

            const partners = result.map((partner) => {
                const { active, status, partner_id, partner_key, partner_name, createdAt } = partner;

                return {
                    active,
                    status,
                    partner_id,
                    partner_key,
                    partner_name,
                    createdAt: formatTimestamp(createdAt),
                };
            });

            res.render('partner.ejs', { partners });
        } catch (error) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi yêu cầu' });
        }
    },

    // [GET] /admincp/telcos
    telcoController: async (req, res) => {
        try {
            const result = await Telco.find({}).select(
                'telco product_code image_url code_length serial_length status createdAt'
            );

            const telcos = result.map((value) => {
                const { telco, status, image_url, code_length, serial_length, product_code, createdAt } = value;

                return {
                    telco,
                    status,
                    image_url,
                    code_length,
                    product_code,
                    serial_length,
                    createdAt: formatTimestamp(createdAt),
                };
            });

            res.render('telco.ejs', { telcos });
        } catch (error) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi yêu cầu' });
        }
    },

    // [GET] /admincp/settings
    settingController: async (req, res) => {
        try {
            const setting = await Setting.findOne({}).select('partner_id partner_key partner_url rate -_id');

            res.render('setting.ejs', { setting });
        } catch (error) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi yêu cầu' });
        }
    },
};

export default websiteController;
