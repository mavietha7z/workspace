import MarkdownIt from 'markdown-it';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Button, Card, Col, Row } from 'react-bootstrap';

import './styles.css';
import config from '~/configs';
import PageTitle from '~/components/PageTitle';
import { getServices, updateService } from '~/services/service';
import { createService } from '~/services/service';
import { alertError, alertSuccess } from '~/configs/alert';

const mdParser = new MarkdownIt();
const { services } = config.routes;

function Create() {
    const [text, setText] = useState('');
    const [html, setHtml] = useState('');
    const [show, setShow] = useState(false);

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(true);
    const [priority, setPriority] = useState(1);
    const [description, setDescription] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchService = async () => {
                const result = await getServices(id);

                if (result.code === 200) {
                    const { content, description, is_status, priority, title } = result.data;

                    setTitle(title);
                    setText(content);
                    setStatus(is_status);
                    setPriority(priority);
                    setDescription(description);
                } else {
                    alertError(result.error);
                }
            };
            fetchService();
        }
    }, [id]);

    const handleShow = () => {
        if (!text) {
            return alertError('Vui lòng nhập nội dung');
        }

        setShow(true);
    };

    const handlePublic = async () => {
        if (!title || title.length < 2) {
            return alertError('Tên dịch vụ không hợp lệ');
        }
        if (!priority) {
            return alertError('Sự ưu tiên là bắt buộc');
        }

        const data = {
            title,
            priority,
            content: text,
            content_html: html,
            description,
            is_status: status,
        };

        let result;

        if (id) {
            result = await updateService(id, data);
        } else {
            result = await createService(data);
        }

        if (result.code === 200) {
            setShow(false);
            setTitle('');
            setStatus(false);
            setPriority(1);
            setDescription('');
            navigate(services);
            alertSuccess(result.message);
        } else {
            alertError(result.error);
        }
    };

    return (
        <div className="wrapper">
            <div className="header">
                <Row>
                    <PageTitle name={id ? 'Sửa dịch vụ' : 'Thêm dịch vụ'} />
                </Row>
            </div>
            <div className="content">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <Card.Body>
                                <div className="mark-down">
                                    <MdEditor
                                        style={{ height: '70vh' }}
                                        renderHTML={(text) => mdParser.render(text)}
                                        onChange={({ html, text }) => {
                                            setHtml(html);
                                            setText(text);
                                        }}
                                        placeholder="Nội dung viết ở đây"
                                        value={text}
                                    />
                                </div>
                            </Card.Body>
                            <Card.Footer>
                                <Button className="float-right" onClick={handleShow}>
                                    Xem trước
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
            {show && (
                <div className="prev">
                    <div className="prev-close" onClick={() => setShow(false)}>
                        ×
                    </div>
                    <div className="prev-content">
                        <div className="container">
                            <Row>
                                <Col xl={12}>
                                    <div className="form-group mt-3">
                                        <label>Tên dịch vụ:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập tên dịch vụ của bạn"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-2 p-0">
                                        <label>Sự ưu tiên:</label>
                                        <input
                                            type="text"
                                            className="form-control"
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
                                    <div className="form-group">
                                        <label>Mô tả ngắn: ( Có thể bỏ qua )</label>
                                        <textarea
                                            type="text"
                                            style={{ height: 100 }}
                                            className="form-control"
                                            placeholder="Nhập mô tả ngắn..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <Button className="float-right mt-4" onClick={handlePublic}>
                                        Xuất bản
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Create;
