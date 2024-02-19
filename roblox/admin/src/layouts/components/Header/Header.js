import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import './Header.css';
import config from '~/configs';
import { logoutUser } from '~/services/auth';
import { logoutSuccess } from '~/redux/reducer/auth';
import { closeSidebar, openSidebar } from '~/redux/reducer/module';

const { home, statistic, chargings, login } = config.routes;

function Header() {
    const { sidebar } = useSelector((state) => state.module);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleToggleSidebar = () => {
        if (sidebar) {
            dispatch(closeSidebar());
            document.body.classList.remove('open');
        } else {
            dispatch(openSidebar());
            document.body.classList.add('open');
        }
    };

    const handleLogout = async () => {
        await logoutUser();
        dispatch(logoutSuccess());
        navigate(login);
        window.location.reload();
    };

    return (
        <div className="wrapper-header">
            <nav className="header-nav">
                <div className="header-left">
                    <div className="header-icon" onClick={handleToggleSidebar}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    <div className="header-title">
                        <Link to={home}>Trang chủ</Link>
                    </div>
                    <div className="header-title">
                        <Link to={statistic + chargings}>Thanh toán</Link>
                    </div>
                </div>
                <div className="header-logout" title="Đăng xuất" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faRightToBracket} />
                </div>
            </nav>
        </div>
    );
}

export default Header;
