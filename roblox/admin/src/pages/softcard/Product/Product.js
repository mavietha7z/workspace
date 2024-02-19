import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Col, Row, Card, Table, Button, Pagination } from 'react-bootstrap';
import { faCheckCircle, faCirclePlus, faMagnifyingGlass, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import config from '~/configs';
import Modals from '~/components/Modals';
import PageTitle from '~/components/PageTitle';
import { logoutSuccess } from '~/redux/reducer/auth';
import { alertError, alertSuccess } from '~/configs/alert';
import { actionsTelcos, destroyTelco, getTelcos, searchTelcos, updateTelco } from '~/services/telco';

const { softcard, create, login } = config.routes;

function Product() {
    const [pages, setPages] = useState(1);
    const [show, setShow] = useState(false);
    const [telco, setTelco] = useState(null);
    const [index, setIndex] = useState(null);
    const [telcos, setTelcos] = useState([]);
    const [actions, setActions] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchValue, setSearchValue] = useState('');
    const [searchType, setSearchType] = useState('name');

    const [checkBoxAll, setCheckBoxAll] = useState(false);
    const [checkBoxItems, setCheckBoxItems] = useState([]);

    const page = searchParams.get('page');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Danh sách thẻ cào - Quản trị website';

        const fetch = async () => {
            const result = await getTelcos(page || 1);

            if (result.status === 401 || result.status === 403) {
                dispatch(logoutSuccess());
                navigate(login);
            } else if (result.status === 200) {
                setTelcos(result.data);
                setPages(result.pages);
            } else {
                alertError(result.error);
            }
        };
        fetch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    // Hàm xử lý khi checkbox all
    const handleCheckBoxAll = (event) => {
        // Chỉ được checkbox all khi có sản phẩm
        if (telcos.length === 0) {
            return alertError('Không có sản phẩm nào');
        }

        const { checked } = event.target;
        setCheckBoxAll(checked);

        if (checked) {
            const allItemIds = telcos.map((telco) => telco._id);
            setCheckBoxItems(allItemIds);
        } else {
            setCheckBoxItems([]);
        }
    };

    // Hàm xử lý khi checkbox riêng lẻ
    const handleCheckBoxItem = (itemId) => {
        if (checkBoxItems.includes(itemId)) {
            // Nếu đã checkbox thì bỏ checkbox và set checkbox all = false
            setCheckBoxItems(checkBoxItems.filter((id) => id !== itemId));
            setCheckBoxAll(false);
        } else {
            // Nếu chưa checkbox thì trả lại các id đã checkbox và thêm id mới checkbox
            setCheckBoxItems([...checkBoxItems, itemId]);

            // Do checkBoxItems vừa được set lại nên telcos phải - 1 mới bằng được độ dài mảng
            if (checkBoxItems.length === telcos.length - 1) {
                setCheckBoxAll(true);
            }
        }
    };

    // Hàm sử lý hành động checkbox
    const handleActions = async () => {
        if (!actions) {
            alertError('Vui lòng chọn hành động');
        } else if (checkBoxItems.length === 0) {
            alertError('Vui lòng chọn sản phẩm');
        } else {
            const result = await actionsTelcos(checkBoxItems, actions);

            if (result.status === 401 || result.status === 403) {
                dispatch(logoutSuccess());
                navigate(login);
            } else if (result.status === 200) {
                let newTelcos;
                switch (actions) {
                    case 'delete':
                        newTelcos = telcos.filter((item) => !checkBoxItems.includes(item._id));
                        break;
                    case 'on':
                        newTelcos = telcos.map((item) => {
                            if (checkBoxItems.includes(item._id)) {
                                return { ...item, status: true };
                            } else {
                                return item;
                            }
                        });
                        break;
                    case 'off':
                        newTelcos = telcos.map((item) => {
                            if (checkBoxItems.includes(item._id)) {
                                return { ...item, status: false };
                            } else {
                                return item;
                            }
                        });
                        break;
                    default:
                        break;
                }
                if (newTelcos) {
                    setActions('');
                    setTelcos(newTelcos);
                    setCheckBoxItems([]);
                    setCheckBoxAll(false);
                    alertSuccess(result.message);
                }
            } else {
                alertError(result.error);
            }
        }
    };

    // Hàm thay đổi trạng thái sản phẩm
    const handleToggleStatus = async (id, index) => {
        if (!id) {
            alertError('ID không tồn tại');
        } else {
            const result = await updateTelco({}, id, 'status');

            if (result.status === 401 || result.status === 403) {
                dispatch(logoutSuccess());
                navigate(login);
            } else if (result.status === 200) {
                const clone = [...telcos];
                clone[index].status = !clone[index].status;
                setTelcos(clone);
            } else {
                alertError(result.error);
            }
        }
    };

    const handleSearch = async () => {
        if (!searchValue) {
            alertError('Vui lòng nhập từ khóa');
        } else {
            const result = await searchTelcos(searchType, searchValue);

            if (result.status === 401 || result.status === 403) {
                dispatch(logoutSuccess());
                navigate(login);
            } else if (result.status === 200) {
                setTelcos(result.data);
            } else {
                alertError(result.error);
            }
        }
    };

    // Hàm xác nhận xóa sản phẩm
    const handleConfirm = async () => {
        if (!telco._id) {
            alertError('ID không tồn tại');
        } else {
            const result = await destroyTelco(telco._id);

            if (result.status === 401 || result.status === 403) {
                dispatch(logoutSuccess());
                navigate(login);
            } else if (result.status === 200) {
                alertSuccess(result.message);
                const clone = [...telcos];
                clone.splice(index, 1);
                setTelcos(clone);
                setShow(false);
            } else {
                alertError(result.error);
            }
        }
    };

    const handleDelete = async (telco, index) => {
        setShow(true);
        setTelco(telco);
        setIndex(index);
    };

    // Pagination
    let paginationItems = [];
    for (let number = 1; number <= pages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={page ? number === Number(page) : number === 1}
                onClick={() => setSearchParams({ page: number })}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div className="wrapper">
            <div className="header">
                <Row>
                    <PageTitle name="Danh sách sản phẩm" />
                </Row>
            </div>
            <div className="content">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <Card.Header>
                                <div className="float-right">
                                    <div className="input-group">
                                        <select
                                            name="type"
                                            className="form-control"
                                            value={searchType}
                                            onChange={(e) => setSearchType(e.target.value)}
                                        >
                                            <option value="code">Mã sản phẩm</option>
                                            <option value="name">Tên sản phẩm</option>
                                        </select>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập vào đây"
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <Button variant="warning" title="Tìm kiếm" onClick={handleSearch}>
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </Button>
                                        </div>
                                        <Link to={softcard + create} className="ml-3">
                                            <Button variant="success" title="Thêm mới sản phẩm">
                                                <FontAwesomeIcon icon={faCirclePlus} />
                                                <span>Thêm mới</span>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div className="table-responsive">
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input
                                                        type="checkbox"
                                                        checked={checkBoxAll}
                                                        onChange={handleCheckBoxAll}
                                                    />
                                                </th>
                                                <th>TT</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Mã sản phẩm</th>
                                                <th>Giảm giá</th>
                                                <th>Ảnh</th>
                                                <th>Trạng thái</th>
                                                <th>Tạo / Cập nhật</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {telcos.length > 0 ? (
                                                telcos.map((telco, index) => (
                                                    <tr key={telco._id}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                checked={checkBoxItems.includes(telco._id)}
                                                                onChange={() => handleCheckBoxItem(telco._id)}
                                                            />
                                                        </td>
                                                        <td>{telco.priority}</td>
                                                        <td>{telco.telco}</td>
                                                        <td>{telco.product_code}</td>
                                                        <td>{telco.discount}%</td>
                                                        <td>
                                                            <img
                                                                src={telco.image_url}
                                                                alt={telco.telco}
                                                                style={{ width: 100, height: 60 }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <div
                                                                className={`switch round ${
                                                                    telco.status ? 'on' : 'off'
                                                                }`}
                                                                onClick={() => handleToggleStatus(telco._id, index)}
                                                            >
                                                                <div className="toggle" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span>
                                                                {moment(telco.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                                            </span>
                                                            <br />
                                                            <span>
                                                                {moment(telco.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to={softcard + `/edit/${telco._id}`}
                                                                className="mr-xl-2"
                                                            >
                                                                <Button size="sm" variant="info" title="Sửa">
                                                                    <FontAwesomeIcon icon={faPen} />
                                                                </Button>
                                                            </Link>
                                                            <Button
                                                                size="sm"
                                                                variant="danger"
                                                                title="Xóa"
                                                                onClick={() => handleDelete(telco, index)}
                                                            >
                                                                <FontAwesomeIcon icon={faTrashCan} />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={10}>Không có dữ liệu</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    <Col xl={2} className="p-0">
                                        <div className="input-group">
                                            <select
                                                className="form-control"
                                                value={actions}
                                                onChange={(e) => setActions(e.target.value)}
                                            >
                                                <option value="">Chọn hành động</option>
                                                <option value="on">Bật đã chọn</option>
                                                <option value="off">Tắt đã chọn</option>
                                                <option value="delete">Xóa đã chọn</option>
                                            </select>

                                            <div className="input-group-append">
                                                <Button variant="warning" onClick={handleActions} title="Hành động">
                                                    <FontAwesomeIcon icon={faCheckCircle} />
                                                    <span>Thực hiện</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xl={10}>
                                        <div className="float-right">
                                            {pages > 1 && (
                                                <Pagination size="lg">
                                                    <Pagination.First
                                                        disabled={page ? Number(page) === 1 : true}
                                                        onClick={() => setSearchParams({ page: Number(page) - 1 })}
                                                    />
                                                    {paginationItems}
                                                    <Pagination.Last
                                                        disabled={page ? Number(page) === pages : false}
                                                        onClick={() => setSearchParams({ page: Number(page || 1) + 1 })}
                                                    />
                                                </Pagination>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>

            {show && <Modals show={show} setShow={setShow} name={telco.telco} onClick={handleConfirm} />}
        </div>
    );
}

export default Product;
