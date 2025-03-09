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
    //TODO: React Strict Mode는 개발 환경에서 렌더링 중인 컴포넌트를 더 자주 렌더링하여 잠재적인 문제를 찾는 데 도움을 주는 모드. 이 모드에서는 컴포넌트가 두 번 렌더링 됨.
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

