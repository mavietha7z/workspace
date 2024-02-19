import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';

import config from '~/configs';
import Modals from '~/components/Modals';
import PageTitle from '~/components/PageTitle';
import { destroyData } from '~/services/tools';
import { logoutSuccess } from '~/redux/reducer/auth';
import { alertError, alertSuccess } from '~/configs/alert';

function Destroy() {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Xóa dữ liệu - Quản trị website';
    }, []);

    const handleDestroy = async () => {
        if (!date) {
            setShow(false);
            alertError('Vui lòng chọn thời gian cần xóa');

            return;
        }

        const result = await destroyData('charging', date);

        if (result.status === 401 || result.status === 403) {
            dispatch(logoutSuccess());
            navigate(config.routes.login);
        } else if (result.status === 200) {
            setShow(false);
            setDate('');
            alertSuccess(result.message);
        } else {
            alertError(result.error);
        }
    };

    return (
        <div className="wrapper">
            <div className="header">
                <Row>
                    <PageTitle name="Các tiện tích cho websites" />
                </Row>
            </div>
            <div className="content">
                <Row>
                    <Col xl={12}>
                        <div className="container">
                            <Row>
                                <Col xl={6}>
                                    <Card>
                                        <Card.Header className="bg-danger">
                                            <Card.Title>Xóa dữ liệu nạp thẻ</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <div className="col-12 mt-3">
                                                <div className="form-group">
                                                    <label>Chọn thời gian muốn xóa</label>
                                                    <select
                                                        className="form-control"
                                                        value={date}
                                                        onChange={(e) => setDate(e.target.value)}
                                                    >
                                                        <option value="">Chọn thời gian cần xóa</option>
                                                        <option value="7d">Xóa những thẻ cũ hơn 7 ngày</option>
                                                        <option value="15d">Xóa những thẻ cũ hơn 15 ngày</option>
                                                        <option value="1m">Xóa những thẻ cũ hơn 1 tháng</option>
                                                        <option value="2m">Xóa những thẻ cũ hơn 2 tháng</option>
                                                        <option value="3m">Xóa những thẻ cũ hơn 3 tháng</option>
                                                        <option value="6m">Xóa những thẻ cũ hơn 6 tháng</option>
                                                    </select>
                                                </div>
                                                <div className="mb-2">
                                                    Nếu dữ liệu quá nhiều gây timeout, bạn có thể xóa làm nhiều lần.
                                                </div>
                                            </div>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Button variant="danger" title="Xóa thẻ cũ" onClick={() => setShow(true)}>
                                                Thực hiện
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>

            {show && <Modals show={show} setShow={setShow} name="Dữ liệu nạp thẻ cũ" onClick={handleDestroy} />}
        </div>
    );
}

export default Destroy;
