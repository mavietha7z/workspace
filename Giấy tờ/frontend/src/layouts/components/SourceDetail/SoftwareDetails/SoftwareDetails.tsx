import classNames from 'classnames/bind';
import { Collapse } from 'react-bootstrap';
import { Fragment, useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SoftwareDetails.module.scss';
import CustomButton from '~/components/CustomButton';

const cx = classNames.bind(styles);

const checkIcon = faCheck as IconProp;

function SoftwareDetails() {
    const [show, setShow] = useState<boolean>(false);

    const handleClick = () => {
        setShow(!show);
    };

    return (
        <Fragment>
            <tr>
                <td className="text-center">1</td>
                <td>
                    <strong>Quản trị hệ thống</strong>
                </td>
                <td>Các mô-đun thiết lập các cấu hình cho toàn bộ website.</td>
                <td className="text-center">
                    <FontAwesomeIcon icon={checkIcon} className={cx('icon-check')} />
                </td>
                <td className="text-center">
                    <CustomButton small text="Xem chi tiết" to="" onClick={handleClick} />
                </td>
            </tr>
            <tr>
                <td colSpan={5} className="p-0 border-0">
                    <Collapse in={show} className="border">
                        <div>
                            <ul className={cx('list')}>
                                <li>Đăng nhập hệ thống</li>
                                <li>Bảo mật 2 bước (Email, SMS, hoặc Google Authenticator)</li>
                                <li>Trang dashboard sử dụng theme AdminLTE 3</li>
                                <li>Các thống kê vắn tắt dữ liệu của các mô-đun</li>
                                <li>Đăng nhập hệ thống</li>
                                <li>Đăng nhập hệ thống</li>
                            </ul>
                        </div>
                    </Collapse>
                </td>
            </tr>
        </Fragment>
    );
}

export default SoftwareDetails;
