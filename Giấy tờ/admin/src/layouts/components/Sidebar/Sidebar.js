import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import './Sidebar.css';
import config from '~/configs';
const { home } = config.routes;

function Sidebar() {
    const [openIndex, setOpenIndex] = useState(-1);
    const sidebar = useSelector((state) => state.module.sidebar);

    return (
        <div className={`sidebar ${sidebar === 1 && 'active'}`}>
            <Link to={home} className="sidebar-logo">
                <div className="logo"></div>
            </Link>

            <div className="sidebar-content">
                <div className="sidebar-over">
                    <ul className="sidebar-list">
                        {config.sidebar.map((sidebar, index) => (
                            <li key={index}>
                                {sidebar.sub ? (
                                    <div
                                        className={`sidebar-link ${openIndex === index && 'active'}`}
                                        onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                    >
                                        <FontAwesomeIcon icon={sidebar.icon} className="sidebar-icon" />

                                        <span>
                                            {sidebar.title}

                                            <FontAwesomeIcon icon={faChevronLeft} />
                                        </span>
                                    </div>
                                ) : (
                                    <Link
                                        className="sidebar-link"
                                        onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                        to={sidebar.path}
                                    >
                                        <FontAwesomeIcon icon={sidebar.icon} className="sidebar-icon" />
                                        <span>{sidebar.title}</span>
                                    </Link>
                                )}
                                {sidebar.sub && (
                                    <Collapse in={openIndex === index}>
                                        <ul>
                                            {sidebar.sub.map((child, index) => (
                                                <li key={index}>
                                                    <Link className="link-sub" to={child.path}>
                                                        <FontAwesomeIcon icon={faChevronRight} />

                                                        <span>{child.title}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </Collapse>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
