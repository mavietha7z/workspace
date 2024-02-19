import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Fragment, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Menu.module.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const cx = classNames.bind(styles);
const rightIcon = faAngleRight as IconProp;

interface IProps {
    children: ReactNode;
    left?: boolean;
    right?: boolean;
    icon?: boolean;
    listItem: Array<{ title: string; slug: string }>;
    type?: boolean;
}

function Menu({ children, left, right, icon, listItem, type = false }: IProps) {
    const classes = cx('wrapper', {
        left,
        right,
        icon,
    });

    return (
        <Fragment>
            <Fragment>{children}</Fragment>

            <ul className={classes}>
                {listItem.map((item, index) => (
                    <li key={index}>
                        <Link to={type ? `/${item.slug}` : item.slug}>
                            {icon && <FontAwesomeIcon icon={rightIcon} />}
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
}

export default Menu;
