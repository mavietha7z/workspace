import { Pagination } from 'swiper';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Fancybox from '~/components/Fancybox';
import styles from './SoftwareImage.module.scss';
import CustomButton from '~/components/CustomButton';

const cx = classNames.bind(styles);

const eyeIcon = faEye as IconProp;

function SoftwareImage() {
    return (
        <Fancybox
            options={{
                Carousel: {
                    infinite: false,
                },
            }}
        >
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                }}
                modules={[Pagination]}
                className="theme-swiper"
            >
                <SwiperSlide style={{ width: 254, marginRight: 20 }}>
                    <div
                        className={cx('img-slide')}
                        data-fancybox="gallery"
                        data-src="https://nencer.com/storage/userfiles/images/demo/doithecao.png"
                    >
                        <img src="https://nencer.com/storage/userfiles/images/demo/doithecao.png" alt="Card" />

                        <CustomButton text="" to="/">
                            <FontAwesomeIcon icon={eyeIcon} />
                        </CustomButton>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 254, marginRight: 20 }}>
                    <div
                        className={cx('img-slide')}
                        data-fancybox="gallery"
                        data-src="https://nencer.com/storage/userfiles/images/demo/thegame_1.png"
                    >
                        <img src="https://nencer.com/storage/userfiles/images/demo/thegame_1.png" alt="Card" />

                        <CustomButton text="" to="/">
                            <FontAwesomeIcon icon={eyeIcon} />
                        </CustomButton>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 254, marginRight: 20 }}>
                    <div
                        className={cx('img-slide')}
                        data-fancybox="gallery"
                        data-src="https://nencer.com/storage/userfiles/images/demo/doithecao.png"
                    >
                        <img src="https://nencer.com/storage/userfiles/images/demo/doithecao.png" alt="Card" />

                        <CustomButton text="" to="/">
                            <FontAwesomeIcon icon={eyeIcon} />
                        </CustomButton>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 254, marginRight: 20 }}>
                    <div
                        className={cx('img-slide')}
                        data-fancybox="gallery"
                        data-src="https://nencer.com/storage/userfiles/images/demo/thegame_1.png"
                    >
                        <img src="https://nencer.com/storage/userfiles/images/demo/thegame_1.png" alt="Card" />

                        <CustomButton text="" to="/">
                            <FontAwesomeIcon icon={eyeIcon} />
                        </CustomButton>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 254, marginRight: 20 }}>
                    <div
                        className={cx('img-slide')}
                        data-fancybox="gallery"
                        data-src="https://nencer.com/storage/userfiles/images/demo/doithecao.png"
                    >
                        <img src="https://nencer.com/storage/userfiles/images/demo/doithecao.png" alt="Card" />

                        <CustomButton text="" to="/">
                            <FontAwesomeIcon icon={eyeIcon} />
                        </CustomButton>
                    </div>
                </SwiperSlide>
            </Swiper>
        </Fancybox>
    );
}

export default SoftwareImage;
