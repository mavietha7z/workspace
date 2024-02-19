import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';

import config from '~/configs';
import PageTitle from '~/components/PageTitle';
import { logoutSuccess } from '~/redux/reducer/auth';
import { alertError, alertSuccess } from '~/configs/alert';
import { createTelco, getTelcos, updateTelco } from '~/services/telco';

const { softcard, login } = config.routes;

function Create() {
    const [telco, setTelco] = useState('');
    const [gift, setGift] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [status, setStatus] = useState(false);
    const [priority, setPriority] = useState(1);
    const [discount, setDiscount] = useState(0);
    const [faceValue, setFaceValue] = useState('');
    const [codeLength, setCodeLength] = useState('');
    const [productCode, setProductCode] = useState('');
    const [description, setDescription] = useState('');
    const [serialLength, setSerialLength] = useState('');

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Thêm mới loại thẻ - Quản trị website';

        if (id) {
            const fetch = async () => {
                const result = await getTelcos(null, id);

                if (result.status === 401 || result.status === 403) {
                    dispatch(logoutSuccess());
                    navigate(login);
                } else if (result.status === 200) {
                    const {
                        telco,
                        product_code,
                        value,
                        discount,
                        priority,
                        image_url,
                        status,
                        code_length,
                        serial_length,
                        description,
                    } = result.data;

                    const diamond = value.map((value) => value.gift).join(', ');
                    const faceValue = value.map((value) => value.value).join(', ');

                    setTelco(telco);
                    setProductCode(product_code);
                    setFaceValue(faceValue);
                    setGift(diamond);
                    setDiscount(discount);
                    setPriority(priority);
                    setImageUrl(image_url);
                    setStatus(status);
                    setCodeLength(code_length);
                    setSerialLength(serial_length);
                    setDescription(description);
                } else {
                    alertError(result.error);
                }
            };
            fetch();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleTelco = async () => {
        const valueArray = faceValue.split(',');
        const giftArray = gift.split(',');
        const output = [];

        for (let i = 0; i < valueArray.length; i++) {
            output.push({
                value: parseInt(valueArray[i]),
                gift: parseInt(giftArray[i]),
            });
        }

        const data = {
            telco,
            value: output,
            description,
            discount,
            priority,
            image_url: imageUrl,
            code_length: codeLength,
            serial_length: serialLength,
            product_code: productCode,
            status,
        };

        let result;
        if (id) {
            result = await updateTelco(data, id);
        } else {
            result = await createTelco(data);
        }

        if (result.status === 401 || result.status === 403) {
            dispatch(logoutSuccess());
            navigate(login);
        } else if (result.status === 200) {
            alertSuccess(result.message);

            if (!id) {
                setTelco('');
                setProductCode('');
                setFaceValue('');
                setGift('');
                setDiscount(0);
                setPriority(1);
                setImageUrl('');
                setStatus(false);
                setCodeLength('');
                setSerialLength('');
                setDescription('');
            }
        } else {
            alertError(result.error);
        }
    };

    return (
        <div className="wrapper">
            <div className="header">
                <Row>
                    <PageTitle name={id ? `Sửa sản phẩm ${telco}` : 'Thêm mới sản phẩm'} />
                </Row>
            </div>
            <div className="content">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <Card.Title>{id ? `Sửa sản phẩm ${telco}` : 'Thêm mới sản phẩm'}</Card.Title>
                                <Link to={softcard}>
                                    <Button variant="warning">
                                        <FontAwesomeIcon icon={faHouseChimney} />
                                        <span>Trang chính</span>
                                    </Button>
                                </Link>
                            </Card.Header>
                            <Card.Body>
                                <Col xl={6} className="p-0 mt-3">
                                    <div className="form-group col-md-12">
                                        <label>Tên sản phẩm:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tên sản phẩm"
                                            value={telco}
                                            onChange={(e) => setTelco(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Mã sản phẩm:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Ví dụ: Viettel"
                                            value={productCode}
                                            onChange={(e) => setProductCode(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Mệnh giá:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Cách nhau bởi dấu phẩy"
                                            value={faceValue}
                                            onChange={(e) => setFaceValue(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Phần quà:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tương ứng với mệnh giá, cách nhau bởi dấu phẩy"
                                            value={gift}
                                            onChange={(e) => setGift(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Giảm giá (%)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Không giảm giá thì bỏ qua"
                                            value={discount}
                                            onChange={(e) => setDiscount(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Sắp xếp:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Sự ưu tiên khi hiển thị"
                                            value={priority}
                                            onChange={(e) => setPriority(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label className="d-block">Link ảnh:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Link ảnh"
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label className="d-block">Trạng thái:</label>
                                        <div
                                            className={`switch round ${status ? 'on' : 'off'}`}
                                            onClick={() => setStatus(!status)}
                                        >
                                            <div className="toggle" />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6 d-inline-block">
                                        <label>Độ dài mã thẻ:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Độ dài mã thẻ cho phép"
                                            value={codeLength}
                                            onChange={(e) => setCodeLength(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-md-6 d-inline-block">
                                        <label>Độ dài serial:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Độ dài serial cho phép"
                                            value={serialLength}
                                            onChange={(e) => setSerialLength(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Mô tả ngắn:</label>
                                        <textarea
                                            className="form-control"
                                            rows={3}
                                            placeholder="Có thể bỏ qua nếu không có"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                </Col>
                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={handleTelco}>{id ? 'Cập nhật' : 'Thêm mới'}</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Create;
