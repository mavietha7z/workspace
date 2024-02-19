import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button, Container, Nav, Navbar, Stack } from 'react-bootstrap';
import Notification from './chat/Notification';

const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <Navbar bg="dark" className="mb-4" style={{ height: '3.75rem' }}>
            <Container>
                <h2>
                    <Link to="/" className="link-light text-decoration-none">
                        ChatApp
                    </Link>
                </h2>
                <span className="text-warning">
                    {user ? `Đã đăng nhập với tên ${user.name}` : 'Bạn chưa đăng nhập'}
                </span>

                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        {user ? (
                            <Fragment>
                                <Notification />
                                <Button onClick={() => logoutUser()}>Đăng xuất</Button>
                            </Fragment>
                        ) : (
                            <>
                                <Link to="/register" className="link-light text-decoration-none">
                                    <Button>Đăng ký</Button>
                                </Link>
                                <Link to="/login" className="link-light text-decoration-none">
                                    <Button>Đăng nhập</Button>
                                </Link>
                            </>
                        )}
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
