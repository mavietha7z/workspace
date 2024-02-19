import mongoose, { Schema } from 'mongoose';

const banner = new Schema(
    {
        title: {
            type: String,
        },
        image_url: {
            type: String,
        },
        description: {
            type: String,
        },
        color: {
            type: String,
        },
        background: {
            type: String,
        },
        link: {
            type: String,
        },
        text_btn: {
            type: String,
        },
        priority: {
            type: Number,
        },
        status: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

mongoose.set('strictQuery', true);

export const Banner = mongoose.model('Banner', banner);
