import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faEye } from '@fortawesome/free-solid-svg-icons';

import CustomButton from '../CustomButton';
import styles from './SourceItem.module.scss';

const cx = classNames.bind(styles);

const eyeIcon = faEye as IconProp;
const dateIcon = faCalendarDay as IconProp;

interface IProps {
    to: string;
    image: string;
    title: string;
    date: string;
    view: number;
    description: string;
    price_current: string;
    price_old: string;
    text_btn?: string;
}

function SourceItem({
    to,
    date,
    description,
    image,
    price_current,
    price_old,
    title,
    view,
    text_btn = 'Xem thêm',
}: IProps) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <Link to={to} className={cx('product-title')}>
                    <div className={cx('img')}>
                        <img src={image} alt={title} />
                    </div>
                    <h3 className={cx('title')}>{title}</h3>
                </Link>

                <div className={cx('meta')}>
                    <span title="Cập nhật lần cuối">
                        <FontAwesomeIcon icon={dateIcon} /> {date}
                    </span>
                    <span title="Tổng lượt xem">
                        <FontAwesomeIcon icon={eyeIcon} /> {view}
                    </span>
                </div>

                <div className={cx('text')}>{description}</div>
            </div>
            <div className={cx('action')}>
                <div className={cx('price')}>
                    <span className={cx('price-current')}>{price_current}</span>
                    <span className={cx('price-old')}>{price_old}</span>
                </div>

                <CustomButton to={to} text={text_btn} />
            </div>
        </div>
    );
}

export default SourceItem;
