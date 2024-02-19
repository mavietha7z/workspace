import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import config from '~/configs';
import PageTitle from '~/components/PageTitle';
import { logoutSuccess } from '~/redux/reducer/auth';
import { alertError, alertSuccess } from '~/configs/alert';
import { actionsPartners, getPartners, updatePartners } from '~/services/partners';

const { partners, login } = config.routes;

function Create() {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(false);
    const [partnerID, setPartnerID] = useState('');
    const [partnerKey, setPartnerKey] = useState('');

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const type = new URLSearchParams(location.search).get('type');

    useEffect(() => {
        document.title = `${type ? 'Bật' : 'Sửa'} đối tác đổi thẻ - Quản trị website`;

        if (id) {
            const fetch = async () => {
                const result = await getPartners(id, type);

                if (result.status === 401 || result.status === 403) {
                    dispatch(logoutSuccess());
                    navigate(login);
                } else if (result.status === 200) {
                    const { partner_id, partner_key, status, partner_name } = result.data;

                    if (type) {
                        setTitle(partner_name);
                    } else {
                        setStatus(status);
                        setPartnerID(partner_id);
                        setPartnerKey(partner_key);
                    }
                } else if (result.status === 400) {
                    navigate(partners);
                    alertSuccess(result.message);
                } else {
                    alertError(result.error);
                }
            };
            fetch();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, type]);

    const handlePartners = async () => {
        if (!partnerID || !partnerKey) {
            return alertError('Vui lòng điền đủ thông tin');
        }

        const data = {
            partner_id: partnerID,
            partner_key: partnerKey,
            status,
            active: true,
        };

        if (type) {
            const result = await actionsPartners(data, id);

            if (result.status === 401 || result.status === 403) {
                dispatch(logoutSuccess());
                navigate(login);
            } else if (result.status === 200 || result.status === 400) {
                alertSuccess(result.message);
                navigate(partners);
            } else {
                alertError(result.error);
            }
        } else {
            const result = await updatePartners(data, id);

            if (result.status === 401 || result.status === 403) {
                dispatch(logoutSuccess());
                navigate(login);
            } else if (result.status === 200) {
                alertSuccess(result.message);
            } else if (result.status === 400) {
                navigate(partners);
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
                    <PageTitle name={type ? `Bật đối tác ${title}` : 'Sửa đối tác đổi thẻ'} />
                </Row>
            </div>
            <div className="content">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <Card.Title>{type ? `Đối tác ${title}` : 'Sửa đối tác đổi thẻ'}</Card.Title>
                                <Link to={partners}>
                                    <Button variant="warning">
                                        <FontAwesomeIcon icon={faHouseChimney} />
                                        <span>Trang chính</span>
                                    </Button>
                                </Link>
                            </Card.Header>
                            <Card.Body>
                                <Col xl={6}>
                                    <div className="form-group mt-3">
                                        <label>Partner ID:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập ID đối tác"
                                            value={partnerID}
                                            onChange={(e) => setPartnerID(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Partner Key:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập Key đối tác"
                                            value={partnerKey}
                                            onChange={(e) => setPartnerKey(e.target.value)}
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
                                <Button onClick={handlePartners}>{type ? 'Bật đối tác' : 'Cập nhật'}</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Create;
