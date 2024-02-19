import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';
import config from '~/configs';
import { logoutSuccess } from '~/redux/reducer/auth';
import { alertError, alertSuccess } from '~/configs/alert';
import { getCurrentUser, loginUser } from '~/services/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        document.title = 'Đăng nhập quản trị';

        if (currentUser) {
            const fetch = async () => {
                const result = await getCurrentUser();

                if (result?.status === 401 || result?.status === 403) {
                    dispatch(logoutSuccess());
                } else if (result?.status === 200) {
                    navigate(config.routes.home);
                    alertSuccess('Đăng nhập thành công');
                } else {
                    alertError(result?.error);
                }
            };
            fetch();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    const handleLogin = async () => {
        const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!email || !password) {
            return alertError('Vui lòng nhập đủ thông tin');
        }
        if (!regexEmail.test(email)) {
            return alertError('Email không hợp lệ');
        }
        if (password.length < 8) {
            return alertError('Mật khẩu tối thiểu 8 ký tự');
        }

        const user = {
            email,
            password,
        };
        const result = await loginUser(user, dispatch);

        if (result?.status === 200) {
            navigate(config.routes.home);
            alertSuccess(result.message);
        } else {
            alertError(result?.error, 'fail');
        }
    };

    return (
        <div className="login">
            <div className="login-content">
                <h2 className="login-title mb-4">Đăng nhập quản trị</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button size="sm" className="btn-block" onClick={handleLogin}>
                        Login
                    </Button>
                </Form.Group>
            </div>
        </div>
    );
}

export default Login;
