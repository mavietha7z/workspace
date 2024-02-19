import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';

import Heading from '../Heading';
import styles from './Wrapper.module.scss';

const cx = classNames.bind(styles);

interface IProps {
    title: string;
    gray?: boolean;
    children: ReactNode;
    description?: string;
}

function Wrapper({ children, title, description, gray }: IProps) {
    return (
        <section className={cx('content', { gray })}>
            <div className="container">
                <Row>
                    <Col lg={12}>
                        <Heading title={title} description={description} />
                    </Col>

                    <Col lg={12}>{children}</Col>
                </Row>
            </div>
        </section>
    );
}

export default Wrapper;
