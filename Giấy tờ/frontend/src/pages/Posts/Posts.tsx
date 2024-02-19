import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { Col, Row, Pagination } from 'react-bootstrap';

import config from '~/configs';
import PostItem from './PostItem';
import styles from './Posts.module.scss';
import Wrapper from '~/components/Wrapper';
import Breadcrumb from '~/components/Breadcrumb';

const { posts } = config.routes;

const cx = classNames.bind(styles);

function Posts() {
    useEffect(() => {
        document.title = 'Danh sách bài viết - 2CM';
    }, []);

    let active = 1;
    let items = [];
    for (let number = 1; number <= 12; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div className="main">
            <Breadcrumb listItem={[{ title: 'Bài viết', path: posts }]} />

            <Wrapper
                title="Bài viết nổi bật"
                description="Dưới đây là 1 số bài viết nổi bật lên quan đến công nghệ và website"
            >
                <Row>
                    <Col lg={9}>
                        <div className={cx('wrapper')}>
                            <PostItem />
                            <PostItem />
                            <PostItem />
                            <PostItem />
                            <PostItem />

                            <div className={cx('pagination')}>
                                <Pagination size="lg" className="justify-content-center">
                                    <Pagination.Prev />
                                    {items}
                                    <Pagination.Next />
                                </Pagination>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className={cx('top')}>
                            <h3>Các chủ đề được đề xuất</h3>
                        </div>
                    </Col>
                </Row>
            </Wrapper>
        </div>
    );
}

export default Posts;
