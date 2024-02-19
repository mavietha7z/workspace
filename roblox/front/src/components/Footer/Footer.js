import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('container')}>
                <p>Công ty cổ phần giải trí và thể thao điện tử</p>
                <p>
                    Tầng 29, tòa nhà Trung tâm Lotte Hà Nội, số 54, đường Liễu Giai, Phường Cống Vị, Quận Ba Đình, Thành
                    phố Hà Nội, Việt Nam.
                </p>
                <p style={{ marginBottom: 0, paddingBottom: 20 }}>Copyright © 2023 NẠP THẺ ROBLOX</p>
            </div>
        </footer>
    );
}

export default Footer;
