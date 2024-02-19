import mongoose, { Schema } from 'mongoose';

const chapter = new Schema(
    {
        title: {
            type: String,
            require: true,
        },
        course_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
        priority: {
            type: Number,
            default: 0,
        },
        lessons: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Lesson',
            },
        ],
    },
    { timestamps: true }
);

export const Chapter = mongoose.model('Chapter', chapter);
