import { baseUrl, postRequest } from '../utils/services';
import { createContext, useCallback, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Đăng ký
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: '',
    });

    // Đăng nhập
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('User'));
        if (user) {
            setUser(user);
        }
    }, []);

    // Hàm nhập tt đăng ký
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    // Hàm nhập tt đăng nhập
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    // Hàm đăng ký
    const registerUser = useCallback(
        async (e) => {
            e.preventDefault();

            setIsRegisterLoading(true);
            setRegisterError(null);

            const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));

            setIsRegisterLoading(false);
            if (response.error) {
                return setRegisterError(response);
            }

            localStorage.setItem('User', JSON.stringify(response));
            setUser(response);
        },
        [registerInfo]
    );

    // Hàm đăng xuất
    const logoutUser = useCallback(() => {
        localStorage.removeItem('User');
        setUser(null);
    }, []);

    // Hàm đăng nhập
    const loginUser = useCallback(
        async (e) => {
            e.preventDefault();

            setIsLoginLoading(true);
            setLoginError(null);
            const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));
            setIsLoginLoading(false);
            if (response.error) {
                return setLoginError(response);
            }

            localStorage.setItem('User', JSON.stringify(response));
            setUser(response);
        },
        [loginInfo]
    );

    return (
        <AuthContext.Provider
            value={{
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterLoading,
                logoutUser,
                loginUser,
                loginInfo,
                updateLoginInfo,
                loginError,
                isLoginLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
