import PageTitle from '~/components/PageTitle';
import { Row, Col, Card, Button } from 'react-bootstrap';

function CreateSEO() {
    return (
        <div className="wrapper">
            <div className="header">
                <Row>
                    <PageTitle name="Tạo link SEO" />
                </Row>
            </div>
            <div className="content">
                <Row>
                    <Col xl={12}>
                        <Card className="card">
                            <Card.Header>
                                <Card.Title>Tạo seo meta cho website</Card.Title>
                            </Card.Header>

                            <Card.Body>
                                <div className="col-md-6 mt-3">
                                    <div className="form-group">
                                        <label>Url seo:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Copy Url muốn tạo vào đây: http://"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="d-block">Ảnh đại diện của trang:</label>
                                        {/* <img id="logo-icon" className="imgPreview" src /> */}

                                        <Button size="sm" variant="info">
                                            Chọn ảnh
                                        </Button>
                                    </div>

                                    <div className="form-group col-3 p-0">
                                        <label>Ngôn ngữ:</label>
                                        <select className="form-control">
                                            <option value="vi">Tiếng Việt</option>
                                            <option value="us">English</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Tiêu đề SEO:</label>
                                        <input type="text" className="form-control" placeholder="Khoảng 64 ký tự" />
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả SEO:</label>
                                        <textarea className="form-control" placeholder="Mô tả seo, khoảng 168 ký tự" />
                                    </div>
                                    <div className="form-group">
                                        <label>Từ khóa SEO:</label>
                                        <textarea className="form-control" placeholder="Từ khóa seo" />
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Footer>
                                <Button>Tạo mới</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default CreateSEO;
