import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import config from '~/configs';
import Modals from '~/components/Modals';
import PageTitle from '~/components/PageTitle';
import { logoutSuccess } from '~/redux/reducer/auth';
import { alertError, alertSuccess } from '~/configs/alert';
import { destroyPartners, getPartners, updatePartners } from '~/services/partners';

const { partners: path, login } = config.routes;

function Merchant() {
    const [partners, setPartners] = useState([]);
    const [actives, setActives] = useState([]);

    const [show, setShow] = useState(false);
    const [partner, setPartner] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Danh sách đối tác đổi thẻ - Quản trị web';

        const fetch = async () => {
            const result = await getPartners();

            if (result.status === 401 || result.status === 403) {
                dispatch(logoutSuccess());
                navigate(login);
            } else if (result.status === 200) {
                setPartners(result.data);
                setActives(result.actives);
            } else {
                alertError(result.error);
            }
        };
        fetch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Hàm thay đổi trạng thái sản phẩm
    const handleToggleStatus = async (id) => {
        if (!id) {
            alertError('ID không tồn tại');
        } else {
            const result = await updatePartners({}, id, 'status');

            if (result.status === 401 || result.status === 403) {
                dispatch(logoutSuccess());
                navigate(login);
            } else if (result.status === 200) {
                const clone = [...partners];
                clone[0].status = !clone[0].status;
                setPartners(clone);
            } else {
                alertError(result.error);
            }
        }
    };

    const handleDelete = async (partner) => {
        setShow(true);
        setPartner(partner);
    };

    // Hàm xác nhận xóa sản phẩm
    const handleConfirm = async () => {
        if (!partner._id) {
            alertError('ID không tồn tại');
        } else {
            const result = await destroyPartners(partner._id);

            if (result.status === 401 || result.status === 403) {
                dispatch(logoutSuccess());
                navigate(login);
            } else if (result.status === 200) {
                setShow(false);
                setPartners([]);
                setActives([...actives, partner]);
                alertSuccess(result.message);
            } else {
                alertError(result.error);
            }
        }
    };

    return (
        <div className="wrapper">
            <div className="header">
                <Row>
                    <PageTitle name="Quản lý đối tác API" />
                </Row>
            </div>
            <div className="content">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title>Đối tác đã cài đặt</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="table-responsive">
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tên</th>
                                                <th>Partner ID</th>
                                                <th>Partner Key</th>
                                                <th>Trạng thái</th>
                                                <th>Ngày tao</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {partners.length > 0 ? (
                                                partners.map((partner) => (
                                                    <tr key={partner._id}>
                                                        <td>{partner._id.slice(-3)}</td>
                                                        <td>{partner.partner_name}</td>
                                                        <td>{partner.partner_id}</td>
                                                        <td>{partner.partner_key}</td>
                                                        <td>
                                                            <div
                                                                className={`switch round ${
                                                                    partner.status ? 'on' : 'off'
                                                                }`}
                                                                onClick={() => handleToggleStatus(partner._id)}
                                                            >
                                                                <div className="toggle" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {moment(partner.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                                        </td>
                                                        <td>
                                                            <Link to={`${path}/edit/${partner._id}`}>
                                                                <Button
                                                                    size="sm"
                                                                    variant="info"
                                                                    className="mr-xl-2"
                                                                    title="Sửa"
                                                                >
                                                                    <FontAwesomeIcon icon={faPen} />
                                                                </Button>
                                                            </Link>
                                                            <Button
                                                                size="sm"
                                                                variant="danger"
                                                                title="Tắt"
                                                                onClick={() => handleDelete(partner)}
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

                        <Card className="mt-5">
                            <Card.Header>
                                <Card.Title>Đối tác chưa cài đặt</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="table-responsive">
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tên hiển thị</th>
                                                <th>Địa chỉ IP</th>
                                                <th>Ngày tạo</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {actives.length > 0 ? (
                                                actives.map((active) => (
                                                    <tr key={active._id}>
                                                        <td>{active._id.slice(-3)}</td>
                                                        <td>{active.partner_name}</td>
                                                        <td></td>
                                                        <td>
                                                            {moment(active.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                                        </td>
                                                        <td>
                                                            <Link to={`${path}/edit/${active._id}?type=active`}>
                                                                <Button size="sm" variant="success" title="Bật">
                                                                    <FontAwesomeIcon icon={faCircleCheck} />
                                                                </Button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5}>Không có dữ liệu</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

            {show && <Modals show={show} setShow={setShow} name={partner.partner_name} onClick={handleConfirm} />}
        </div>
    );
}

export default Merchant;
