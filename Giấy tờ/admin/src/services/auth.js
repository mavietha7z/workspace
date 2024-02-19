import { loginSuccess } from '~/redux/reducer/auth';
import request from '~/utils';

export const getCurrentUser = async () => {
    try {
        const res = await request.get('/auth/current-user', {
            params: {
                _v: Math.random(),
            },
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const loginUser = async (user, dispatch) => {
    try {
        const res = await request.post('/auth/login', user);

        const { data, ...other } = res.data;
        dispatch(loginSuccess(data));

        return { ...other };
    } catch (error) {
        return error.response.data;
    }
};

export const logoutUser = async () => {
    try {
        const res = await request.post(
            '/auth/logout',
            {},
            {
                params: {
                    _v: Math.random(),
                },
            }
        );

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};
