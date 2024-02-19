import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const ggIcon = faGoogle as IconProp;
const twiIcon = faTwitter as IconProp;
const youIcon = faYoutube as IconProp;
const faceIcon = faFacebookF as IconProp;

const year = new Date().getFullYear();

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className="container">
                    <Row>
                        <Col lg={3}>
                            <div className={cx('logo')}>
                                <Link to="/">
                                    <img src="https://nencer.com/storage/userfiles/images/nencer-logo.png" alt="Logo" />
                                </Link>
                            </div>

                            <h3 className="text-uppercase w-75">Phần mềm, ứng dụng di động, quản trị mạng</h3>
                        </Col>
                        <Col lg={3}>
                            <h3 className="text-uppercase mb-3">Chính sách</h3>

                            <ul>
                                <li>
                                    <Link to="/">Về chúng tôi</Link>
                                </li>
                                <li>
                                    <Link to="/">Quy định sử dụng</Link>
                                </li>
                                <li>
                                    <Link to="/">Quyền riêng tư</Link>
                                </li>
                                <li>
                                    <Link to="/">Thanh toán</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col lg={3}>
                            <h3 className="text-uppercase mb-3">Thông tin</h3>

                            <ul>
                                <li>
                                    <Link to="/">Quà tặng</Link>
                                </li>
                                <li>
                                    <Link to="/">Hướng dẫn</Link>
                                </li>
                                <li>
                                    <Link to="/">Vé hỗ trợ</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col lg={3}>
                            <h3 className="text-uppercase mb-3">Kết nối MXH</h3>

                            <ul className={cx('social')}>
                                <li className="mb-0">
                                    <Link to="/" className={cx('facebook')}>
                                        <FontAwesomeIcon icon={faceIcon} />
                                    </Link>
                                </li>
                                <li className="mb-0">
                                    <Link to="/" className={cx('twitter')}>
                                        <FontAwesomeIcon icon={twiIcon} />
                                    </Link>
                                </li>
                                <li className="mb-0">
                                    <Link to="/" className={cx('google')}>
                                        <FontAwesomeIcon icon={ggIcon} />
                                    </Link>
                                </li>
                                <li className="mb-0">
                                    <Link to="/" className={cx('youtube')}>
                                        <FontAwesomeIcon icon={youIcon} />
                                    </Link>
                                </li>
                            </ul>
                        </Col>

                        <div className="mt-5">Copyright © {year}. All rights reserved</div>
                    </Row>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
