import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';

const cx = classNames.bind(styles);

function NotFound() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('error')}>
                    <div className={cx('code')}>404</div>
                    <div className={cx('message')}>Not Found</div>
                    <p>The resource requested could not be found on this server</p>
                </div>
                <Link to="/app"></Link>
            </div>
        </div>
    );
}

export default NotFound;
