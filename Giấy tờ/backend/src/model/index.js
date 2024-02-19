import mongoose, { Schema } from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

const userSchema = new Schema(
    {
        full_name: {
            type: String,
        },
        password: {
            type: String,
        },
        avatar_url: {
            type: String,
        },
        email: {
            type: String,
        },
        phone_number: {
            type: String,
        },
        is_admin: {
            type: Boolean,
            default: false,
        },
        is_status: {
            type: Boolean,
            default: true,
        },
        my_comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
        my_services: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Service',
            },
        ],
    },
    { timestamps: true }
);

const serviceSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        title: {
            type: String,
        },
        priority: {
            type: Number,
        },
        slug: {
            type: String,
            slug: 'title',
            slugPaddingSize: 2,
            unique: true,
        },
        views_count: {
            type: Number,
            default: 0,
        },
        image_url: {
            type: String,
            default: '',
        },
        content: {
            type: String,
        },
        content_html: {
            type: String,
        },
        description: {
            type: String,
        },
        is_status: {
            type: Boolean,
            default: false,
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

const commentSchema = new Schema(
    {
        service_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
        },
        is_status: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const settingSchema = new Schema(
    {
        phone_number: {
            type: String,
        },
        facebook_url: {
            type: String,
        },
        telegram_url: {
            type: String,
        },
        logo_url: {
            type: String,
        },
    },
    { timestamps: true }
);

const categorySchema = new Schema(
    {
        title: {
            type: String,
        },
        slug: {
            type: String,
            slug: 'title',
            slugPaddingSize: 2,
            unique: true,
        },
        priority: {
            type: Number,
        },
        is_status: {
            type: Boolean,
            default: false,
        },
        services: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Service',
            },
        ],
    },
    { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
export const Service = mongoose.model('Service', serviceSchema);
export const Comment = mongoose.model('Comment', commentSchema);
export const Setting = mongoose.model('Setting', settingSchema);
export const Category = mongoose.model('Category', categorySchema);
