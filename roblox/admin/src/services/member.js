import request from '~/utils';

export const createMember = async (data) => {
    try {
        const res = await request.post('/members/create', data, {
            params: {
                _m: Math.random(),
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const getMemberCards = async (id) => {
    try {
        const res = await request.get('/members', {
            params: {
                _m: !id ? Math.random() : null,
                id,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const updateMember = async (data, id, type = null) => {
    try {
        const res = await request.put('/members/update', data, {
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

export const destroyMember = async (id) => {
    try {
        const res = await request.delete('/members/destroy', {
            params: {
                id,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};
