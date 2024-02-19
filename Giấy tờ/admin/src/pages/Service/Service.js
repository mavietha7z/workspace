import moment from 'moment';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faMagnifyingGlass, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import config from '~/configs';
import PageTitle from '~/components/PageTitle';
import Destroy from '~/components/Destroy';
import { alertError, alertSuccess } from '~/configs/alert';
import { destroyService, getServices } from '~/services/service';

const { services: path, create } = config.routes;

function Service() {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(null);
    const [service, setService] = useState(null);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const result = await getServices();
            result.code === 200 ? setServices(result.data) : alertError(result.error);
        };
        fetch();
    }, []);

    const handleDelete = async () => {
        if (!service._id) {
            return alertError('UID không tồn tại');
        }

        const result = await destroyService(service._id);
        result.code === 200 ? alertSuccess(result.message) : alertError(result.error);

        if (result.code === 200) {
            const clone = [...services];
            clone.splice(index, 1);
            setServices(clone);
            setShow(false);
        } else {
            alertError(result.error);
        }
    };

    return (
        <div className="wrapper">
            <div className="header">
                <Row>
                    <PageTitle name="Quản lý dịch vụ" />
                </Row>
            </div>
            <div className="content">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <Card.Header>
                                <div className="float-right">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tìm kiếm bằng tên..."
                                        />

                                        <div className="input-group-append">
                                            <Button variant="warning">
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </Button>
                                            <Link to={path + create} className="ml-2">
                                                <Button variant="success">
                                                    <FontAwesomeIcon icon={faCirclePlus} />
                                                    <span>Thêm dịch vụ</span>
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
                                                <th>Tên</th>
                                                <th>Người viết</th>
                                                <th>Sự ưu tiên</th>
                                                <th>Trạng thái</th>
                                                <th>Ngày tạo</th>
                                                <th>Cập nhật</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {services.length > 0 ? (
                                                services.map((service, index) => (
                                                    <tr key={service._id}>
                                                        <td className="text-left px-4">{service.title}</td>
                                                        <td>{service.user.full_name}</td>
                                                        <td>{service.priority}</td>
                                                        <td>
                                                            <div
                                                                className={`switch round ${
                                                                    service.is_status ? 'on' : 'off'
                                                                }`}
                                                            >
                                                                <div className="toggle" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {moment(service.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                                        </td>
                                                        <td>
                                                            {moment(service.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                                                        </td>
                                                        <td>
                                                            <Link to={`${path}/edit/${service._id}`}>
                                                                <Button
                                                                    size="sm"
                                                                    variant="info"
                                                                    className="mr-2"
                                                                    title="Sửa"
                                                                >
                                                                    <FontAwesomeIcon icon={faPen} />
                                                                </Button>
                                                            </Link>
                                                            <Button
                                                                size="sm"
                                                                variant="danger"
                                                                title="Xóa"
                                                                onClick={() => {
                                                                    setService(service);
                                                                    setShow(true);
                                                                    setIndex(index);
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faTrashCan} />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={7}>Không có dữ liệu</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>

                        {show && <Destroy show={show} setShow={setShow} name={service.title} onClick={handleDelete} />}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Service;
