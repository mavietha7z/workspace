import dotenv from 'dotenv';
import { Stat } from '../models';
import { Telegraf } from 'telegraf';
import { Setting } from '../models';
import { convertCurrency } from '../configs';

dotenv.config();
const botOder = new Telegraf('6582312006:AAHN-rccciayPvhXoJdqDKzlrKTslnd0uHc');

// Lệnh bắt đầu chạy bot oder
botOder.command('start', async (ctx) => {
    const setting = await Setting.findOne({});
    const userId = ctx.from.id;

    await setting.updateOne({ chatbot_id: userId });

    botOder.telegram.sendMessage(userId, `Xin chào ${userId} Bot đã được khởi động.`);
});

// Tính tổng thẻ ngày hôm nay
botOder.command('total_today', async (ctx) => {
    const date = new Date();
    const dateStart = date.setHours(0, 0, 0, 0);
    const dateEnd = date.setHours(23, 59, 59, 999);

    const result = await Stat.find({ createdAt: { $gte: dateStart, $lt: dateEnd } }).select(
        'declared_value value amount'
    );

    let declared_value = 0;
    let value = 0;
    let amount = 0;

    for (let i = 0; i < result.length; i++) {
        declared_value += result[i].declared_value;
        value += result[i].value;
        amount += result[i].amount;
    }

    const message = `Thẻ nạp hôm nay là: ${convertCurrency(declared_value)}
Thẻ đúng hôm nay là: ${convertCurrency(value)}
Tiền nhận hôm nay là: ${convertCurrency(amount)}
    `;
    botOder.telegram.sendMessage(ctx.chat.id, message, { parse_mode: 'HTML' });
});

// Hàm thông báo có đơn nạp thẻ
export const sendOrderNotification = async (telco, code, serial, face_value, status) => {
    const { chatbot_id } = await Setting.findOne({}).select('chatbot_id');

    const message = `┣➤ Loại thẻ :  <b>${telco}</b>
┣➤ Mã thẻ :  <b>${code}</b>
┣➤ Seri thẻ :  <b>${serial}</b>
┣➤ Mệnh giá :  <b>${convertCurrency(face_value)}</b>
┣➤ Trạng thái :  <b>${status}</b>
┗━━━━━━━━━━━━┛`;

    botOder.telegram.sendMessage(chatbot_id, message, { parse_mode: 'HTML' });
};

botOder.launch();
