import { postCard } from '.';
import cron from 'node-cron';
import { Stat } from '../models';
import postCardService from '../services/postcard.service';

// Cron check trạng thái thẻ
cron.schedule(
    '*/8  * * * * *',
    async () => {
        const stats = await Stat.find({ status: 88 })
            .populate({
                path: 'telco',
                select: 'telco product_code',
                modal: 'Telco',
            })
            .populate({
                path: 'partner',
                select: 'partner_id partner_key partner_url',
                modal: 'Partner',
            });

        if (stats.length > 0) {
            stats.forEach(async (card) => {
                const { telco, code, serial, declared_value, partner } = card;
                const { partner_id, partner_key, partner_url } = partner;

                const createdAt = new Date(card.createdAt);
                const now = new Date();
                const minutes = now - createdAt;
                const isTrue = Math.abs(minutes / 1000) >= 8;

                if (isTrue) {
                    const result = await postCard(
                        telco.product_code,
                        code,
                        serial,
                        declared_value,
                        partner_id,
                        partner_key,
                        partner_url
                    );

                    if (result.status === 400) {
                        return await card.updateOne({ status: 3, message: 'SPAM' });
                    }

                    if (result.status === 102) {
                        return await card.updateOne({ status: 3, message: 'Lỗi API' });
                    }

                    if (result) {
                        const { amount, value, request_id } = result;
                        const { message, status } = postCardService.checkStatus(result.status);

                        await card.updateOne({
                            status,
                            message,
                            amount,
                            value,
                            request_id,
                        });
                    }
                }
            });
        }
    },
    {
        scheduled: true,
        timezone: 'Asia/Ho_Chi_Minh',
    }
).start();
