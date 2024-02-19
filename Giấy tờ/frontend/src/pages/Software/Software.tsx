import { Col, Row } from 'react-bootstrap';

import config from '~/configs';
import Wrapper from '~/components/Wrapper';
import Breadcrumb from '~/components/Breadcrumb';
import SourceItem from '~/components/SourceItem';

const { softwares } = config.routes;

function Software() {
    return (
        <div className="main">
            <Breadcrumb listItem={[{ title: 'Phần mềm', path: softwares }]} />

            <Wrapper
                title="PHẦN MỀM WEB"
                description="CÁC PHẦN MỀM CÓ SẴN GIÚP TIẾT KIỆM CHI PHÍ VÀ RÚT NGẮN THỜI GIAN XÂY DỰNG"
            >
                <Row>
                    <Col lg={4} className="mb-5">
                        <SourceItem
                            title="THIẾT KẾ WEBSITE THEO YÊU CẦU"
                            image="https://nencer.com/storage/userfiles/images/products/booking-hotel.png"
                            date="16-04-2023"
                            view={11501}
                            description="Bạn đang có ý tưởng về 1 website của mình nhưng không thể thực hiện được hoặc bạn muốn có 1 website độc quyền không giống bất kỳ website nào. Hãy liên hệ chúng tôi."
                            price_current="Liên hệ admin"
                            price_old="5,000,000₫"
                            to="/"
                            text_btn="Đặt hàng"
                        />
                    </Col>
                    <Col lg={4} className="mb-5">
                        <SourceItem
                            title="THIẾT KẾ WEBSITE BÁN THẺ CÀO VÀ NẠP TOPUP TỰ ĐỘNG"
                            image="https://nencer.com/storage/userfiles/images/products/prepaid-cart.png"
                            date="16-04-2023"
                            view={11501}
                            description="Sản phẩm này giúp bạn tạo ra một website bán thẻ, đổi thẻ cào, nạp topup. Hệ thống vận hành hoàn toàn tự động, thanh toán trực tuyến và bảo mật cao."
                            price_current="15,000,000₫"
                            price_old="20,000,000₫"
                            to="/"
                        />
                    </Col>
                    <Col lg={4} className="mb-5">
                        <SourceItem
                            title="THIẾT KẾ WEBSITE HỌC TRỰC TUYẾN"
                            image="https://nencer.com/storage/userfiles/images/products/learn-system.png"
                            date="16-04-2023"
                            view={5232}
                            description="Sản phẩm giúp bạn xây dựng hệ thống quản lý khóa học và bán khóa học, thi online, trắc nghiệm, ngân hàng câu hỏi. Hỗ trợ thanh toán trực tuyến qua các ngân hàng hoặc thẻ cào điện thoại."
                            price_current="9,000,000₫"
                            price_old="20,000,000₫"
                            to="/"
                        />
                    </Col>
                    <Col lg={4} className="mb-5">
                        <SourceItem
                            title="THIẾT KẾ WEBSITE BÁN TÀI LIỆU TRỰC TUYẾN"
                            image="https://nencer.com/storage/userfiles/images/products/doc-platform.png"
                            date="16-04-2023"
                            view={5424}
                            description="Sản phẩm cho phép bạn tạo một website bán tài liệu, bán các loại file trực tuyến an toàn. Ngoài ra các khách hàng cũng có thể tại tài khoản và đăng bán tài liệu của chính mình."
                            price_current="8,000,000₫"
                            price_old="15,000,000₫"
                            to="/"
                        />
                    </Col>

                    <Col lg={4} className="mb-5">
                        <SourceItem
                            title="THIẾT KẾ WEBSITE BÁN HÀNG TRỰC TUYẾN"
                            image="https://nencer.com/storage/userfiles/images/products/shopping-cart.png"
                            date="15-04-2023"
                            view={3662}
                            description="Phần mềm giúp bạn xây dựng website quản lý sản phẩm và bán hàng chuyên nghiệp, quản lý kho hàng, tính năng POS, thanh toán online qua các ngân hàng và quản lý quỹ tiền mặt."
                            price_current="5,000,000₫"
                            price_old="10,000,000₫"
                            to="/"
                        />
                    </Col>
                </Row>
            </Wrapper>
        </div>
    );
}

export default Software;
