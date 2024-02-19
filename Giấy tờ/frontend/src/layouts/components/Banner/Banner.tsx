import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectFade } from 'swiper';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Banner.module.scss';

const cx = classNames.bind(styles);
const rightIcon = faAngleRight as IconProp;

function Banner() {
    const pagination = {
        clickable: true,
        renderBullet: (index: number, className: string) => {
            return `<span class="${className}">0${index + 1}</span>`;
        },
    };

    return (
        <section className="block-banner">
            <Swiper
                loop
                spaceBetween={30}
                effect={'fade'}
                modules={[EffectFade, Navigation, Pagination]}
                navigation
                pagination={pagination}
            >
                <SwiperSlide>
                    <div className="container">
                        <div className="row align-items-center">
                            <Col lg={6}>
                                <div className={cx('text')}>
                                    <h3 className={cx('title')}>Phần mềm và tiện ích trực tuyến</h3>
                                    <p className={cx('desc')}>
                                        Các phần mềm và tiện ích website có sẵn giúp bạn nhanh chóng xây dựng mô hình
                                        kinh doanh online, tiết kiệm thời gian và tiền bạc.
                                    </p>
                                    <div className={cx('detail')}>
                                        <Link to="/">
                                            <div className={cx('icon')}>
                                                <FontAwesomeIcon icon={rightIcon} />
                                            </div>
                                            Xem ngay
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className={cx('image')}>
                                    <Link to="/" className="d-inline-block">
                                        <img
                                            src="https://nencer.com/storage/userfiles/images/sliders/phanmemweb.png"
                                            alt="Banner"
                                        />
                                    </Link>
                                </div>
                            </Col>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="container">
                        <div className="row align-items-center">
                            <Col lg={6}>
                                <div className={cx('text')}>
                                    <h3 className={cx('title')}>Giải pháp công nghệ thông tin</h3>
                                    <p className={cx('desc')}>
                                        Cung cấp các giải pháp công nghệ thông tin cho doanh nghiệp, tối ưu chi phí,
                                        tăng hiệu quả công việc, dễ dàng quản lý.
                                    </p>
                                    <div className={cx('detail')}>
                                        <Link to="/">
                                            <div className={cx('icon')}>
                                                <FontAwesomeIcon icon={rightIcon} />
                                            </div>
                                            Xem chi tiết
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className={cx('image')}>
                                    <Link to="/" className="d-inline-block">
                                        <img
                                            src="https://nencer.com/storage/userfiles/images/sliders/it_solutions.png"
                                            alt="Banner"
                                        />
                                    </Link>
                                </div>
                            </Col>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="container">
                        <div className="row align-items-center">
                            <Col lg={6}>
                                <div className={cx('text')}>
                                    <h3 className={cx('title')}>Dịch vụ outsourcing chất lượng cao</h3>
                                    <p className={cx('desc')}>
                                        Kinh nghiệm trên 10 năm trong nghề, nghiên cứu nhiều giải pháp công nghệ, đáp
                                        ứng các ngôn ngữ lập trình tốt nhất hiện nay.
                                    </p>
                                    <div className={cx('detail')}>
                                        <Link to="/">
                                            <div className={cx('icon')}>
                                                <FontAwesomeIcon icon={rightIcon} />
                                            </div>
                                            Xem chi tiết
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className={cx('image')}>
                                    <Link to="/" className="d-inline-block">
                                        <img
                                            src="https://nencer.com/storage/userfiles/images/sliders/it_outsourcing.png"
                                            alt="Banner"
                                        />
                                    </Link>
                                </div>
                            </Col>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
}

export default Banner;
