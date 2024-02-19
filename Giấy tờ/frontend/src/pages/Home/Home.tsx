import { Accordion, Col, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Banner from '~/layouts/components/Banner';
import CustomCard from '~/components/CustomCard';
import SourceItem from '~/components/SourceItem';
import Wrapper from '~/components/Wrapper/Wrapper';
import Heading from '~/components/Heading/Heading';
import ContactItem from '~/components/ContactItem';

const cx = classNames.bind(styles);

function Home() {
    return (
        <main className="main">
            <Banner />
            {/* Mã nguồn */}
            <Wrapper
                gray
                title="PHẦN MỀM WEB"
                description="CÁC PHẦN MỀM CÓ SẴN GIÚP TIẾT KIỆM CHI PHÍ VÀ RÚT NGẮN THỜI GIAN XÂY DỰNG"
            >
                <Row>
                    <Col lg={4} className="mb-5">
                        <SourceItem
                            title="THIẾT KẾ WEBSITE BÁN THẺ CÀO VÀ NẠP TOPUP TỰ ĐỘNG"
                            image="https://nencer.com/storage/userfiles/images/products/prepaid-cart.png"
                            date="16-04-2023"
                            view={11501}
                            description="Sản phẩm này giúp bạn tạo ra một website bán thẻ, đổi thẻ cào, nạp topup. Hệ thống vận hành hoàn toàn tự động, thanh toán trực tuyến và bảo mật cao."
                            price_current="15,000,000₫"
                            price_old="20,000,000₫"
                            to="/softwares/thiet-ke-website-ban-the-cao-va-nap-topup"
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
                            title="XEM TẤT CẢ MÃ NGUỒN HIỆN CÓ"
                            image="https://nencer.com/storage/userfiles/images/products/prepaid-cart.png"
                            date="14-04-2023"
                            view={31241}
                            description="Hiện tại chúng tôi có rất nhiều mã nguồn website sẵn có tiết kiệm thời gian làm lại từ đầu, có đầy đủ các chức năng mà 1 website thường có."
                            price_current="1đ"
                            price_old="5,000,000₫"
                            to="/"
                            text_btn="Xem tất cả"
                        />
                    </Col>
                </Row>
            </Wrapper>

            {/* Mo-dun */}
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
                    <Col lg={2} className="mb-5 px-4">
                        <CustomCard
                            to="/"
                            price="1,000 VND"
                            title="Xem tất cả mô-đun hiện có"
                            image="https://nencer.com/storage/userfiles/images/products/giaodienweb.jpg"
                        />
                    </Col>
                </Row>
            </Wrapper>

            {/* Technology */}
            <Wrapper
                title="GIA CÔNG PHẦN MỀM"
                description="NHIỀU LOẠI NGÔN NGỮ LẬP TRÌNH, KỸ SƯ GIỎI TRÊN 10 NĂM KINH NGHIỆM"
                gray
            >
                <Row>
                    <Col lg={3}>
                        <CustomCard
                            title="Lập trình ứng dụng di động"
                            image="https://nencer.com/storage/userfiles/images/products/outsource_app.png"
                            to="/"
                            border
                            description="Những ngành nghề liên quan tới công nghệ thông tin ngày càng phát triển mạnh mẽ để bắt kịp với xu hướng chung."
                        />
                    </Col>
                    <Col lg={3}>
                        <CustomCard
                            title="Lập trình Python"
                            image="https://nencer.com/storage/userfiles/images/products/outsource_python.png"
                            to="/"
                            border
                            description="Python là ngôn ngữ lập trình hướng đối tượng, cấp cao, mạnh mẽ, được tạo ra bởi Guido van Rossum."
                        />
                    </Col>
                    <Col lg={3}>
                        <CustomCard
                            title="Lập trình Java Spring Boot"
                            image="https://nencer.com/storage/userfiles/images/products/outsource_springboot.png"
                            to="/"
                            border
                            description="Spring Boot là một dự án phát triển bởi JAV (ngôn ngữ java) trong hệ sinh thái Spring framework."
                        />
                    </Col>
                    <Col lg={3}>
                        <CustomCard
                            title="Lập trình PHP Laravel"
                            image="https://nencer.com/storage/userfiles/images/products/outsource_laravel.png"
                            to="/"
                            border
                            description="Laravel là một trong những PHP Framework phổ biến nhất trên thế giới được sử dụng để xây dựng ứng dụng web từ các dự án nhỏ đến lớn."
                        />
                    </Col>
                </Row>
            </Wrapper>

            {/* News and Event */}
            <div className={cx('wrapper')}>
                <div className="container">
                    <Row>
                        <Col lg={6}>
                            <Heading title="TẠI SAO CHỌN CHÚNG TÔI?" />

                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>1. Phần mềm chuyên nghiệp và có sẵn</Accordion.Header>
                                    <Accordion.Body>
                                        Các phần mềm của Nencer đang phát triển rất tiện lợi, tỉ mỉ, chuẩn nghiệp vụ,
                                        bảo mật cao, linh động chỉnh sửa, và có luôn có sẵn giúp bạn tiết kiệm thời gian
                                        xây dựng.
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1" className="mt-4">
                                    <Accordion.Header>2. Hỗ trợ kỹ thuật sau bán hàng</Accordion.Header>
                                    <Accordion.Body>
                                        Cam kết hỗ trợ tất cả các vấn đề kỹ thuật (phần mềm, máy chủ) sau khi bàn giao.
                                        Thời gian hỗ trợ trong và ngoài giờ hành chính, kể cả ngày lễ. Hình thức qua
                                        email hoặc chat.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2" className="mt-4">
                                    <Accordion.Header>3. Miễn phí nâng cấp phần mềm</Accordion.Header>
                                    <Accordion.Body>
                                        Các sản phẩm của Nencer đều được phát triển hàng ngày để tối ưu công năng, chúng
                                        tôi miễn phí nâng cấp cho tất cả khách hàng theo điều khoản của hợp đồng thiết
                                        kế.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3" className="mt-4">
                                    <Accordion.Header>4. Ngôn ngữ lập trình hiện đại</Accordion.Header>
                                    <Accordion.Body>
                                        Ngôn ngữ lập trình mà chúng tôi sử dụng đều trên nền các framework hàng đầu như
                                        PHP Laravel, .NET Core, Python Django, Java String Boot, Nodejs, Flutter, Swift,
                                        Kotlin.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4" className="mt-4">
                                    <Accordion.Header>5. Giá thành sản phẩm hợp lý</Accordion.Header>
                                    <Accordion.Body>
                                        Chất lượng sản phẩm được các khách hàng đánh giá tốt, giá thành hợp lý, không có
                                        bất kỳ phí ẩn nào so với giá công bố.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                        <Col lg={6}>
                            <Heading title="LIÊN HỆ VÀ HỖ TRỢ" />

                            <Row>
                                <Col lg={6}>
                                    <ContactItem
                                        to="https://zalo.me/0876640277"
                                        title="Liên hệ qua Zalo"
                                        description="Tư vấn viên Zalo hoạt động từ 08:00 đến 22:00 hàng ngày"
                                        image="https://i.imgur.com/M6G2qii.jpg"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <ContactItem
                                        to="/"
                                        title="Liên hệ qua Facebook"
                                        description="Tư vấn viên Facebook hoạt động từ 08:00 đến 18:00 hàng ngày"
                                        image="https://i.imgur.com/M6G2qii.jpg"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </main>
    );
}

export default Home;
