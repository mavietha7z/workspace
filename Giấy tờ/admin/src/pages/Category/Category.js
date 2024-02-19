import moment from 'moment';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faMagnifyingGlass, faPen, faPlusCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import config from '~/configs';
import PageTitle from '~/components/PageTitle';
import Destroy from '~/components/Destroy';
import { alertError, alertSuccess } from '~/configs/alert';
import { deleteCategory, getCategories } from '~/services/category';
import Service from '~/components/Service/Service';

const { category: path, create } = config.routes;

function Category() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(null);
    const [id, setID] = useState(null);

    const [addService, setAddService] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const result = await getCategories();
            result.code === 200 ? setCategories(result.data) : alertError(result.error);
        };
        fetch();
    }, []);

    const handleDelete = async () => {
        if (!category._id) {
            return alertError('UID không tồn tại');
        }

        const result = await deleteCategory(category._id);
        result.code === 200 ? alertSuccess(result.message) : alertError(result.error);

        if (result.code === 200) {
            const clone = [...categories];
            clone.splice(index, 1);
            setCategories(clone);
            setShow(false);
        } else {
            alertError(result.error);
        }
    };

    return (
        <div className="wrapper">
            <div className="header">
                <Row>
                    <PageTitle name="Quản lý danh mục" />
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
                                                    <span>Tạo danh mục</span>
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
                                                <th>Số dịch vụ</th>
                                                <th>Sự ưu tiên</th>
                                                <th>Trạng thái</th>
                                                <th>Ngày tạo</th>
                                                <th>Cập nhật</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.length > 0 ? (
                                                categories.map((category, index) => (
                                                    <tr key={category._id}>
                                                        <td>{category.title}</td>
                                                        <td>{category.services.length}</td>
                                                        <td>{category.priority}</td>
                                                        <td>
                                                            <div
                                                                className={`switch round ${
                                                                    category.is_status ? 'on' : 'off'
                                                                }`}
                                                            >
                                                                <div className="toggle" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {moment(category.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                                        </td>
                                                        <td>
                                                            {moment(category.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                                                        </td>
                                                        <td>
                                                            <Link to={`${path}/edit/${category._id}`}>
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
                                                                variant="success"
                                                                className="mr-2"
                                                                title="Thêm dịch vụ"
                                                                onClick={() => {
                                                                    setAddService(true);
                                                                    setID(category._id);
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faPlusCircle} />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="danger"
                                                                title="Xóa"
                                                                onClick={() => {
                                                                    setCategory(category);
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

                        {show && <Destroy show={show} setShow={setShow} name={category.title} onClick={handleDelete} />}

                        {addService && (
                            <Service show={addService} setShow={setAddService} setCategories={setCategories} id={id} />
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Category;
