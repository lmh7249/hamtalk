import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import AppRoutes from "./routes/AppRoutes";
import {Provider} from "react-redux";
import {store} from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode> = 이건 기존에 있던 태그(cra가 자동 생성해준 태그)
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

