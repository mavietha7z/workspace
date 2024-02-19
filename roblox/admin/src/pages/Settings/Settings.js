import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row, Tab, Tabs, Table, Button } from 'react-bootstrap';

import config from '~/configs';
import PageTitle from '~/components/PageTitle';
import { logoutSuccess } from '~/redux/reducer/auth';
import { alertError, alertSuccess } from '~/configs/alert';
import { getSettings, updateSetting } from '~/services/settings';

function Settings() {
    const [status, setStatus] = useState(false);
    const [notify, setNotify] = useState(false);
    const [notifyUrl, setNotifyUrl] = useState(false);

    const [rate, setRate] = useState('');
    const [active, setActive] = useState(false);
    const [partnerID, setPartnerID] = useState('');
    const [partnerKey, setPartnerKey] = useState('');
    const [partnerUrl, setPartnerUrl] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Cài đạt website - Quản trị website';

        const fetch = async () => {
            const result = await getSettings();

            if (result.status === 401 || result.status === 403) {
                dispatch(logoutSuccess());
                navigate(config.routes.login);
            } else if (result.status === 200) {
                const { notify_status, notify_url, website_status, chargings } = result.data;

                setNotify(notify_status);
                setNotifyUrl(notify_url);
                setStatus(website_status);

                if (chargings) {
                    setActive(true);
                    setRate(chargings.rate);
                    setPartnerID(chargings.partner_id);
                    setPartnerKey(chargings.partner_key);
                    setPartnerUrl(chargings.partner_url);
                }
            } else {
                alertError(result.error);
            }
        };
        fetch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUpdate = async (type) => {
        const info = {
            notify_status: notify,
            notify_url: notifyUrl,
            website_status: status,
        };

        const chargings = {
            rate: rate,
            partner_id: partnerID,
            partner_key: partnerKey,
            partner_url: partnerUrl,
        };

        let data;

        if (type === 'chargings') {
            data = chargings;
        } else {
            data = info;
        }

        const result = await updateSetting(data, type);

        if (result.status === 401 || result.status === 403) {
            dispatch(logoutSuccess());
            navigate(config.routes.login);
        } else if (result.status === 200) {
            alertSuccess(result.message);
        } else {
            alertError(result.error);
        }
    };

    return (
        <div className="wrapper">
            <div className="header">
                <Row>
                    <PageTitle name="Cấu hình chung" />
                </Row>
            </div>
            <div className="content">
                <Row>
                    <Col xl={12}>
                        <Card style={{ borderTop: '3px solid #007bff' }}>
                            <Card.Header>
                                <Card.Title>
                                    <FontAwesomeIcon icon={faGears} />
                                    <span className="ml-3">Danh sách cấu hình</span>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body style={{ padding: 20 }}>
                                <Tabs defaultActiveKey="info">
                                    <Tab eventKey="info" title="Thông tin">
                                        <Row className="mt-5 mb-4">
                                            <Col className="text-center">
                                                <div className="form-group">
                                                    <Button
                                                        onClick={() => alertError('Chức năng đang được phát triển')}
                                                    >
                                                        Chọn ảnh
                                                    </Button>
                                                </div>
                                                <label>Favicon Icon</label>
                                            </Col>
                                            <Col className="text-center">
                                                <div className="form-group">
                                                    <Button
                                                        onClick={() => alertError('Chức năng đang được phát triển')}
                                                    >
                                                        Chọn ảnh
                                                    </Button>
                                                </div>
                                                <label>Website Logo</label>
                                            </Col>
                                            <Col className="text-center">
                                                <div className="form-group">
                                                    <Button
                                                        onClick={() => alertError('Chức năng đang được phát triển')}
                                                    >
                                                        Chọn ảnh
                                                    </Button>
                                                </div>
                                                <label>Backend Logo</label>
                                            </Col>
                                        </Row>
                                        <Row className="mt-xl-5">
                                            <Col xl={6}>
                                                <Table bordered>
                                                    <tbody>
                                                        <tr>
                                                            <td>Website</td>
                                                            <td>
                                                                <select
                                                                    className="form-control"
                                                                    value={status}
                                                                    onChange={(e) => setStatus(e.target.value)}
                                                                >
                                                                    <option value={true}>ONLINE</option>
                                                                    <option value={false}>OFFLINE</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Thông báo</td>
                                                            <td>
                                                                <select
                                                                    className="form-control"
                                                                    value={notify}
                                                                    onChange={(e) => setNotify(e.target.value)}
                                                                >
                                                                    <option value={true}>ONLINE</option>
                                                                    <option value={false}>OFFLINE</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Link ảnh</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={notifyUrl}
                                                                    onChange={(e) => setNotifyUrl(e.target.value)}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                        <Row className="my-5">
                                            <Col xl={12}>
                                                <Button onClick={() => handleUpdate('info')}>Lưu cấu hình</Button>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    {active && (
                                        <Tab eventKey="chargings" title="Đổi thẻ cào">
                                            <Row className="mt-5">
                                                <Col xl={6} className="p-0">
                                                    <Table bordered>
                                                        <tbody>
                                                            <tr>
                                                                <td>Tỉ lệ</td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={rate}
                                                                        onChange={(e) => setRate(e.target.value)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Partner ID</td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={partnerID}
                                                                        onChange={(e) => setPartnerID(e.target.value)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Partner Key</td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={partnerKey}
                                                                        onChange={(e) => setPartnerKey(e.target.value)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Partner URL</td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={partnerUrl}
                                                                        onChange={(e) => setPartnerUrl(e.target.value)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                            <Row className="my-5">
                                                <Col xl={12}>
                                                    <Button onClick={() => handleUpdate('chargings')}>
                                                        Lưu cấu hình
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Tab>
                                    )}
                                </Tabs>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Settings;
