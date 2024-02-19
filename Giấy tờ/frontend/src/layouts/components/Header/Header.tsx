import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faUser } from '@fortawesome/free-solid-svg-icons';

import Menu from '~/components/Menu';
import styles from './Header.module.scss';
import CustomButton from '~/components/CustomButton';
import { RootState } from '~/redux/store';

const cx = classnames.bind(styles);
const userIcon = faUser as IconProp;
const downIcon = faAngleDown as IconProp;

const profile = [
    { title: 'Thông tin tài khoản', slug: '/' },
    { title: 'Dịch vụ của tôi', slug: '/' },
    { title: 'Quỹ số dư', slug: '/' },
    { title: 'Bảo mật', slug: '/' },
    { title: 'Đổi mật khẩu', slug: '/' },
    { title: 'Đăng xuất', slug: '/' },
];

function Header() {
    const isUser: boolean = true;

    const { navbar } = useSelector((state: RootState) => state.module);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('top')}>
                <div className="container">
                    <div className="row justify-content-between">
                        <Col sm={6}>
                            <div className="d-flex align-items-center">
                                <div className={cx('language')}>
                                    <span>
                                        <img src="https://nencer.com/images/lang/vi.png" alt="Tiếng Việt" />
                                    </span>
                                    <span>
                                        <img src="https://nencer.com/images/lang/en.png" alt="English" />
                                    </span>
                                </div>
                                <div className={cx('currency')}>
                                    <Menu
                                        left
                                        listItem={[
                                            { title: 'VND', slug: '/' },
                                            { title: 'USD', slug: '/' },
                                        ]}
                                    >
                                        <span>
                                            VND
                                            <FontAwesomeIcon icon={downIcon} />
                                        </span>
                                    </Menu>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={cx('action')}>
                                {isUser ? (
                                    <div className={cx('position')}>
                                        <Menu right icon listItem={profile}>
                                            <div className={cx('user-login')}>
                                                <span>
                                                    MÃ Việt Hà <FontAwesomeIcon icon={userIcon} />
                                                </span>
                                            </div>
                                        </Menu>
                                    </div>
                                ) : (
                                    <Fragment>
                                        <CustomButton text="ĐĂNG NHẬP" to="/account/login" outline />
                                        <CustomButton text="ĐĂNG KÝ" to="/account/register" />
                                    </Fragment>
                                )}
                            </div>
                        </Col>
                    </div>
                </div>
            </div>
            <div className={cx('bottom')}>
                <div className="container">
                    <Row>
                        <Col lg={3}>
                            <div className={cx('logo')}>
                                <Link to="/">
                                    <img src="https://nencer.com/storage/userfiles/images/nencer-logo.png" alt="Logo" />
                                </Link>
                            </div>
                        </Col>
                        <Col lg={9}>
                            <ul className="d-lg-flex align-items-center justify-content-end">
                                {navbar.map((nav, index: number) => (
                                    <li className={cx('item')} key={index}>
                                        {nav.services.length > 0 ? (
                                            <Menu right listItem={nav.services} type>
                                                <Link to="#">
                                                    {nav.title} <FontAwesomeIcon icon={downIcon} />
                                                </Link>
                                            </Menu>
                                        ) : (
                                            <Link to={nav.slug}>{nav.title}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
        </header>
    );
}

export default Header;
