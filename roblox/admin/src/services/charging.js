import request from '~/utils';

export const getStatChargings = async ({
    page,
    telco,
    amount,
    partner,
    date_start,
    date_end,
    status,
    code,
    serial,
    type,
}) => {
    try {
        const res = await request.get('/statistic/chargings', {
            params: {
                page,
                telco,
                amount,
                partner,
                date_start,
                date_end,
                status,
                code,
                serial,
                type,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const getTotalCharging = async (type = null) => {
    try {
        const res = await request.get('/statistic/total-chargings', {
            params: {
                _e: type ? null : Math.random(),
                type,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const getDailyStats = async () => {
    try {
        const res = await request.get('/statistic/daily-stats', {
            params: {
                _d: Math.random(),
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const getUsersYield = async (page) => {
    try {
        const res = await request.get('/statistic/users-yield', {
            params: {
                page,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};
