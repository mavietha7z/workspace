const Chat = require('../models/chat');

const createChat = async (req, res) => {
    try {
        const { firstId, secondId } = req.body;

        const chat = await Chat.findOne({ members: { $all: [firstId, secondId] } });

        if (chat) {
            return res.status(200).json({
                status: 200,
                data: chat,
            });
        }

        const newChat = new Chat({
            members: [firstId, secondId],
        });

        const saveChat = await newChat.save();

        res.status(200).json({
            status: 200,
            data: saveChat,
        });
    } catch (error) {
        res.status(500).json('Lỗi hệ thống vui lòng thử lại sau');
    }
};

const findUserChats = async (req, res) => {
    try {
        const { userId } = req.params;

        const chats = await Chat.find({ members: { $in: [userId] } });

        res.status(200).json({
            status: 200,
            data: chats,
        });
    } catch (error) {
        res.status(500).json('Lỗi hệ thống vui lòng thử lại sau');
    }
};

const findChat = async (req, res) => {
    try {
        const { firstId, secondId } = req.params;

        const chats = await Chat.find({ members: { $all: [firstId, secondId] } });

        res.status(200).json({
            status: 200,
            data: chats,
        });
    } catch (error) {
        res.status(500).json('Lỗi hệ thống vui lòng thử lại sau');
    }
};

module.exports = { createChat, findUserChats, findChat };
