import md5 from 'md5';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import FormData from 'form-data';

export const isNaN = (x) => {
    x = Number(x);
    return x != x;
};

export const convertCurrency = (number) => {
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ' : '0 đ';
};

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            admin: user.admin,
            status: user.status,
            role: user.role,
        },
        'jwt-access-key',
        {
            expiresIn: '30m',
        }
    );
};

export const generateNumber = () => {
    const result = Math.floor(Math.random() * 999999999) + 1;

    return result.toString();
};

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
