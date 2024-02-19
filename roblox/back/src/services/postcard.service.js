import { Stat } from '../models';
import { postCard } from '../configs';

const postCardService = {
    postCardRandom: async (
        nickname,
        telco_id,
        product_code,
        telco_code,
        telco_serial,
        amount,
        partner_id,
        partner_key,
        partner_url,
        partner
    ) => {
        const result = await postCard(
            product_code,
            telco_code,
            telco_serial,
            amount,
            partner_id,
            partner_key,
            partner_url
        );

        const { request_id, telco, serial, code, status, trans_id } = result;

        const data = {
            amount,
            telco,
        };

        if (status === 400) {
            await new Stat({
                nickname,
                telco: telco_id,
                code,
                serial,
                declared_value: amount || 0,
                value: 0,
                amount: 0,
                request_id,
                status: 3,
                partner,
                method: 'API',
                message: 'SPAM',
                checked: false,
                callback_sign: '',
                trans_id,
            }).save();

            return {
                status: 400,
                data,
            };
        }

        if (status === 1 || status === 2) {
            return {
                status,
                data,
            };
        }

        if (status === 3 || status === 4) {
            const { status, message } = postCardService.checkStatus(result.status);

            await new Stat({
                nickname,
                telco: telco_id,
                code: telco_code,
                serial: telco_serial,
                declared_value: amount || 0,
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

            return {
                status,
                data,
            };
        }

        if (status === 99) {
            await new Stat({
                nickname,
                telco: telco_id,
                code,
                serial,
                declared_value: amount || 0,
                value: 0,
                amount: 0,
                request_id,
                status: 88,
                partner,
                method: 'API',
                message: 'Thẻ chờ',
                checked: true,
                callback_sign: '',
                trans_id,
            }).save();

            return {
                status,
                data,
            };
        }

        return {
            status: 3,
            data,
        };
    },

    checkStatus: (data) => {
        let message;
        let status;

        switch (data) {
            case 1:
                status = 1;
                message = 'Thẻ đúng';
                break;
            case 2:
                status = 2;
                message = 'Sai mệnh giá';
                break;
            case 3:
                status = 3;
                message = 'Thẻ lỗi';
                break;
            case 4:
                status = 4;
                message = 'Bảo trì';
                break;
            case 99:
                status = 99;
                message = 'Thẻ chờ';
                break;
            case 102:
                status = 3;
                message = 'Lỗi API';
            case 400:
                status = 3;
                message = 'SPAM';
            default:
                status = 100;
                message = 'Lỗi gửi thẻ';
        }

        return {
            status,
            message,
        };
    },
};

export default postCardService;
