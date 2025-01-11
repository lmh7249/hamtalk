import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from "./pages/Login";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from "./pages/Signup";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>  이건 기존에 있던 태그(cra가 자동 생성해준 태그)
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

