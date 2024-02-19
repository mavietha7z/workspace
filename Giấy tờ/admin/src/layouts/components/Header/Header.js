import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import './Header.css';
import config from '~/configs';
import { closeSidebar, openSidebar } from '~/redux/reducer/module';

const { home } = config.routes;

function Header() {
    const dispatch = useDispatch();
    const sidebar = useSelector((state) => state.module.sidebar);

    const handleToggleSidebar = () => {
        if (sidebar === 1) {
            dispatch(closeSidebar());
        } else {
            dispatch(openSidebar());
        }
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
                </div>

                <div className="header-logout" title="Đăng xuất">
                    <FontAwesomeIcon icon={faRightToBracket} />
                </div>
            </nav>
        </div>
    );
}

export default Header;
