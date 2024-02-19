import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Alert, Button, Col, Form, Row, Stack } from 'react-bootstrap';

const Login = () => {
    const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } = useContext(AuthContext);

    return (
        <Form onSubmit={loginUser}>
            <Row style={{ height: '100vh', justifyContent: 'center', paddingTop: '10%' }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2>Đăng nhập</h2>

                        <Form.Control
                            type="email"
                            placeholder="Email của bạn..."
                            onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })}
                        />
                        <Form.Control
                            type="password"
                            placeholder="Mật khẩu của bạn..."
                            onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}
                        />

                        <Button type="submit">{isLoginLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}</Button>
                        {loginError?.error && (
                            <Alert variant="danger">
                                <p className="mb-0">{loginError.message}</p>
                            </Alert>
                        )}
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
};

export default Login;
