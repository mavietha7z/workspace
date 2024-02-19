import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { privateRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import { useSelector } from 'react-redux';
import Overlay from './components/Overlay';

function App() {
    const { sidebar } = useSelector((state) => state.module);

    return (
        <div className="App">
            {sidebar && <Overlay />}

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
