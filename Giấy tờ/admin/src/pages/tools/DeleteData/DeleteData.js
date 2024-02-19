import PageTitle from '~/components/PageTitle';
import { Row, Col, Card, Button } from 'react-bootstrap';

function DeleteData() {
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
                                        <Card.Header className="bg-secondary">
                                            <Card.Title>Xóa dữ liệu</Card.Title>
                                        </Card.Header>

                                        <Card.Body>
                                            <div className="col-12 mt-3">
                                                <div className="form-group">
                                                    <label>Chọn thời gian muốn xóa</label>
                                                    <select className="form-control">
                                                        <option value="7d">Xóa dữ liệu cũ hơn 7 ngày</option>
                                                        <option value="15d">Xóa dữ liệu cũ hơn 15 ngày</option>
                                                        <option value="1m">Xóa dữ liệu cũ hơn 1 tháng</option>
                                                        <option value="2m">Xóa dữ liệu cũ hơn 2 tháng</option>
                                                        <option value="3m">Xóa dữ liệu cũ hơn 3 tháng</option>
                                                        <option value="6m">Xóa dữ liệu cũ hơn 6 tháng</option>
                                                        <option value="12m">Xóa dữ liệu cũ hơn 12 tháng</option>
                                                    </select>
                                                </div>
                                                <div className="mb-2">
                                                    Nếu dữ liệu quá nhiều gây timeout, bạn có thể xóa làm nhiều lần.
                                                </div>
                                            </div>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Button variant="secondary" title="Xóa dữ liệu">
                                                Thực hiện
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>

                                <Col xl={6}>
                                    <Card>
                                        <Card.Header className="bg-primary">
                                            <Card.Title>Xóa dữ liệu</Card.Title>
                                        </Card.Header>

                                        <Card.Body>
                                            <div className="col-12 mt-3">
                                                <div className="form-group">
                                                    <label>Chọn thời gian muốn xóa</label>
                                                    <select className="form-control">
                                                        <option value="7d">Xóa dữ liệu cũ hơn 7 ngày</option>
                                                        <option value="15d">Xóa dữ liệu cũ hơn 15 ngày</option>
                                                        <option value="1m">Xóa dữ liệu cũ hơn 1 tháng</option>
                                                        <option value="2m">Xóa dữ liệu cũ hơn 2 tháng</option>
                                                        <option value="3m">Xóa dữ liệu cũ hơn 3 tháng</option>
                                                        <option value="6m">Xóa dữ liệu cũ hơn 6 tháng</option>
                                                        <option value="12m">Xóa dữ liệu cũ hơn 12 tháng</option>
                                                    </select>
                                                </div>
                                                <div className="mb-2">
                                                    Nếu dữ liệu quá nhiều gây timeout, bạn có thể xóa làm nhiều lần.
                                                </div>
                                            </div>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Button variant="primary" title="Xóa dữ liệu">
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
        </div>
    );
}

export default DeleteData;
