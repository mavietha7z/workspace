import request from '~/utils';

export const getTelcos = async () => {
    try {
        const res = await request.get('/telcos/players', {
            params: {
                country: 'VN',
                language: 'vi',
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const postCard = async (card) => {
    try {
        const res = await request.post('/chargingws/v2', card);

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};
