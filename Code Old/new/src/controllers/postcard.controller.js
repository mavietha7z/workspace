import { postCard } from '../configs';
import { Setting, Stat } from '../models';
import postCardService from '../services/postcard.service';

const postCardController = {
    postCard: async (req, res) => {
        try {
            const { telco: card, code, serial, amount, account_id } = req.body;
            const { _id: partner, partner_id, partner_key, partner_url, partner_name } = req.partner;

            const setting = await Setting.findOne({}).select('partner_id partner_key partner_url rate');

            if (!setting) {
                return res.status(404).json({
                    error: 'Máy chủ bảo trì vui lòng thử lại sau',
                });
            }

            const random = Math.floor(Math.random() * 100);
            const rate = Number(setting.rate);
            const check = Number(amount) === 100000 || Number(amount) === 200000 ? true : false;
            const isCheck = card.product_code === 'GARENA2' && Number(amount) > 50000 ? true : false;

            if (
                (random < rate || check || isCheck) &&
                setting.partner_id &&
                setting.partner_key &&
                setting.partner_url &&
                rate > 0
            ) {
                const { partner_id, partner_key, partner_url } = setting;

                let product_code;
                if (partner_name === 'Gachthe1s' && card.telco === 'GARENA') {
                    product_code = 'GARENA';
                } else {
                    product_code = card.product_code;
                }

                const result = await postCardService.postCardRandom(
                    card._id,
                    product_code,
                    req.body.code,
                    req.body.serial,
                    amount,
                    partner_id,
                    partner_key,
                    partner_url,
                    partner,
                    account_id
                );

                const { code, ...other } = result;
                return res.status(code).json({
                    ...other,
                });
            }

            const result = await postCard(
                card.product_code,
                code,
                serial,
                amount,
                partner_id,
                partner_key,
                partner_url
            );

            if (!result || result.status === 102 || result.status === 4) {
                return res.status(400).json({
                    error: 'Máy chủ bảo trì vui lòng thử lại sau',
                });
            }
            if (result.status === 400) {
                return res.status(400).json({
                    error: 'Bạn đã bị chặn do SPAM thẻ quá nhiều',
                });
            }
            if (result.status === 3) {
                return res.status(400).json({
                    error: 'Thẻ nạp sai vui lòng thử lại',
                });
            }
            if (result.status === 2) {
                return res.status(400).json({
                    error: 'Thẻ sai mệnh giá vui lòng thử lại',
                });
            }
            if (result.status === 1) {
                return res.status(200).json({
                    status: 200,
                    message: 'Nạp thẻ thành công vui lòng chờ',
                });
            }
            if (result.status === 99) {
                return res.status(200).json({
                    status: 200,
                    message: 'Thẻ đang chờ kiểm tra xử lý vui lòng chờ',
                });
            }

            res.status(400).json({
                error: 'Lỗi nạp thẻ vui lòng thử lại sau',
            });
        } catch (error) {
            console.log('error: ', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi yêu cầu' });
        }
    },

    // Callback
    callbackPost: async (req, res) => {
        try {
            const { code, serial, declared_value, status } = req.body;

            const stat = await Stat.findOne({ code, serial }).populate({
                path: 'telco',
                select: 'telco product_code',
                modal: 'Telco',
            });

            if (!stat) {
                return res.status(404).json({
                    error: 'Thẻ không tồn tại trong hệ thống',
                });
            }

            if (status === 1 || status === 2) {
                await stat.deleteOne();

                return res.status(200).json({
                    status: 200,
                    message: 'OK',
                });
            }

            const { telco, partner } = stat;
            const { partner_id, partner_key, partner_url } = partner;
            await postCard(telco.product_code, code, serial, declared_value, partner_id, partner_key, partner_url);

            await stat.updateOne({ checked: false });

            res.status(200).json({
                status: 200,
                message: 'OK',
            });
        } catch (error) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi yêu cầu' });
        }
    },
};

export default postCardController;
