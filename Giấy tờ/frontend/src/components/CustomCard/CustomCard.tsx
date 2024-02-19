import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './CustomCard.module.scss';

const cx = classNames.bind(styles);

interface IProps {
    title: string;
    image: string;
    to: string;
    price?: string;
    border?: boolean;
    description?: string;
}

function CustomCard({ image, to, price, border, title, description }: IProps) {
    return (
        <div className={cx('wrapper', { border })}>
            <div className={cx('header')}>
                <img src={image} alt={title} />
                <div className={cx('mask')}></div>
                <Link to={to} className={cx('link')}>
                    <span></span>
                    <span></span>
                    <span></span>
                </Link>
            </div>
            <div className={cx('body')}>
                <Link to={to}>
                    <h5 className={cx('title')}>{title}</h5>
                </Link>

                {price && <div className={cx('price')}>{price}</div>}
                {description && <div className={cx('text')}>{description}</div>}
            </div>
        </div>
    );
}

export default CustomCard;
