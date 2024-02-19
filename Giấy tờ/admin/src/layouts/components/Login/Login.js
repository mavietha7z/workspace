import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import './style.css';
import config from '~/configs';
import { getCurrentUser, loginUser } from '~/services/auth';
import { alertError, alertSuccess } from '~/configs/alert';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Đăng nhập quản trị';

        const fetchApi = async () => {
            const result = await getCurrentUser();

            if (result.code === 200) {
                navigate(config.routes.home);
                alertSuccess('Bạn đã đăng nhập');
            }
        };
        fetchApi();
    }, [navigate]);

    const handleLogin = async () => {
        const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!email && !password) {
            return alertError('Vui lòng nhập đủ thông tin');
        }
        if (!regexEmail.test(email)) {
            return alertError('Email không đúng định dạng');
        }
        if (password.length < 8) {
            return alertError('Mật khẩu tối thiểu 8 ký tự');
        }
        const user = {
            email_phone: email,
            password,
        };

        const result = await loginUser(user, dispatch);

        if (result.code === 200) {
            navigate(config.routes.home);
            alertSuccess('Đăng nhập thành công');
        } else {
            alertError(result.error);
        }
    };

    return (
        <div className="login">
            <div className="login-content">
                <h2 className="login-title mb-4">Đăng Nhập Quản Trị</h2>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        className="form-control"
                        type="email"
                        placeholder="Enter your email or phone"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <Button size="sm" className="btn-block" onClick={handleLogin}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;
