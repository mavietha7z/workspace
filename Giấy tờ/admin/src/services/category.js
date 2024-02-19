import request from '~/utils';

export const createCategory = async (data) => {
    try {
        const res = await request.post('/categories/create', data, {
            params: {
                _c: Math.random(),
            },
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getCategories = async (id = null) => {
    try {
        const res = await request.get('/categories', {
            params: {
                id,
                _c: Math.random(),
            },
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const updateCategory = async (id, data) => {
    try {
        const res = await request.put('/categories/update', data, {
            params: {
                id,
            },
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteCategory = async (id) => {
    try {
        const res = await request.delete('/categories/destroy', {
            params: {
                id,
            },
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const moreServices = async (id, data) => {
    try {
        const res = await request.put('/categories/more-services', data, {
            params: {
                id,
            },
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const destroyService = async (id, data) => {
    try {
        const res = await request.post(
            '/categories/destroy-service',
            { data },
            {
                params: {
                    id,
                },
            }
        );

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};
