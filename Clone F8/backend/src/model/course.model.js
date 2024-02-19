import mongoose, { Schema } from 'mongoose';

const course = new Schema(
    {
        title: {
            type: String,
        },
        image_url: {
            type: String,
        },
        icon: {
            type: String,
        },
        video: {
            type: String,
        },
        description: {
            type: String,
        },
        priority: {
            type: Number,
            default: 0,
        },
        slug: {
            type: String,
        },
        coming_soon: {
            type: Boolean,
        },
        pre_order: {
            type: Boolean,
        },
        pro: {
            type: Boolean,
            default: false,
        },
        published: {
            type: Boolean,
            default: false,
        },
        selling: {
            type: Boolean,
            default: false,
        },
        old_price: {
            type: Number,
            default: 0,
        },
        pre_order_price: {
            type: Number,
            default: 0,
        },
        learn_what: {
            type: Array,
        },
        chapters: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Chapter',
            },
        ],
        price: {
            type: Number,
            default: 0,
        },
        user_learning: {
            type: Number,
            default: 0,
        },
        status: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Course = mongoose.model('Course', course);
