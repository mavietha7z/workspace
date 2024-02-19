import mongoose, { Schema } from 'mongoose';

const video = new Schema(
    {
        title: {
            type: String,
        },
        image_url: {
            type: String,
        },
        video_url: {
            type: String,
        },
        time_video: {
            type: String,
        },
        views: {
            type: String,
        },
        feels: {
            type: String,
        },
        comments: {
            type: String,
        },
        status: {
            type: Boolean,
            default: false,
        },
        priority: {
            type: Number,
            default: 1,
        },
        home_page: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Video = mongoose.model('Video', video);
