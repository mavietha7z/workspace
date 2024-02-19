import { Link } from 'react-router-dom';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCirclePlus, faMagnifyingGlass, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import PageTitle from '~/components/PageTitle';

import config from '~/configs';
const { seo, create } = config.routes;

function SEOPage() {
    return (
        <div className="wrapper">
            <div className="header">
                <Row>
                    <PageTitle name="Seo OnPage" />
                </Row>
            </div>

            <div className="content">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <Card.Header>
                                <div className="float-right">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Nhập vào đây" />
                                        <div className="input-group-append">
                                            <Button variant="warning" title="Tìm kiếm">
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </Button>

                                            <Link to={seo + create} className="ml-2">
                                                <Button variant="success" title="Thêm mới link seo">
                                                    <FontAwesomeIcon icon={faCirclePlus} />
                                                    <span>Thêm mới</span>
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Card.Header>

                            <Card.Body>
                                <div className="table-responsive">
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input type="checkbox" />
                                                </th>
                                                <th>ID</th>
                                                <th>Link</th>
                                                <th>Tên trang</th>
                                                <th>Ngôn ngữ</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td>15</td>
                                                <td>/mtopup</td>
                                                <td>Topup</td>
                                                <td>vi</td>
                                                <td>
                                                    <Link to={seo + create} className="mr-2">
                                                        <Button size="sm" variant="info" title="Sửa">
                                                            <FontAwesomeIcon icon={faPen} />
                                                        </Button>
                                                    </Link>
                                                    <Button size="sm" variant="danger" title="Xóa">
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>

                            <Card.Footer>
                                <div className="input-group col-2">
                                    <select name="action" className="form-control">
                                        <option value="on">Bật đã chọn</option>
                                        <option value="off">Tắt đã chọn</option>
                                        <option value="delete">Xóa đã chọn</option>
                                    </select>
                                    <div className="input-group-append">
                                        <Button variant="warning" title="Thực hiện">
                                            <FontAwesomeIcon icon={faCheckCircle} />
                                            <span>Thực hiện</span>
                                        </Button>
                                    </div>
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default SEOPage;
