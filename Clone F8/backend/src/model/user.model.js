import mongoose, { Schema } from 'mongoose';

const user = new Schema(
    {
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        full_name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        username: {
            type: String,
        },
        status: {
            type: Boolean,
            default: true,
        },
        avatar_url: {
            type: String,
        },
        cover_url: {
            type: String,
        },
        bio: {
            type: String,
        },
        phone_number: {
            type: String,
        },
        instagram_url: {
            type: String,
        },
        facebook_url: {
            type: String,
        },
        linkedin_url: {
            type: String,
        },
        twitter_url: {
            type: String,
        },
        youtube_url: {
            type: String,
        },
        blogs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Blog',
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
        post_save: [
            {
                post: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Blog',
                },
                timestamps: {
                    type: Date,
                    default: Date.now(),
                },
            },
        ],
        courses: [
            {
                course: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Course',
                },
                progression: {
                    type: Number,
                    default: 0,
                },
                last_completed_at: {
                    type: Date,
                    default: Date.now(),
                },
            },
        ],
        notify: [
            {
                avatar: {
                    type: String,
                },
                description: {
                    type: String,
                },
                timestamps: {
                    type: Date,
                    default: Date.now(),
                },
                watch: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        activities: [
            {
                comment_content: {
                    type: String,
                },
                post_title: {
                    type: String,
                },
                link_to: {
                    type: String,
                },
                partner: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                reaction: {
                    type: String,
                },
                type: {
                    type: String,
                },
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
        tick: {
            type: Boolean,
            default: false,
        },
        admin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const User = mongoose.model('User', user);
