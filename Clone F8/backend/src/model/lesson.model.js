import mongoose, { Schema } from 'mongoose';

const lesson = new Schema(
    {
        title: {
            type: String,
        },
        time_video: {
            type: String,
        },
        video_url: {
            type: String,
        },
        thumb_nail: {
            type: String,
        },
        chapter_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chapter',
        },
        priority: {
            type: Number,
            default: 0,
        },
        desc_HTML: {
            type: String,
        },
        desc_markdown: {
            type: String,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    },
    { timestamps: true }
);

export const Lesson = mongoose.model('Lesson', lesson);
