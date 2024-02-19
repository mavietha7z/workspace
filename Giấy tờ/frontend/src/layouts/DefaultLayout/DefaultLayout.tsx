import { Fragment, ReactNode } from 'react';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';

interface IProps {
    children: ReactNode;
}

function DefaultLayout({ children }: IProps) {
    return (
        <Fragment>
            <Header />
            {children}
            <Footer />
        </Fragment>
    );
}

export default DefaultLayout;
