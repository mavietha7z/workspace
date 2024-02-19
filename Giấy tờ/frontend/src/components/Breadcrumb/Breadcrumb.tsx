import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';

import config from '~/configs';
import styles from './Breadcrumb.module.scss';

const { home } = config.routes;

const cx = classNames.bind(styles);

interface IProps {
    listItem: Array<{ title: string; path?: string }>;
}

function Breadcrumb({ listItem }: IProps) {
    return (
        <section className={cx('wrapper')}>
            <div className="container">
                <Row>
                    <Col lg={6}>
                        <div className={cx('content')}>
                            <ol>
                                <li>
                                    <Link to={home}>Trang chủ</Link>
                                </li>
                                {listItem.map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.path || '#'}>{item.title}</Link>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
}

export default Breadcrumb;
