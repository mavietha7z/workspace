import mongoose, { Schema } from 'mongoose';

const verifyEmail = new Schema(
    {
        code: {
            type: Array,
        },
        email: {
            type: String,
        },
        status: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const VerifyEmail = mongoose.model('VerifyEmail', verifyEmail);
