import request from '~/utils';

export const destroyData = async (type, date) => {
    try {
        const res = await request.delete('/settings/destroy-data', {
            params: {
                type,
                date,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};
