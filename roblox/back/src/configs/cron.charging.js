import md5 from 'md5';
import axios from 'axios';
import cron from 'node-cron';
import { Stat } from '../models';
import FormData from 'form-data';
import postCardService from '../services/postcard.service';

// Cron check trạng thái thẻ
cron.schedule(
    '0 * * * * ',
    async () => {
        const stats = await Stat.find({ status: 99 })
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
                const { telco, code, serial, declared_value, partner, request_id } = card;
                const { partner_id, partner_key, partner_url } = partner;

                const data = new FormData();
                data.append('telco', telco.product_code);
                data.append('code', code);
                data.append('serial', serial);
                data.append('amount', declared_value);
                data.append('request_id', request_id);
                data.append('partner_id', partner_id);
                data.append('sign', md5(partner_key + code + serial));
                data.append('command', 'check');

                const config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: partner_url,
                    headers: {
                        'Content-Type': 'application/json',
                        ...data.getHeaders(),
                    },
                    data: data,
                };

                const result = await axios(config);
                const { value, amount } = result.data;
                const { status, message } = postCardService.checkStatus(result.data.status);

                await card.updateOne({
                    status,
                    message,
                    amount,
                    value,
                });
            });
        }
    },
    {
        scheduled: true,
        timezone: 'Asia/Ho_Chi_Minh',
    }
).start();
