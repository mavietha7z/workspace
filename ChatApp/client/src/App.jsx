import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';

function App() {
    const { user } = useContext(AuthContext);

    return (
        <ChatContextProvider user={user}>
            <NavBar />
            <Container>
                <Routes>
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path="/" element={user ? <Chat /> : <Navigate to="/login" />} />
                    <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                    <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                </Routes>
            </Container>
        </ChatContextProvider>
    );
}

export default App;
