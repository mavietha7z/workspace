import mongoose, { Schema } from 'mongoose';

const telcoSchema = new Schema(
    {
        telco: {
            type: String,
        },
        value: {
            type: Array,
        },
        description: {
            type: String,
        },
        discount: {
            type: Number,
            default: 0,
        },
        priority: {
            type: Number,
        },
        image_url: {
            type: String,
        },
        code_length: {
            type: Number,
        },
        serial_length: {
            type: Number,
        },
        product_code: {
            type: String,
        },
        status: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

const partnerSchema = new Schema(
    {
        partner_name: {
            type: String,
        },
        partner_id: {
            type: String,
        },
        partner_key: {
            type: String,
        },
        partner_url: {
            type: String,
        },
        active: {
            type: Boolean,
        },
        status: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

const authSchema = new Schema(
    {
        full_name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        admin: {
            type: Boolean,
        },
        role: {
            type: String,
        },
        avatar_url: {
            type: String,
        },
        status: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

const statSchema = new Schema(
    {
        nickname: {
            type: String,
        },
        telco: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Telco',
        },
        code: {
            type: String,
        },
        serial: {
            type: String,
        },
        declared_value: {
            // Giá trị khai báo
            type: Number,
        },
        value: {
            // Giá trị thực của thẻ
            type: Number,
        },
        amount: {
            // Số tiền nhận được
            type: Number,
        },
        request_id: {
            type: String,
        },
        method: {
            type: String,
        },
        partner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Partner',
        },
        message: {
            type: String,
        },
        description: {
            type: String,
            default: '',
        },
        checked: {
            type: Boolean,
        },
        callback_sign: {
            type: String,
        },
        trans_id: {
            type: Number,
        },
        status: {
            type: Number,
        },
    },
    { timestamps: true }
);

const settingSchema = new Schema(
    {
        chatbot_id: {
            type: Number,
        },
        website_status: {
            type: Boolean,
        },
        notify_status: {
            type: Boolean,
        },
        notify_url: {
            type: String,
        },
        chargings: {
            type: Object,
        },
    },
    { timestamps: true }
);

export const Auth = mongoose.model('Auth', authSchema);
export const Stat = mongoose.model('Stat', statSchema);
export const Telco = mongoose.model('Telco', telcoSchema);
export const Partner = mongoose.model('Partner', partnerSchema);
export const Setting = mongoose.model('Setting', settingSchema);
