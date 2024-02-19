import request from '~/utils';

export const getPartners = async (id = null, type = null) => {
    try {
        const res = await request.get('/partners', {
            params: {
                _p: id ? null : Math.random(),
                type,
                id,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const actionsPartners = async (data, id) => {
    try {
        const res = await request.post('/partners/actions', data, {
            params: {
                id,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const updatePartners = async (data, id, type = null) => {
    try {
        const res = await request.put('/partners/update', data, {
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
export const destroyPartners = async (id) => {
    try {
        const res = await request.delete('/partners/destroy', {
            params: {
                id,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};
