import { useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import publicRoutes from '~/routes';
import DefaultLayout from './layouts/DefaultLayout';
import { getCategories } from './services/categories';
import { setCategories } from './redux/reducer/module';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            const result = await getCategories();

            if (result.code === 200) {
                dispatch(setCategories(result.data));
            }
        };
        fetch();
    }, []);

    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Layout: React.ElementType = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    const Page = route.component;

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
