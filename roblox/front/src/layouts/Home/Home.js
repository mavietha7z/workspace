import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '~/components/Footer/Footer';
import { getTelcos, postCard } from '~/services/card';
import { convertCurrency } from '~/configs';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const MySwal = withReactContent(Swal);

const cx = classNames.bind(styles);

function Home() {
    const [value, setValue] = useState([]);
    const [telcos, setTelcos] = useState([]);

    const [indexActive, setIndexActive] = useState('');
    const [activeValue, setActiveValue] = useState('');

    const [telco, setTelco] = useState('');
    const [amount, setAmount] = useState('');
    const [code, setCode] = useState('');
    const [serial, setSerial] = useState('');
    const [nickname, setNickname] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const result = await getTelcos();

            if (result?.status === 200) {
                setTelcos(result.data);
            }
        };
        fetch();
    }, []);

    const selectTelco = (telco) => {
        setIndexActive(telco._id);
        setValue(telco.value);
        setTelco(telco.telco);
    };

    const selectValue = (value, index) => {
        setActiveValue(index);
        setAmount(value.value);
    };

    const handlePostCard = async () => {
        if (!nickname) {
            return MySwal.fire('Thất bại', 'Vui lòng nhập ID hoặc Nickname', 'error');
        }
        if (nickname.length < 2 || nickname.length > 16) {
            return MySwal.fire('Thất bại', 'ID hoặc Nickname không hợp lệ', 'error');
        }
        if (!telco) {
            return MySwal.fire('Thất bại', 'Vui lòng chọn loại thẻ', 'error');
        }
        if (!amount) {
            return MySwal.fire('Thất bại', 'Vui lòng chọn mệnh giá', 'error');
        }
        if (!serial) {
            return MySwal.fire('Thất bại', 'Vui lòng nhập serial thẻ cào', 'error');
        }
        if (!code) {
            return MySwal.fire('Thất bại', 'Vui lòng nhập mã thẻ cào', 'error');
        }

        setLoading(true);

        const data = {
            telco,
            amount,
            code,
            serial,
            nickname,
        };

        const result = await postCard(data);
        setLoading(false);

        if (result?.status === 99) {
            MySwal.fire(
                'CHỜ XỬ LÝ',
                `Thẻ ${telco} mệnh giá ${convertCurrency(amount)} đang được xử lý vui lòng chờ`,
                'warning'
            );
        } else if (result?.status === 1) {
            MySwal.fire('THÀNH CÔNG', `Nạp thẻ ${telco} mệnh giá ${convertCurrency(amount)} thành công`, 'success');
        } else if (result?.status === 2) {
            MySwal.fire(
                'THẤT BẠI',
                `Thẻ ${telco} mệnh giá ${convertCurrency(amount)} sai mệnh giá vui lòng nạp lại`,
                'error'
            );
        } else if (result?.status === 3) {
            MySwal.fire(
                'THẤT BẠI',
                `Thẻ ${telco} mệnh giá ${convertCurrency(amount)} thẻ lỗi vui lòng nạp lại`,
                'error'
            );
        } else if (result?.status === 4 || result?.status === 102) {
            MySwal.fire('THẤT BẠI', 'Máy chủ bảo trì vui lòng thử lại sau', 'error');
        } else if (result?.status === 400) {
            MySwal.fire('THẤT BẠI', 'Bạn đã bị chặn do SPAM thẻ lỗi', 'error');
        } else {
            MySwal.fire('THẤT BẠI', result.error, 'error');
        }
    };

    return (
        <Fragment>
            <header className={cx('header')}>
                <img src="https://pbs.twimg.com/media/CiHQcDUXAAAPUJn.png:large" alt="Banner" />
            </header>

            <main className={cx('wrapper')}>
                <div className={cx('doter')}>
                    <p>
                        Khuyến mãi <strong>50%</strong> giá trị khi nạp thẻ Roblox lần đầu ( Áp dụng đến hết hôm nay )
                    </p>
                </div>

                <h1 className={cx('title')}>Nạp Thẻ roblox</h1>

                <div className={cx('select')}>Tài khoản muốn nạp</div>
                <div className={cx('nickname')}>
                    <input
                        type="text"
                        className={cx('input')}
                        placeholder="TÊN NICK HOẶC ID TÀI KHOẢN NẠP"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>

                <div className={cx('select')}>Chọn loại thẻ</div>
                <div className={cx('telco')}>
                    {telcos.map((telco) => (
                        <div
                            className={indexActive === telco._id ? cx('telco-item', 'active') : cx('telco-item')}
                            key={telco._id}
                            onClick={() => selectTelco(telco)}
                        >
                            <div className={cx('telco-box')}>
                                <div className={cx('telco-title')}>{telco.telco}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={cx('select')}>Chọn mệnh giá</div>
                <div className={cx('telco')}>
                    {value.map((val, index) => (
                        <div
                            className={activeValue === index ? cx('telco-item', 'active') : cx('telco-item')}
                            key={index}
                            onClick={() => selectValue(val, index)}
                        >
                            <div className={cx('telco-box')}>
                                <div className={cx('telco-price')}>{convertCurrency(val.value)}</div>
                                <div className={cx('price-discount')}>
                                    <div className={cx('discount-value')}>
                                        <span>Nhận: {val.gift}</span>
                                        <img src="https://uudairobux.vn/images/da-quy.png" alt="Roblox" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={cx('note')}>Lưu ý: Chọn sai mệnh giá sẽ không nạp được và bị mất thẻ</div>

                <div className={cx('select')}>Nhập thông tin thẻ</div>
                <div className={cx('form')}>
                    <div className={cx('label')}>Serial thẻ:</div>
                    <input
                        type="text"
                        className={cx('input')}
                        placeholder="Vui lòng nhập serial thẻ"
                        value={serial}
                        onChange={(e) => setSerial(e.target.value)}
                    />

                    <div className={cx('label', 'label-up')}>Mã thẻ:</div>
                    <input
                        type="text"
                        className={cx('input')}
                        placeholder="Vui lòng nhập mã thẻ"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />

                    <div className={cx('post')}>
                        <button className={cx('post-btn')} onClick={handlePostCard}>
                            {loading ? <FontAwesomeIcon icon={faSpinner} /> : <Fragment> Nạp thẻ</Fragment>}
                        </button>
                    </div>
                </div>
                <div className={cx('note')}>
                    * Bằng cách nhấn <strong>" NẠP THẺ "</strong> đồng nghĩa bạn đã chấp nhận
                    <Link to="/"> Điều khoản & dịch vụ</Link> của chúng tôi
                </div>

                <div className={cx('guide')}>
                    <p>Để tiến hành nạp thẻ Roblox các bạn vui lòng thực hiện theo các bước dưới đây</p>
                    <ul>
                        <li>
                            <strong>Bước 1: </strong>Vui lòng chuẩn bị một thẻ cào hợp lệ và chưa từng sử dụng, các loại
                            thẻ được hệ thống chấp nhận là Viettel, Mobifone, Vinaphone, Garena, Zing, Gate. Nếu không
                            có các loại thẻ trên thì sẽ không thể tiến hành nạp Mini Coins Roblox được
                        </li>
                        <li>
                            <strong>Bước 2: </strong>Tiến hành nhập tên tài khoản cần nạp Mini Coins. Hãy nhập tên tài
                            khoản trong game của bạn hoặc ID cần nạp tiền
                        </li>
                        <li>
                            <strong>Bước 3: </strong>Thực hiện cào thẻ để biết được mã số nạp tiền dưới lớp tráng bạc,
                            nhập đầy đủ và chính xác thông tin như số serial và mã thẻ trên chiếc thẻ cào của bạn
                        </li>
                        <li>
                            <strong>Bước 4: </strong>Kiểm tra kỹ lại các thông tin vừa nhập như tài khoản, số serial và
                            mã thẻ. Nếu sai thì hãy sửa lại cho chính xác và cuối cùng là ấn NẠP THẺ. Chờ trong 5 giây
                            và hệ thống sẽ tự động nạp Mini Coins Roblox cho bạn. Sau khi nạp thành công vui lòng đăng
                            nhập vào game để kiểm tra xem đã nạp thẻ Roblox thành công hay chưa
                        </li>
                    </ul>
                </div>
            </main>

            <Footer />
        </Fragment>
    );
}

export default Home;
