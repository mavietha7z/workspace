import request from '~/utils';

// Xong
export const getTelcos = async (page = null, id = null) => {
    try {
        const res = await request.get('/telcos', {
            params: {
                page,
                id,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

// Xong
export const createTelco = async (data) => {
    try {
        const res = await request.post('/telcos/create', data);

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

// Xong
export const updateTelco = async (data, id, type = null) => {
    try {
        const res = await request.put('/telcos/update', data, {
            params: {
                type,
                id,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

// Xong
export const destroyTelco = async (id) => {
    try {
        const res = await request.delete('/telcos/destroy', {
            params: {
                id,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

// Xong
export const actionsTelcos = async (data, type) => {
    try {
        const res = await request.post('/telcos/actions', data, {
            params: {
                type,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

// Xong
export const searchTelcos = async (type, keyword) => {
    try {
        const res = await request.post(
            '/telcos/search',
            {},
            {
                params: {
                    type,
                    keyword,
                },
            }
        );

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};
