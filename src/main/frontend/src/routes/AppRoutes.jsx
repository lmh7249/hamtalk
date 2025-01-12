import {Routes, Route} from 'react-router-dom';
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import React from "react";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
        </Routes>
    )
}

export default AppRoutes