import request from '~/utils';

export const createService = async (data) => {
    try {
        const res = await request.post('/services/create', data, {
            params: {
                _c: Math.random(),
            },
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getServices = async (id = null, type = null) => {
    try {
        const res = await request.get('/services', {
            params: {
                type,
                id,
                _i: Math.random(),
            },
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const updateService = async (id, data) => {
    try {
        const res = await request.put('/services/update', data, {
            params: {
                id,
            },
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const destroyService = async (id) => {
    try {
        const res = await request.delete('/services/destroy', {
            params: {
                id,
            },
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};
