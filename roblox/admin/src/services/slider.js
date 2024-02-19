import request from '~/utils';

export const createSlider = async (data) => {
    try {
        const res = await request.post('/sliders/create', data);

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const getSliders = async (page = null, id = null) => {
    try {
        const res = await request.get('/sliders', {
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

export const actionSliders = async (data, type) => {
    try {
        const res = await request.post('/sliders/actions', data, {
            params: {
                type,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const updateSliders = async (data, id, type = null) => {
    try {
        const res = await request.put('/sliders/update', data, {
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
export const destroySlider = async (id) => {
    try {
        const res = await request.delete('/sliders/destroy', {
            params: {
                id,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};
