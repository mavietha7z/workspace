import './index.css';
import React from 'react';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </BrowserRouter>
);
