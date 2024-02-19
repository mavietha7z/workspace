import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import { faDownload, faMagnifyingGlass, faPen, faTrashCan, faUsers } from '@fortawesome/free-solid-svg-icons';

import { getUsers, updateUser } from '~/services/user';
import { alertError } from '~/configs/alert';
import PageTitle from '~/components/PageTitle';

function Users() {
    const [pages, setPages] = useState(1);
    const [users, setUsers] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    const page = searchParams.get('page');

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await getUsers(1);

            if (result.code === 200) {
                setUsers(result.data);
                setPages(result.pages);
            } else {
                alertError(result.error);
            }
        };
        fetchUsers();
    }, []);

    // Hàm thay đổi trạng thái sản phẩm
    const handleToggle = async (id, index, type) => {
        if (!id) {
            return alertError('ID không tồn tại');
        }

        const result = await updateUser({}, id, type);

        if (result.code === 200) {
            const cloneUsers = [...users];
            if (type === 'role') {
                cloneUsers[index].is_admin = !cloneUsers[index].is_admin;
            } else {
                cloneUsers[index].is_status = !cloneUsers[index].is_status;
            }
            setUsers(cloneUsers);
        } else {
            alertError(result.error);
        }
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
                    <PageTitle name="Người dùng" />
                </Row>
            </div>

            <div className="content">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <Card.Header>
                                <div className="float-right">
                                    <div className="input-group">
                                        <Link to="/users?is_status=false">
                                            <Button variant="dark">
                                                <FontAwesomeIcon icon={faUsers} />
                                                <span>Bị khóa</span>
                                            </Button>
                                        </Link>

                                        <input
                                            type="text"
                                            className="form-control ml-3"
                                            placeholder="Tìm kiếm bằng ID"
                                        />
                                        <div className="input-group-append">
                                            <Button variant="warning" title="Tìm kiếm">
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </Button>
                                            <Button variant="success" className="ml-2" title="Tải xuống">
                                                <FontAwesomeIcon icon={faDownload} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Header>

                            <Card.Body>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped dataTable">
                                        <thead>
                                            <tr>
                                                <th>Tên</th>
                                                <th>email</th>
                                                <th>SĐT</th>
                                                <th>ADMIN</th>
                                                <th>Trạng thái</th>
                                                <th>Ngày tạo</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => (
                                                <tr key={user._id}>
                                                    <td>{user.full_name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.phone_number}</td>
                                                    <td>
                                                        <div
                                                            className={`switch round ${user.is_admin ? 'on' : 'off'}`}
                                                            onClick={() => handleToggle(user._id, index, 'role')}
                                                        >
                                                            <div className="toggle" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div
                                                            className={`switch round ${user.is_status ? 'on' : 'off'}`}
                                                            onClick={() => handleToggle(user._id, index, 'status')}
                                                        >
                                                            <div className="toggle" />
                                                        </div>
                                                    </td>
                                                    <td>{moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                                                    <td>
                                                        <Link to={`/users/edit/${user._id}`} className="mr-2">
                                                            <Button size="sm" variant="info" title="Sửa">
                                                                <FontAwesomeIcon icon={faPen} />
                                                            </Button>
                                                        </Link>

                                                        <Button size="sm" variant="danger" title="Xóa">
                                                            <FontAwesomeIcon icon={faTrashCan} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card.Body>

                            {pages > 1 && (
                                <Card.Footer>
                                    <Row>
                                        <Col xl={12}>
                                            <div className="float-right">
                                                <Pagination size="lg">{paginationItems}</Pagination>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Users;
