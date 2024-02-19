import { useState, useEffect } from 'react';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row, Tab, Table, Tabs } from 'react-bootstrap';

import PageTitle from '~/components/PageTitle';
import { alertError, alertSuccess } from '~/configs/alert';
import { getSetting, updateSetting } from '~/services/setting';

function Settings() {
    const [zalo, setZalo] = useState('');
    const [face, setFace] = useState('');
    const [tele, setTele] = useState('');
    const [logo, setLogo] = useState('');

    useEffect(() => {
        const fetchSetting = async () => {
            const result = await getSetting();

            if (result.code === 200) {
                const { facebook_url, logo_url, phone_number, telegram_url } = result.data;

                setLogo(logo_url);
                setZalo(phone_number);
                setFace(facebook_url);
                setTele(telegram_url);
            } else {
                alertError(result.error);
            }
        };
        fetchSetting();
    }, []);

    const handleSave = async () => {
        const data = {
            phone_number: zalo,
            facebook_url: face,
            telegram_url: tele,
            logo_url: logo,
        };

        const result = await updateSetting(data);

        result.code === 200 ? alertSuccess(result.message) : alertError(result.error);
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
                                        <Row>
                                            <Col xl={6} className="p-0 mt-3">
                                                <Table striped bordered>
                                                    <tbody>
                                                        <tr>
                                                            <td>Zalo</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={zalo}
                                                                    onChange={(e) => setZalo(e.target.value)}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Facebook</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={face}
                                                                    onChange={(e) => setFace(e.target.value)}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Telegram</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={tele}
                                                                    onChange={(e) => setTele(e.target.value)}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Logo</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={logo}
                                                                    onChange={(e) => setLogo(e.target.value)}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>

                                                <Button className="mt-5" onClick={handleSave}>
                                                    Lưu cấu hình
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Tab>
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
