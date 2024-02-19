import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import PageTitle from '~/components/PageTitle';
import { Link } from 'react-router-dom';

function History() {
    return (
        <div className="wrapper">
            <div className="header">
                <Row>
                    <PageTitle name="Lịch sử đăng nhập" />
                </Row>
            </div>
            <div className="content">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <Card.Header>
                                <div className="float-right">
                                    <div className="input-group">
                                        <select className="form-control">
                                            <option value="user_id">ID khách hàng</option>
                                            <option value="phone">Theo số điện thoại</option>
                                            <option value="email">Theo email</option>
                                            <option value="ip">Theo IP</option>
                                        </select>
                                        <input type="text" className="form-control" placeholder="Nhập vào đây" />

                                        <div className="input-group-append">
                                            <Button variant="warning" title="Tìm kiếm">
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Header>

                            <Card.Body>
                                <div className="table-responsive">
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th>TT</th>
                                                <th>ID</th>
                                                <th>Thông tin khách</th>
                                                <th>IP</th>
                                                <th>User Agent</th>
                                                <th>Ngày tạo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr data-id={1481}>
                                                <td>1481</td>
                                                <td>17788214</td>
                                                <td>VũㅤㅤThTùngㅤ亗</td>
                                                <td>171.234.15.36</td>
                                                <td>
                                                    Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,
                                                    like Gecko) Chrome/108.0.0.0 Safari/537.36
                                                </td>
                                                <td>2022-12-10 11:46:17</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>

                            <Card.Footer>
                                <div className="float-right">
                                    <ul className="pagination">
                                        <li className="page-item disabled">
                                            <span className="page-link">‹</span>
                                        </li>
                                        <li className="page-item active">
                                            <span className="page-link">1</span>
                                        </li>
                                        <li className="page-item">
                                            <Link className="page-link" to="/users?page=2">
                                                2
                                            </Link>
                                        </li>
                                        <li className="page-item">
                                            <Link className="page-link" to="/users?page=3">
                                                3
                                            </Link>
                                        </li>
                                        <li className="page-item">
                                            <Link className="page-link" to="/users?page=2">
                                                ›
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default History;
