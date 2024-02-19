import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';

import { alertError } from '~/configs/alert';
import PageTitle from '~/components/PageTitle';
import config, { convertCurrency } from '~/configs';
import { getDailyStats } from '~/services/charging';
import { logoutSuccess } from '~/redux/reducer/auth';

const date = new Date();

function Daily() {
    const [totals, setTotals] = useState([]);
    const [dailies, setDailies] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Thống kê thẻ đã nạp - Quản trị website';

        const fetch = async () => {
            const result = await getDailyStats();

            if (result.status === 401 || result.status === 403) {
                dispatch(logoutSuccess());
                navigate(config.routes.login);
            } else if (result.status === 200) {
                setDailies(result.data);
                setTotals(result.total);
            } else {
                alertError(result.error);
            }
        };
        fetch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="wrapper">
            <div className="header">
                <Row>
                    <PageTitle name="Thống kê tổng nạp" />
                </Row>
            </div>
            <div className="content">
                <Row>
                    <Col xl={8} className="mb-3 mb-xl-0">
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Tổng doanh số ngày {moment(date).format('YYYY-MM-DD')}</th>
                                    <th>Tổng thẻ đổi</th>
                                    <th>Tổng thẻ đúng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {totals.length > 0 ? (
                                    totals.map((total, index) => (
                                        <tr key={index}>
                                            <td>
                                                {total.telco ? `Doanh số thẻ ${total.telco}` : 'Tổng doanh số nạp thẻ'}
                                            </td>
                                            <td className="text-danger">{convertCurrency(total.total)}</td>
                                            <td className="text-success">{convertCurrency(total.success)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3}>Không có dữ liệu</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                    <Col xl={4}>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Thời gian</th>
                                    <th>Tổng thẻ đổi</th>
                                    <th>Tổng thẻ đúng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dailies.length > 0 ? (
                                    dailies.map((daily, index) => (
                                        <tr key={index}>
                                            <td>{`${daily._id.year}-${daily._id.month}-${daily._id.day} 00:00:01`}</td>
                                            <td className="text-danger">{convertCurrency(daily.declared_value)}</td>
                                            <td className="text-success">{convertCurrency(daily.amount)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3}>Không có dữ liệu</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Daily;
