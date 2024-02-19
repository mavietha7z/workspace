import request from '~/utils';

export const getSettings = async () => {
    try {
        const res = await request.get('/settings', {
            params: {
                _s: Math.random(),
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const updateSetting = async (data, type) => {
    try {
        const res = await request.put('/settings/update', data, {
            params: {
                type,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};
