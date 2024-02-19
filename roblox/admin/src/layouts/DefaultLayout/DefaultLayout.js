import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

function DefaultLayout({ children }) {
    const { sidebar } = useSelector((state) => state.module);

    return (
        <Fragment>
            <Sidebar />
            <div className={`wrapper-container ${sidebar ? 'active' : ''}`}>
                <Header />
                <Fragment>{children}</Fragment>
                <Footer />
            </div>
        </Fragment>
    );
}

export default DefaultLayout;
