import { Telco, Stat, Partner } from '../models';

const playerValidator = {
    // [POST] /api/chargingws/v2
    postCard: async (req, res, next) => {
        const { telco, code, serial } = req.body;

        const card = await Telco.findOne({ telco }).select('code_length serial_length telco product_code');

        if (!card) {
            return res.status(404).json({
                error: `Thẻ ${telco} không tồn tại`,
            });
        }

        const checkCode = await Stat.findOne({ code });
        const checkSerial = await Stat.findOne({ serial });
        if (checkCode || checkSerial) {
            return res.status(400).json({
                error: 'Thẻ cào đã được sử dụng',
            });
        }

        if (!card.code_length && !card.serial_length) {
            return next();
        }

        if (card.code_length && card.code_length !== code.length) {
            return res.status(400).json({
                error: 'Mã thẻ không đúng định dạng',
            });
        }

        if (card.serial_length && card.serial_length !== serial.length) {
            return res.status(400).json({
                error: 'Serial không đúng định dạng',
            });
        }
        req.body.telco = card;
        next();
    },

    // [POST] /api/chargingws/v2
    partner: (req, res, next) => {
        playerValidator.postCard(req, res, async () => {
            const partner = await Partner.findOne({ status: true, active: true });

            if (!partner) {
                return res.status(400).json({
                    error: 'Máy chủ đang bảo trì',
                });
            }

            req.partner = partner;
            next();
        });
    },
};

export default playerValidator;
