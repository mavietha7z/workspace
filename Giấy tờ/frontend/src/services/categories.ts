import request from '~/utils';

export const getCategories = async () => {
    try {
        const res = await request.get('/categories/get-categories');

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};
