import { postCard } from '../configs';
import { Partner, Stat, Telco } from '../models';

const postCardService = {
    // [POST] /chargingws/v2
    validateCard: async (req, res, next) => {
        const { telco, code, serial, amount, account_id } = req.body;

        if (!telco || !code || !serial || !amount || !account_id) {
            return res.status(400).json({
                error: 'Vui lòng nhập đầy đủ thông tin',
            });
        }

        if (!telco) {
            return res.status(400).json({
                error: 'Vui lòng chọn loại thẻ muốn nạp',
            });
        }
        if (!amount) {
            return res.status(400).json({
                error: 'Vui lòng chọn mệnh giá muốn nạp',
            });
        }
        if (!serial) {
            return res.status(400).json({
                error: 'Vui lòng nhập serial thẻ muốn nạp',
            });
        }
        if (!code) {
            return res.status(400).json({
                error: 'Vui lòng nhập mã thẻ muốn nạp',
            });
        }
        if (!account_id || account_id.length < 8 || account_id.length > 11) {
            return res.status(400).json({
                error: 'ID người chơi không hợp lệ',
            });
        }

        const card = await Telco.findOne({ telco, status: true }).select(
            'code_length serial_length telco product_code'
        );
        if (!card) {
            return res.status(404).json({
                error: `Thẻ ${telco} không tồn tại hoặc bảo trì`,
            });
        }

        const isCode = await Stat.findOne({ code });
        const isSerial = await Stat.findOne({ serial });
        if (isCode || isSerial) {
            return res.status(400).json({
                error: 'Thẻ sai hoặc thẻ đã được sử dụng',
            });
        }

        if (card.serial_length !== serial.length) {
            return res.status(400).json({
                error: `Serial thẻ không đúng định dạng`,
            });
        }

        if (card.code_length !== code.length) {
            return res.status(400).json({
                error: `Mã thẻ không đúng định dạng`,
            });
        }

        const partner = await Partner.findOne({ status: true, active: true }).select(
            'partner_name partner_id partner_key partner_url'
        );
        if (!partner) {
            return res.status(404).json({
                error: 'Máy chủ bảo trì vui lòng thử lại sau',
            });
        }
        req.body.telco = card;
        req.partner = partner;
        next();
    },

    postCardRandom: async (
        telco,
        product_code,
        code,
        serial,
        amount,
        partner_id,
        partner_key,
        partner_url,
        partner,
        account_id
    ) => {
        const result = await postCard(product_code, code, serial, amount, partner_id, partner_key, partner_url);

        const { request_id, status } = result;

        if (status === 400) {
            return {
                code: 400,
                error: 'Bạn đã bị chặn do SPAM thẻ sai',
            };
        }

        if (status === 1 || status === 2) {
            return {
                code: 200,
                error: 'Thẻ đã được sử dụng vui lòng thử lại',
            };
        }

        if (status === 3) {
            const { status, message } = postCardService.checkStatus(result.status);

            await new Stat({
                account_id,
                telco,
                code,
                serial,
                declared_value: amount,
                value: 0,
                amount: 0,
                request_id,
                partner,
                message,
                checked: true,
                status,
            }).save();

            return {
                code: 400,
                error: 'Thẻ sai hoặc đã sử dụng vui lòng thử lại',
            };
        }

        if (status === 99) {
            await new Stat({
                account_id,
                telco,
                code,
                serial,
                declared_value: amount,
                value: 0,
                amount: 0,
                request_id,
                partner,
                message: 'Thẻ chờ',
                checked: true,
                status,
            }).save();

            return {
                code: 200,
                message: 'Thẻ đang chờ kiểm tra xử lý vui lòng chờ',
            };
        }

        return {
            code: 400,
            error: 'Lỗi nạp thẻ vui lòng thử lại sau',
        };
    },
};

export default postCardService;
