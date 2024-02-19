import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Badge, Button, Card, Col, Pagination, Row, Table } from 'react-bootstrap';

import { alertError } from '~/configs/alert';
import PageTitle from '~/components/PageTitle';
import config, { convertCurrency } from '~/configs';
import { logoutSuccess } from '~/redux/reducer/auth';
import CusPagination from '~/components/CusPagination';
import { getStatChargings, getTotalCharging } from '~/services/charging';

const { login } = config.routes;

const isObjectEmpty = (obj) => {
    return JSON.stringify(obj) === '{}';
};

function Chargings() {
    const [pages, setPages] = useState(1);
    const [stats, setStats] = useState([]);

    const [realValue, setRealValue] = useState(0);
    const [receiveValue, setReceiveValue] = useState(0);
    const [declaredValue, setDeclaredValue] = useState(0);

    const [code, setCode] = useState('');
    const [telco, setTelco] = useState('');
    const [serial, setSerial] = useState('');
    const [amount, setAmount] = useState('');
    const [partner, setPartner] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [statusCard, setStatusCard] = useState('all');

    const [searchParams, setSearchParams] = useSearchParams();

    const page = searchParams.get('page');
    const status = searchParams.get('status');
    const paramsCode = searchParams.get('code');
    const paramsTelco = searchParams.get('telco');
    const paramsSerial = searchParams.get('serial');
    const paramsAmount = searchParams.get('amount');
    const paramsPartner = searchParams.get('partner');
    const paramsDateEnd = searchParams.get('date_end');
    const paramsDateStart = searchParams.get('date_start');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Danh sách thẻ đã nạp - Quản trị website';

        const fetch = async () => {
            let objectSearch = {};
            objectSearch.page = page || 1;
            objectSearch.status = status;
            objectSearch.code = paramsCode;
            objectSearch.telco = paramsTelco;
            objectSearch.amount = paramsAmount;
            objectSearch.serial = paramsSerial;
            objectSearch.partner = paramsPartner;
            objectSearch.date_end = paramsDateEnd;
            objectSearch.date_start = paramsDateStart;

            const result = await getStatChargings(objectSearch);

            if (result.status === 401 || result.status === 403) {
                dispatch(logoutSuccess());
                navigate(login);
            } else if (result.status === 200) {
                setStats(result.data);
                setPages(result.pages);
            } else {
                alertError(result.error);
            }
        };
        fetch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, status]);

    useEffect(() => {
        const fetch = async () => {
            const result = await getTotalCharging();

            if (result.status === 401 || result.status === 403) {
                dispatch(logoutSuccess());
                navigate(login);
            } else if (result.status === 200) {
                setRealValue(result.realValue);
                setReceiveValue(result.receiveValue);
                setDeclaredValue(result.declaredValue);
            } else {
                alertError(result.error);
            }
        };
        fetch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = async () => {
        let objectSearch = {};

        if (telco) {
            objectSearch.telco = telco;
        }
        if (amount) {
            objectSearch.amount = amount;
        }
        if (statusCard || status) {
            objectSearch.status = statusCard;
        }
        if (partner) {
            objectSearch.partner = partner;
        }
        if (dateStart) {
            objectSearch.date_start = dateStart;
        }
        if (dateEnd) {
            objectSearch.date_end = dateEnd;
        }
        if (code) {
            objectSearch.code = code;
        }
        if (serial) {
            objectSearch.serial = serial;
        }
        if (isObjectEmpty(objectSearch)) {
            return alertError('Vui lòng chọn thông tin cần tìm');
        }

        objectSearch.page = page || 1;
        setSearchParams({ page: 1 });

        const result = await getStatChargings(objectSearch);

        if (result.status === 401 || result.status === 403) {
            dispatch(logoutSuccess());
            navigate(login);
        } else if (result.status === 200) {
            setStats(result.data);
            setPages(result.pages);
        } else {
            alertError(result.error, 'fail');
        }
    };

    // Pagination
    let paginationItems = [];
    for (let number = 1; number <= pages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={page ? number === Number(page) : number === 1}
                onClick={() => setSearchParams({ page: number, ...(status && { status }) })}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div className="wrapper">
            <div className="header">
                <Row>
                    <PageTitle name="Thống kê đổi thẻ" />
                </Row>
            </div>
            <div className="content">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <Card.Header>
                                <div className="float-right">
                                    <div className="input-group">
                                        <select
                                            className="form-control"
                                            value={telco}
                                            onChange={(e) => setTelco(e.target.value)}
                                        >
                                            <option value="">Loại thẻ</option>
                                            <option value="VIETTEL">VIETTEL</option>
                                            <option value="MOBIFONE">MOBIFONE</option>
                                            <option value="VINAPHONE">VINAPHONE</option>
                                            <option value="VIETNAMOBILE">VIETNAMOBILE</option>
                                            <option value="GARENA">GARENA</option>
                                            <option value="GATE">GATE</option>
                                            <option value="ZING">ZING</option>
                                            <option value="VCOIN">VCOIN</option>
                                        </select>
                                        <select
                                            className="form-control"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        >
                                            <option value="">Mệnh giá</option>
                                            <option value="10000">10.000đ</option>
                                            <option value="20000">20.000đ</option>
                                            <option value="30000">30.000đ</option>
                                            <option value="50000">50.000đ</option>
                                            <option value="100000">100.000đ</option>
                                            <option value="200000">200.000đ</option>
                                            <option value="300000">300.000đ</option>
                                            <option value="500000">500.000đ</option>
                                            <option value="1000000">1.000.000đ</option>
                                            <option value="2000000">2.000.000đ</option>
                                            <option value="3000000">3.000.000đ</option>
                                            <option value="5000000">5.000.000đ</option>
                                            <option value="10000000">10.000.000đ</option>
                                        </select>
                                        <select
                                            className="form-control"
                                            value={statusCard}
                                            onChange={(e) => setStatusCard(e.target.value)}
                                        >
                                            <option value="all">Tất cả</option>
                                            <option value="1">Thẻ đúng</option>
                                            <option value="2">Sai mệnh giá</option>
                                            <option value="3">Thẻ lỗi</option>
                                            <option value="99">Thẻ chờ</option>
                                            <option value="4">Bảo trì</option>
                                        </select>
                                        <select
                                            className="form-control"
                                            value={partner}
                                            onChange={(e) => setPartner(e.target.value)}
                                        >
                                            <option value="">Nhà cung cấp</option>
                                            <option value="Tsr">Tsr</option>
                                            <option value="Doithe">Doithe</option>
                                            <option value="Trumthe">Trumthe</option>
                                            <option value="Napthe1s">Napthe1s</option>
                                            <option value="Thenhanh">Thenhanh</option>
                                            <option value="Gachthe1s">Gachthe1s</option>
                                        </select>
                                        <input
                                            className="form-control"
                                            type="date"
                                            value={dateStart}
                                            onChange={(e) => setDateStart(e.target.value)}
                                        />
                                        <input
                                            className="form-control"
                                            type="date"
                                            value={dateEnd}
                                            onChange={(e) => setDateEnd(e.target.value)}
                                        />
                                        <input
                                            className="form-control"
                                            placeholder="Mã thẻ cào"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                        />
                                        <input
                                            className="form-control"
                                            placeholder="Serial thẻ cào"
                                            value={serial}
                                            onChange={(e) => setSerial(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <Button variant="warning" title="Tìm kiếm" onClick={handleSearch}>
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                                <span>Lọc</span>
                                            </Button>
                                            <Button
                                                variant="success"
                                                title="Xuất Excel"
                                                onClick={() => alertError('Chức năng đang được phát triển')}
                                            >
                                                <FontAwesomeIcon icon={faDownload} />
                                                <span>Excel</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div className="table-responsive">
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th>TT</th>
                                                <th>Thông tin</th>
                                                <th>Mạng</th>
                                                <th>NCC</th>
                                                <th>Khách hàng</th>
                                                <th>Khai báo</th>
                                                <th>Thực</th>
                                                <th>Nhận</th>
                                                <th>Gửi</th>
                                                <th>Duyệt</th>
                                                <th>Hình thức</th>
                                                <th>Mô tả</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {stats.length > 0 ? (
                                                stats.map((stat) => (
                                                    <tr key={stat._id}>
                                                        <td>
                                                            <Badge
                                                                bg={
                                                                    stat.status === 1
                                                                        ? 'success'
                                                                        : stat.status === 2
                                                                        ? 'info'
                                                                        : stat.status === 99
                                                                        ? 'warning'
                                                                        : 'danger'
                                                                }
                                                            >
                                                                {stat.message}
                                                            </Badge>
                                                        </td>
                                                        <td>
                                                            <span>M:{stat.code}</span>
                                                            <br />
                                                            <span>S:{stat.serial}</span>
                                                        </td>
                                                        <td>{stat.telco?.telco}</td>
                                                        <td>
                                                            {stat.partner ? (
                                                                <Fragment>{stat.partner.partner_name}</Fragment>
                                                            ) : (
                                                                <Fragment>Null</Fragment>
                                                            )}
                                                        </td>
                                                        <td>{stat.nickname ? stat.nickname : 'Null'}</td>
                                                        <td>{convertCurrency(stat.declared_value)}</td>
                                                        <td>{convertCurrency(stat.value)}</td>
                                                        <td>{convertCurrency(stat.amount)}</td>
                                                        <td>{moment(stat.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                                                        <td>{moment(stat.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                                                        <td>{stat.method}</td>
                                                        <td>{stat.description}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={12}>Không có dữ liệu</td>
                                                </tr>
                                            )}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colSpan={5} className="text-right">
                                                    Tổng số:
                                                </th>
                                                <th>{convertCurrency(declaredValue)}</th>
                                                <th>{convertCurrency(realValue)}</th>
                                                <th>{convertCurrency(receiveValue)}</th>
                                                <th colSpan={4} />
                                            </tr>
                                        </tfoot>
                                    </Table>
                                </div>
                            </Card.Body>
                            {pages > 1 && (
                                <Card.Footer>
                                    <Row>
                                        <Col xl={12}>
                                            <div className="float-right">
                                                <CusPagination
                                                    page={page}
                                                    pages={pages}
                                                    setSearchParams={setSearchParams}
                                                    params={status && { status }}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Chargings;
