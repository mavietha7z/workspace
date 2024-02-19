import { Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faNewspaper, faUsers } from '@fortawesome/free-solid-svg-icons';

import './Home.css';
import { alertError } from '~/configs/alert';
import PageTitle from '~/components/PageTitle';
import { getHomeData } from '~/services/setting';

function Home() {
    const [homes, setHomes] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getHomeData();
            result.code === 200 ? setHomes(result.data) : alertError(result.error);
        };
        fetchData();
    }, []);

    return (
        <div className="wrapper" id="home">
            <div className="header">
                <Row>
                    <PageTitle name="Bảng quản trị" />
                </Row>
            </div>
            <div className="content">
                <Row>
                    <Col xl={4}>
                        <div className="home-box">
                            <span className="home-icon bg-primary">
                                <FontAwesomeIcon icon={faBars} />
                            </span>
                            <div className="home-content">
                                <span className="home-text">Tổng danh mục</span>
                                <span className="home-number">{homes?.countCategory} danh mục</span>
                            </div>
                        </div>
                    </Col>
                    <Col xl={4}>
                        <div className="home-box">
                            <span className="home-icon bg-success">
                                <FontAwesomeIcon icon={faNewspaper} />
                            </span>
                            <div className="home-content">
                                <span className="home-text">Tổng dịch vụ</span>
                                <span className="home-number">{homes?.countService} dịch vụ</span>
                            </div>
                        </div>
                    </Col>
                    <Col xl={4}>
                        <div className="home-box">
                            <span className="home-icon bg-info">
                                <FontAwesomeIcon icon={faUsers} />
                            </span>
                            <div className="home-content">
                                <span className="home-text">Tổng người dùng</span>
                                <span className="home-number">{homes?.countUser} người dùng</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Home;
