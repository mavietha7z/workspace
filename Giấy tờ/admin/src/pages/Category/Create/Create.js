import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import config from '~/configs';
import PageTitle from '~/components/PageTitle';
import { alertError, alertSuccess } from '~/configs/alert';
import { createCategory, getCategories, updateCategory } from '~/services/category';

const { category } = config.routes;

function Create() {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(true);
    const [priority, setPriority] = useState(1);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetch = async () => {
                const result = await getCategories(id);

                if (result.code === 200) {
                    const { title, priority, is_status } = result.data;

                    setTitle(title);
                    setStatus(is_status);
                    setPriority(priority);
                } else {
                    alertError(result.error);
                }
            };
            fetch();
        }
    }, [id]);

    const handleCreate = async () => {
        if (!title) {
            return alertError('Tên danh mục là bắt buộc');
        }
        if (!priority) {
            return alertError('Sự ưu tiên là bắt buộc');
        }

        const data = {
            title,
            priority,
            is_status: status,
        };

        if (id) {
            const result = await updateCategory(id, data);
            result.code === 200 ? alertSuccess(result.message) : alertError(result.error);
        } else {
            const result = await createCategory(data);

            if (result.code === 200) {
                alertSuccess(result.message);
                setTitle('');
                setPriority(1);
            } else {
                alertError(result.error);
            }
        }
    };

    return (
        <div className="wrapper">
            <div className="header">
                <Row>
                    <PageTitle name={id ? 'Sửa danh mục' : 'Thêm tối danh mục'} />
                </Row>
            </div>
            <div className="content">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <Card.Header className="d-flex align-items-center justify-content-between">
                                <Card.Title>{id ? 'Sửa danh mục' : 'Tạo danh mục'}</Card.Title>
                                <Link to={category}>
                                    <Button variant="warning">
                                        <FontAwesomeIcon icon={faHouse} />
                                        <span>Trang chính</span>
                                    </Button>
                                </Link>
                            </Card.Header>
                            <Card.Body>
                                <Col xl={6}>
                                    <div className="form-group mt-3">
                                        <label>Tên danh mục:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập tên danh mục"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Sự ưu tiên:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập sự ưu tiên"
                                            value={priority}
                                            onChange={(e) => setPriority(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="d-block">Trạng thái:</label>
                                        <div
                                            className={`switch round ${status ? 'on' : 'off'}`}
                                            onClick={() => setStatus(!status)}
                                        >
                                            <div className="toggle" />
                                        </div>
                                    </div>
                                </Col>
                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={handleCreate}>{id ? 'Cập nhật' : 'Thêm mới'}</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Create;
