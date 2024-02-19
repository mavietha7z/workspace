import routes from './routes';
import { faGauge, faUsers, faWrench, faCubes, faGears } from '@fortawesome/free-solid-svg-icons';

const { home, users, history, seo, tools, category, settings, services } = routes;

const sidebar = [
    {
        title: 'Bảng quản trị',
        path: home,
        icon: faGauge,
        sub: null,
    },

    {
        title: 'Tài khoản',
        path: null,
        icon: faUsers,
        sub: [
            {
                title: 'Người dùng',
                path: users,
            },
            {
                title: 'Lịch sử đăng nhập',
                path: users + history,
            },
        ],
    },
    {
        title: 'Công cụ',
        path: null,
        icon: faWrench,
        sub: [
            {
                title: 'Seo page',
                path: seo,
            },
            {
                title: 'Xóa dữ liệu',
                path: tools,
            },
        ],
    },
    {
        title: 'Mô-đun khác',
        path: null,
        icon: faCubes,
        sub: [
            {
                title: 'Dịch vụ',
                path: services,
            },
            {
                title: 'Danh mục',
                path: category,
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
