import request from '~/utils';

export const getDetailsService = async (slug?: string) => {
    try {
        const res = await request.get(`/services/details/${slug}`);

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};
