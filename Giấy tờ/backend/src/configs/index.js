import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            admin: user.is_admin,
            status: user.is_status,
        },
        'jwt-access-key',
        {
            expiresIn: '20d',
        }
    );
};
