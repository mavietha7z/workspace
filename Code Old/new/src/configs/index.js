import md5 from 'md5';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import FormData from 'form-data';

// Format timestamp
export const formatTimestamp = (time) => {
    const date = new Date(time);

    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Generate access token
export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            status: user.status,
        },
        'jwt-access-key',
        {
            expiresIn: '30m',
        }
    );
};

// Random request id post card
export const generateNumber = () => {
    const result = Math.floor(Math.random() * 999999999) + 1;

    return result.toString();
};

// Post card
export const postCard = async (telco, code, serial, amount, partner_id, partner_key, partner_url) => {
    const data = new FormData();
    data.append('telco', telco);
    data.append('code', code);
    data.append('serial', serial);
    data.append('amount', amount);
    data.append('request_id', generateNumber());
    data.append('partner_id', partner_id);
    data.append('sign', md5(partner_key + code + serial));
    data.append('command', 'charging');

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: partner_url,
        headers: {
            'Content-Type': 'application/json',
            ...data.getHeaders(),
        },
        data: data,
    };

    const result = await axios(config);

    return result.data;
};

// Check status card
export const checkStatus = (data) => {
    let message;
    let status;

    switch (data) {
        case 1:
            status = 1;
            message = 'Thẻ đúng';
            break;
        case 2:
            status = 2;
            message = 'Sai mệnh giá';
            break;
        case 3:
            status = 3;
            message = 'Thẻ lỗi';
            break;
        case 4:
            status = 4;
            message = 'Bảo trì';
            break;
        case 99:
            status = 99;
            message = 'Thẻ chờ';
            break;
        case 102:
            status = 102;
            message = 'Lỗi API';
            break;
        case 400:
            status = 400;
            message = 'SPAM';
            break;
        default:
            status = 100;
            message = 'Lỗi gửi thẻ';
    }

    return {
        status,
        message,
    };
};
