import request from '~/utils';

export const getSetting = async () => {
    try {
        const res = await request.get('/settings', {
            params: {
                _s: Math.random(),
            },
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const updateSetting = async (data) => {
    try {
        const res = await request.put('/settings/update', data, {
            params: {
                _n: Math.random(),
            },
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getHomeData = async () => {
    try {
        const res = await request.get('/settings/home', {
            params: {
                _h: Math.random(),
            },
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};
