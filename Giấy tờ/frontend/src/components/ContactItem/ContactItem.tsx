import classNames from 'classnames/bind';

import styles from './ContactItem.module.scss';

const cx = classNames.bind(styles);

interface IProps {
    to: string;
    title: string;
    image: string;
    description: string;
}

function ContactItem({ to, title, description, image }: IProps) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div
                    className={cx('image')}
                    style={{
                        backgroundImage: `url("${image}")`,
                    }}
                ></div>
            </div>
            <div className={cx('body')}>
                <div className={cx('title')}>
                    <a href={to} target="_blank" rel="noreferrer">
                        {title}
                    </a>
                </div>
                <div className={cx('text')}>{description}</div>
            </div>
        </div>
    );
}

export default ContactItem;
