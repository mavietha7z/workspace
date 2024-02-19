import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function PostItem() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('info')}>
                    <Link to="/">
                        <h2 className={cx('title')}>Tìm hiểu về Serif và Sans-serif?</h2>
                    </Link>

                    <p className={cx('desc')}>
                        Hí anh em! Vào vấn đề luôn, trong thời gian mình có quá nhiều thời gian rỗi nên mình đã bỏ 1 ít
                        thời gian và tiền đi kiểm chứng và...
                    </p>

                    <div className={cx('info')}>
                        <Link to="/" className={cx('tags')}>
                            Front-end
                        </Link>
                        <span>một ngày trước</span>
                        <span className={cx('dot')}>·</span>
                        <span>2 phút đọc</span>
                    </div>
                </div>
                <div className={cx('thumb')}>
                    <Link to="/">
                        <img
                            src="https://files.fullstack.edu.vn/f8-prod/blog_posts/7242/64424fe6e225f.jpg"
                            alt="Card"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
