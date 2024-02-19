import 'swiper/css';
import 'swiper/css/pagination';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { Col, Row, Table } from 'react-bootstrap';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown, faEye, faTag } from '@fortawesome/free-solid-svg-icons';

import config from '~/configs';
import SoftwareImage from './SoftwareImage';
import SoftwareDetails from './SoftwareDetails';
import styles from './SourceDetail.module.scss';
import CustomCard from '~/components/CustomCard';
import Breadcrumb from '~/components/Breadcrumb';
import CustomButton from '~/components/CustomButton';

const cx = classNames.bind(styles);

const tagIcon = faTag as IconProp;
const eyeIcon = faEye as IconProp;
const downIcon = faCircleDown as IconProp;

const { softwares } = config.routes;

function SourceDetail() {
    const { pathname } = useLocation();

    return (
        <div className="main">
            <Breadcrumb
                listItem={[
                    { title: 'Phần mềm', path: softwares },
                    { title: 'Thiết kế website...', path: pathname },
                ]}
            />

            <section className={cx('wrapper')}>
                <div className="container">
                    <div className={cx('shadow')}>
                        {/* Mô tả phần mềm */}
                        <Row>
                            <Col lg={3}>
                                <div className={cx('image')}>
                                    <img
                                        src="https://nencer.com/storage/userfiles/images/products/prepaid-cart.png"
                                        alt="THIẾT KẾ WEBSITE BÁN THẺ CÀO VÀ NẠP TOPUP TỰ ĐỘNG"
                                    />
                                </div>
                            </Col>
                            <Col lg={9}>
                                <Row>
                                    <Col lg={9} className="px-4">
                                        <h1 className={cx('title')}>
                                            THIẾT KẾ WEBSITE BÁN THẺ CÀO VÀ NẠP TOPUP TỰ ĐỘNG -{' '}
                                            <span className="text-danger">v5.5</span>
                                        </h1>

                                        <div className={cx('desc')}>
                                            <p>
                                                Trong thời đại công nghệ số hiện nay, mọi hoạt động của con người dần
                                                trở nên tiện lợi hơn. Nếu như ngày trước, muốn nạp tiền điện thoại ta
                                                phải ra ngoài tiệm và mua thẻ cào. Tuy nhiên hiện nay với dịch vụ thiết
                                                kế website bán thẻ cào và nạp Topup tự động tại Nencer. Các bạn chỉ cần
                                                ngồi ở nhà và thanh toán qua online là đã có thể mua được thẻ cào.
                                            </p>
                                            <p>
                                                Phần mềm thiết kế website bán thẻ cào và nạp Topup tự động không chỉ
                                                thuận tiện cho người mua, mà còn hỗ trợ rất nhiều cho người bán. Bởi vì
                                                đây là một hệ thống vận hành tự động 24/24 vô cùng an toàn và bảo mật.
                                                Bạn có thể bán thẻ cào từ kho của mình hoặc kho chia sẻ từ đơn vị khác.
                                                Website này cho phép các khách hàng thanh toán trực tuyến qua nhiều ngân
                                                hàng khác nhau. Ngoài ra trên hệ thống còn tích hợp thêm các mô đun chia
                                                sẻ dữ liệu. Điều này cho phép bạn có thể phát triển nó trên ứng dụng di
                                                động và liên kết thanh toán với website khác. Nencer còn có sẵn tài liệu
                                                tích hợp API và code mẫu. Giúp bạn dễ dàng thiết kế website theo ý muốn.
                                                Ngoài ra việc tích hợp API. Sẽ hỗ trợ bạn trong việc quản lý việc mua
                                                bán và cập nhật các thông tin khách hàng. Giúp khách hàng tìm kiếm các
                                                thông tin và yêu cầu về sản phẩm.
                                            </p>
                                            <p>
                                                Việc thiết kế một website bán thẻ cào tự động sẽ giúp cho bạn giảm rất
                                                nhiều chi phí về nhân lực. Ngoài ra độ bảo mật và an toàn sẽ rất cao.
                                                Tiết kiệm rất nhiều thời gian cho bạn. Website bán thẻ cào tự động hoạt
                                                động 24/24 làm tăng năng suất bán hàng của bạn. Tối ưu hóa chi phí và
                                                giúp tăng thêm doanh thu.
                                            </p>
                                            <p>
                                                Nếu như bạn đang cần tìm một nhà cung cấp dịch vụ thiết kế website bán
                                                thẻ cào điện thoại chuyên nghiệp, thì Nencer là một lựa chọn lý tưởng
                                                dành cho bạn. Tại đây chúng tôi chuyên cung cấp các phần mềm thiết kế
                                                website bán thẻ cào trực tuyến. Các phần mềm của chúng tôi cung cấp đều
                                                được thiết kế rất chuyên nghiệp và tỉ mỉ. Đối với những khách hàng
                                                premium, chúng tôi nhận hỗ trợ từ 8 - 23h không ngày nghỉ lễ. Chúng tôi
                                                sẽ giúp cho khách hàng tối ưu chi phí và nhân lực bằng việc tự động hóa
                                                sản phẩm. Quý khách muốn mua sản phẩm chỉ cần thanh toán trực tuyến. Hệ
                                                thống sẽ nhận và hỗ trợ 24/24. Ngoài ra các phần mềm tại Nencer luôn
                                                được tối ưu và phát triển do đó sản phẩm sẽ ngày càng hoàn thiện hơn. Để
                                                biết thêm nhiều thông tin hơn về sản phẩm, quý khách vui lòng kéo xuống
                                                bên dưới.
                                            </p>
                                        </div>
                                    </Col>
                                    <Col lg={3} className="px-4">
                                        <div className={cx('price')}>
                                            <p>Giá bán:</p>

                                            <div className={cx('price-current')}>
                                                <FontAwesomeIcon icon={tagIcon} />

                                                <span>15,000,000₫</span>
                                            </div>

                                            <div className={cx('price-old')}>20,000,000₫</div>
                                        </div>

                                        <div className={cx('action')}>
                                            <CustomButton text="Xem demo" to="/" bg="warning" width>
                                                <FontAwesomeIcon icon={eyeIcon} />
                                            </CustomButton>
                                            <CustomButton text="Tải báo giá" to="/" width>
                                                <FontAwesomeIcon icon={downIcon} />
                                            </CustomButton>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        {/* Hình ảnh phần mềm */}
                        <Row style={{ marginTop: 48 }}>
                            <Col lg={12}>
                                <div className={cx('title-img')}>Hình ảnh</div>

                                <SoftwareImage />
                            </Col>
                        </Row>

                        {/* Chi tiết phần mềm */}
                        <Row style={{ marginTop: 48 }}>
                            <Col lg={12}>
                                <div className={cx('title-img')}>Chi tiết phần mềm</div>

                                <div className="table-responsive">
                                    <Table bordered>
                                        <thead>
                                            <tr className={cx('table-tr')}>
                                                <th className="text-center">STT</th>
                                                <th className="text-center">Mô-đun</th>
                                                <th className="text-center">Mô tả</th>
                                                <th className="text-center">Bao gồm</th>
                                                <th className="text-center">Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <SoftwareDetails />
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* Modun nâng cao */}
                    <div className={cx('shadow')}>
                        <div className={cx('title-img')}>Mô-đun nâng cao</div>
                        <Row>
                            <Col lg={2}>
                                <CustomCard
                                    to="/"
                                    price="2,000,000 VND"
                                    title="Cổng thanh toán PayPal"
                                    image="https://nencer.com/storage/userfiles/images/products/paypal.jpg"
                                />
                            </Col>
                            <Col lg={2}>
                                <CustomCard
                                    to="/"
                                    price="2,000,000 VND"
                                    title="Cổng thanh toán OnePay"
                                    image="https://nencer.com/storage/userfiles/images/products/onepay.jpg"
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SourceDetail;
