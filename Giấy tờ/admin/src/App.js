import { useDispatch } from 'react-redux';
import { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import config from './configs';
import { privateRoutes } from './routes';
import { getCurrentUser } from './services/auth';
import DefaultLayout from './layouts/DefaultLayout';
import { logoutSuccess } from './redux/reducer/auth';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.performance) {
            if (performance.navigation.type === 1) {
                const fetchApi = async () => {
                    const result = await getCurrentUser();

                    if (result.code !== 200) {
                        dispatch(logoutSuccess());
                        window.location.href = config.routes.login;
                    }
                };
                fetchApi();
            }
        }
    }, [dispatch]);

    return (
        <div className="App">
            <Router>
                <Routes>
                    {privateRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

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
        </div>
    );
}

export default App;
