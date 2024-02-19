import request from '~/utils';

export const getUsers = async ({ page, status, account_id, type }) => {
    try {
        const res = await request.get('/users', {
            params: {
                page,
                status,
                account_id,
                type,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const updateUser = async (id) => {
    try {
        const res = await request.put(
            '/users/update',
            {},
            {
                params: {
                    id,
                },
            }
        );

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const destroyUser = async (id) => {
    try {
        const res = await request.delete('/users/destroy', {
            params: {
                id,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const getHistory = async (page) => {
    try {
        const res = await request.get('/users/history', {
            params: {
                page,
            },
        });

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};
