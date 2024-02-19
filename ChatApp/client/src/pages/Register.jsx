import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Alert, Button, Col, Form, Row, Stack } from 'react-bootstrap';

const Register = () => {
    const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } =
        useContext(AuthContext);

    return (
        <Form onSubmit={registerUser}>
            <Row style={{ height: '100vh', justifyContent: 'center', paddingTop: '10%' }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2>Đăng ký</h2>

                        <Form.Control
                            type="text"
                            placeholder="Tên của bạn..."
                            onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })}
                        />
                        <Form.Control
                            type="email"
                            placeholder="Email của bạn..."
                            onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })}
                        />
                        <Form.Control
                            type="password"
                            placeholder="Mật khẩu của bạn..."
                            onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })}
                        />

                        <Button type="submit">{isRegisterLoading ? 'Đang đăng ký...' : 'Đăng ký'}</Button>
                        {registerError?.error && (
                            <Alert variant="danger">
                                <p className="mb-0">{registerError.message}</p>
                            </Alert>
                        )}
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
};

export default Register;
