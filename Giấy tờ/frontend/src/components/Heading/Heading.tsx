import classNames from 'classnames/bind';

import styles from './Heading.module.scss';

const cx = classNames.bind(styles);

interface IProps {
    title: string;
    description?: string;
}

function Heading({ title, description }: IProps) {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{title}</h2>
            <p className={cx('desc')}>{description}</p>
        </div>
    );
}

export default Heading;
