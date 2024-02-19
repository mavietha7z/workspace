import request from '~/utils';

export const getUsers = async (page) => {
    try {
        const res = await request.get('/auth/get-users', {
            params: {
                page,
            },
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const updateUser = async (data, id, type) => {
    try {
        const res = await request.put('/auth/update-user', data, {
            params: {
                type,
                id,
            },
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};
