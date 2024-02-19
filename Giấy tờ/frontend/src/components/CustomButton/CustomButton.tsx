import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './CustomButton.module.scss';
import { ReactNode } from 'react';

const cx = classNames.bind(styles);

interface IProps {
    children?: ReactNode;
    disabled?: boolean;
    outline?: boolean;
    border?: boolean;
    small?: boolean;
    width?: boolean;
    text: string;
    bg?: string;
    to: string;
    onClick?: () => void;
}

function CustomButton({
    outline,
    border,
    disabled,
    width,
    text,
    to,
    children,
    bg = 'primary',
    small,
    onClick,
}: IProps) {
    const classes = cx('wrapper', {
        outline,
        disabled,
        width,
        border,
        small,
        [bg]: bg,
    });

    return (
        <Link className={classes} to={to} onClick={onClick}>
            <span className={cx('title')}>
                {children && children}
                {text}
            </span>
        </Link>
    );
}

export default CustomButton;
