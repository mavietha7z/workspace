const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        chat_id: {
            type: String,
        },
        sender_id: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
