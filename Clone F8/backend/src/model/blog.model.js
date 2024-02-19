import mongoose, { Schema } from 'mongoose';

const blog = new Schema(
    {
        title: {
            type: String,
        },
        meta_title: {
            type: String,
        },
        meta_description: {
            type: String,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        content_HTML: {
            type: String,
        },
        content_markdown: {
            type: String,
        },
        slug: {
            type: String,
        },
        priority: {
            type: Number,
            default: 0,
        },
        home_page: {
            type: Boolean,
            default: false,
        },
        reading_time: {
            type: Number,
            default: 0,
        },
        image_prev: {
            type: String,
        },
        tags: {
            type: Array,
        },
        reactions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
        status: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Blog = mongoose.model('Blog', blog);
