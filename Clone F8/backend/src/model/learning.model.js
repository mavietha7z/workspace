import mongoose, { Schema } from 'mongoose';

const learning = new Schema(
    {
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        description: {
            type: String,
        },
        image_url: {
            type: String,
        },
        priority: {
            type: Number,
        },
        slug: {
            type: String,
        },
        status: {
            type: Boolean,
            default: false,
        },
        groups: [
            {
                courses: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Course',
                    },
                ],
                description: {
                    type: String,
                },
                title: {
                    type: String,
                },
                created_at: {
                    type: Date,
                    default: Date.now(),
                },
                updated_at: {
                    type: Date,
                    default: Date.now(),
                },
                priority: {
                    type: Number,
                },
            },
        ],
    },
    { timestamps: true }
);

export const Learning = mongoose.model('Learning', learning);
