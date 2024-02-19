import mongoose, { Schema } from 'mongoose';

const comment = new Schema(
    {
        lesson_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson',
        },
        posts_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        author_reply: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        content_HTML: {
            type: String,
        },
        content_markdown: {
            type: String,
        },
        feels: [
            {
                author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                type_feel: {
                    type: String,
                },
                icon: {
                    type: String,
                },
            },
        ],
        replies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    },
    { timestamps: true }
);

export const Comment = mongoose.model('Comment', comment);
