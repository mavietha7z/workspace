import routes from './routes';
import { faCreditCard, faGauge, faChartColumn, faCubes, faGears } from '@fortawesome/free-solid-svg-icons';

const { home, softcard, statistic, chargings, dailystat, tools, partners, settings } = routes;

const sidebar = [
    {
        title: 'Bảng quản trị',
        path: home,
        icon: faGauge,
        sub: null,
    },
    {
        title: 'Mã thẻ cào',
        path: null,
        icon: faCreditCard,
        sub: [
            {
                title: 'Sản phẩm',
                path: softcard,
            },
        ],
    },
    {
        title: 'Thống kê',
        path: null,
        icon: faChartColumn,
        sub: [
            {
                title: 'Thống kê đổi thẻ',
                path: statistic + chargings,
            },
            {
                title: 'Tổng hợp ngày',
                path: statistic + dailystat,
            },
        ],
    },
    {
        title: 'Mô-đun khác',
        path: null,
        icon: faCubes,
        sub: [
            {
                title: 'Đối tác kết nối',
                path: partners,
            },
            {
                title: 'Xóa dữ liệu',
                path: tools,
            },
        ],
    },
    {
        title: 'Cấu hình hệ thống',
        path: null,
        icon: faGears,
        sub: [
            {
                title: 'Cài đặt',
                path: settings,
            },
        ],
    },
];

export default sidebar;
