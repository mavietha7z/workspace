import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Card, Col, Collapse, Row } from 'react-bootstrap';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight, faHandHoldingDollar, faMinus, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';

import './Home.css';
import { alertError } from '~/configs/alert';
import PageTitle from '~/components/PageTitle';
import config, { convertCurrency } from '~/configs';
import { logoutSuccess } from '~/redux/reducer/auth';
import { getStatChargings, getTotalCharging } from '~/services/charging';

const { statistic, chargings: path, login } = config.routes;

function Home() {
    const [collapseOne, setCollapseOne] = useState(true);
    const [collapseTow, setCollapseTow] = useState(true);

    const [total, setTotal] = useState(null);
    const [chargings, setChargings] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Bảng quản trị - Quản trị website';

        const fetch = async () => {
            const resultTotal = await getTotalCharging('tab');
            const resultChargings = await getStatChargings({ type: 'tab' });

            if (!resultChargings || !resultTotal) {
                dispatch(logoutSuccess());
                navigate(login);
                window.location.reload();
                return;
            }

            if (
                resultChargings.status === 401 ||
                resultChargings.status === 403 ||
                resultTotal.status === 401 ||
                resultTotal.status === 403
            ) {
                dispatch(logoutSuccess());
                return navigate(login);
            }

            resultTotal.status === 200 ? setTotal(resultTotal.data) : alertError(resultTotal.error);
            resultChargings.status === 200 ? setChargings(resultChargings.data) : alertError(resultChargings.error);
        };
        fetch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <Col xl={2}>
                        <div className="home-box">
                            <span className="home-icon bg-primary">
                                <FontAwesomeIcon icon={faCreditCard} />
                            </span>
                            <div className="home-content">
                                <span className="home-text">Tổng thẻ gửi</span>
                                <span className="home-number">{convertCurrency(total?.declaredValue)}</span>
                            </div>
                        </div>
                    </Col>
                    <Col xl={2}>
                        <div className="home-box">
                            <span className="home-icon bg-success">
                                <FontAwesomeIcon icon={faMoneyBill1Wave} />
                            </span>
                            <div className="home-content">
                                <span className="home-text">Tổng thẻ đúng</span>
                                <span className="home-number">{convertCurrency(total?.realValue)}</span>
                            </div>
                        </div>
                    </Col>
                    <Col xl={2}>
                        <div className="home-box">
                            <span className="home-icon bg-info">
                                <FontAwesomeIcon icon={faHandHoldingDollar} />
                            </span>
                            <div className="home-content">
                                <span className="home-text">Tiền thẻ nhận</span>
                                <span className="home-number">{convertCurrency(total?.receiveValue)}</span>
                            </div>
                        </div>
                    </Col>
                    <Col xl={2}>
                        <div className="home-box">
                            <span className="home-icon bg-primary">
                                <FontAwesomeIcon icon={faCreditCard} />
                            </span>
                            <div className="home-content">
                                <span className="home-text">Thẻ gửi hôm nay</span>
                                <span className="home-number">{convertCurrency(total?.todayDeclaredValue)}</span>
                            </div>
                        </div>
                    </Col>
                    <Col xl={2}>
                        <div className="home-box">
                            <span className="home-icon bg-success">
                                <FontAwesomeIcon icon={faMoneyBill1Wave} />
                            </span>
                            <div className="home-content">
                                <span className="home-text">Thẻ đúng hôm nay</span>
                                <span className="home-number">{convertCurrency(total?.todayRealValue)}</span>
                            </div>
                        </div>
                    </Col>
                    <Col xl={2}>
                        <div className="home-box">
                            <span className="home-icon bg-info">
                                <FontAwesomeIcon icon={faHandHoldingDollar} />
                            </span>
                            <div className="home-content">
                                <span className="home-text">Tiền nhận hôm nay</span>
                                <span className="home-number">{convertCurrency(total?.todayReceiveValue)}</span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xl={6}>
                        <Card className="mb-4">
                            <Card.Header>
                                <Card.Title>Tổng thẻ gửi</Card.Title>
                                <div>
                                    <Badge bg="success" className="mr-1">
                                        Mới {chargings?.total.new || 0}
                                    </Badge>
                                    <Badge bg="primary" className="mr-2">
                                        Tổng {chargings?.total.total || 0}
                                    </Badge>
                                    <button className="home-btn" onClick={() => setCollapseOne(!collapseOne)}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                </div>
                            </Card.Header>
                            <Collapse in={collapseOne}>
                                <Card.Body>
                                    <ul className="transfer-list">
                                        {chargings?.total.data.map((charging) => (
                                            <li className="transfer-item" key={charging._id}>
                                                <FontAwesomeIcon icon={faChevronRight} className="transfer-icon" />
                                                <span className="text-dark">
                                                    <strong>
                                                        {' '}
                                                        {charging.telco?.telco}: {charging.code}
                                                    </strong>
                                                    <strong> / {charging.serial}</strong>
                                                </span>
                                                <Badge
                                                    bg={
                                                        charging.status === 1
                                                            ? 'success'
                                                            : charging.status === 2
                                                            ? 'info'
                                                            : charging.status === 99
                                                            ? 'warning'
                                                            : 'danger'
                                                    }
                                                    className="float-right"
                                                >
                                                    {convertCurrency(charging.declared_value)}
                                                </Badge>
                                                <br />
                                                <small className="text-muted">
                                                    {moment(charging.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                                </small>
                                                <small className="text-dark float-right">({charging.message})</small>
                                            </li>
                                        ))}
                                    </ul>
                                </Card.Body>
                            </Collapse>
                            <Card.Footer className="text-center py-3">
                                <Link to={statistic + path} target="_blank">
                                    Xem tất cả
                                </Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col xl={6}>
                        <Card className="mb-4">
                            <Card.Header>
                                <Card.Title>Tổng thẻ đúng</Card.Title>
                                <div>
                                    <Badge bg="success" className="mr-1">
                                        Mới {chargings?.success.new || 0}
                                    </Badge>
                                    <Badge bg="primary" className="mr-2">
                                        Tổng {chargings?.success.total || 0}
                                    </Badge>
                                    <button className="home-btn" onClick={() => setCollapseTow(!collapseTow)}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                </div>
                            </Card.Header>
                            <Collapse in={collapseTow}>
                                <Card.Body>
                                    <ul className="transfer-list">
                                        {chargings?.success.data.map((charging) => (
                                            <li className="transfer-item" key={charging._id}>
                                                <FontAwesomeIcon icon={faChevronRight} className="transfer-icon" />
                                                <span className="text-dark">
                                                    <strong>
                                                        {' '}
                                                        {charging.telco?.telco}: {charging.code}
                                                    </strong>
                                                    <strong> / {charging.serial}</strong>
                                                </span>
                                                <Badge bg="success" className="float-right">
                                                    {convertCurrency(charging.declared_value)}
                                                </Badge>
                                                <br />
                                                <small className="text-muted">
                                                    {moment(charging.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                                </small>
                                                <small className="text-dark float-right">({charging.message})</small>
                                            </li>
                                        ))}
                                    </ul>
                                </Card.Body>
                            </Collapse>
                            <Card.Footer className="text-center py-3">
                                <Link to={`${statistic + path}?status=1`} target="_blank">
                                    Xem tất cả
                                </Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Home;
