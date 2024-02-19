const Message = require('../models/message');

const createMessage = async (req, res) => {
    try {
        const { chatId, senderId, text } = req.body;

        const message = new Message({
            chat_id: chatId,
            sender_id: senderId,
            text,
        });

        const saveMessage = await message.save();

        res.status(200).json({
            status: 200,
            data: saveMessage,
        });
    } catch (error) {
        res.status(500).json('Lỗi hệ thống vui lòng thử lại sau');
    }
};

const getMessage = async (req, res) => {
    try {
        const { chatId } = req.params;

        const message = await Message.find({ chat_id: chatId });

        res.status(200).json({
            status: 200,
            data: message,
        });
    } catch (error) {
        res.status(500).json('Lỗi hệ thống vui lòng thử lại sau');
    }
};

module.exports = { createMessage, getMessage };
