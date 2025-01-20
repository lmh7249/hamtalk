import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import AppRoutes from "./routes/AppRoutes";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode> = 이건 기존에 있던 태그(cra가 자동 생성해준 태그)
    <React.StrictMode>
        <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
    </React.StrictMode>
);

