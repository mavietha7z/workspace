import { Col, Row } from 'react-bootstrap';

import config from '~/configs';
import Wrapper from '~/components/Wrapper';
import Breadcrumb from '~/components/Breadcrumb';
import CustomCard from '~/components/CustomCard';

const { modules } = config.routes;

function Modules() {
    return (
        <div className="main">
            <Breadcrumb listItem={[{ title: 'Mô-đun', path: modules }]} />

            <Wrapper
                title="CÁC MÔ-ĐUN TRẢ PHÍ"
                description="THƯ VIỆN TIỆN ÍCH GIÚP BẠN NHANH CHÓNG TÍCH HỢP VÀO WEBSITE CỦA MÌNH"
            >
                <Row>
                    <Col lg={2} sm={6} className="mb-5 px-4">
                        <CustomCard
                            to="/"
                            price="2,000,000 VND"
                            title="Cổng thanh toán PayPal"
                            image="https://nencer.com/storage/userfiles/images/products/paypal.jpg"
                        />
                    </Col>
                    <Col lg={2} sm={6} className="mb-5 px-4">
                        <CustomCard
                            to="/"
                            price="1,000,000 VND"
                            title="Cổng thanh toán Ngân Lượng"
                            image="https://nencer.com/storage/userfiles/images/products/nganluong.jpg"
                        />
                    </Col>
                    <Col lg={2} className="mb-5 px-4">
                        <CustomCard
                            to="/"
                            price="2,000,000 VND"
                            title="Cổng thanh toán OnePay"
                            image="https://nencer.com/storage/userfiles/images/products/onepay.jpg"
                        />
                    </Col>
                    <Col lg={2} className="mb-5 px-4">
                        <CustomCard
                            to="/"
                            price="3,000,000 VND"
                            title="Cổng thanh toán Momo"
                            image="https://nencer.com/storage/userfiles/images/products/momo_p.jpg"
                        />
                    </Col>
                    <Col lg={2} className="mb-5 px-4">
                        <CustomCard
                            to="/"
                            price="3,000,000 VND"
                            title="Cổng thanh toán ZaloPay"
                            image="https://nencer.com/storage/userfiles/images/products/zalopay.jpg"
                        />
                    </Col>
                    <Col lg={2} className="mb-5 px-4">
                        <CustomCard
                            to="/"
                            price="8,000,000 VND"
                            title="Cổng thanh toán VNPay"
                            image="https://nencer.com/storage/userfiles/images/products/vnpay.jpg"
                        />
                    </Col>

                    <Col lg={2} className="mb-5 px-4">
                        <CustomCard
                            to="/"
                            price="5,000,000 VND"
                            title="Cổng thanh toán VtcPay"
                            image="https://nencer.com/storage/userfiles/images/products/vtcpay.jpg"
                        />
                    </Col>
                    <Col lg={2} className="mb-5 px-4">
                        <CustomCard
                            to="/"
                            price="15,000,000 VND"
                            title="Thư viện API Bitcoin"
                            image="https://nencer.com/storage/userfiles/images/products/bitcoin.jpg"
                        />
                    </Col>
                    <Col lg={2} className="mb-5 px-4">
                        <CustomCard
                            to="/"
                            price="15,000,000 VND"
                            title="Thư viện API ETH & Token ERC20"
                            image="https://nencer.com/storage/userfiles/images/products/eth.jpg"
                        />
                    </Col>
                    <Col lg={2} className="mb-5 px-4">
                        <CustomCard
                            to="/"
                            price="15,000,000 VND"
                            title="Thư viện API Token TRC20"
                            image="https://nencer.com/storage/userfiles/images/products/tron.jpg"
                        />
                    </Col>
                    <Col lg={2} className="mb-5 px-4">
                        <CustomCard
                            to="/"
                            price="5,000,000 VND"
                            title="Chat trực tuyến website"
                            image="https://nencer.com/storage/userfiles/images/products/livechat.jpeg"
                        />
                    </Col>
                </Row>
            </Wrapper>
        </div>
    );
}

export default Modules;
