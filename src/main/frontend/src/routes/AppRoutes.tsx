import {Routes, Route, useNavigate} from 'react-router-dom';
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import React from "react";
import ChatMainPage from "../pages/ChatMainPage";
import SignupSuccessPage from "../pages/SignupSuccessPage";
import PrivateRoute from "../auth/PrivateRoute";
import {Toaster} from "react-hot-toast";

const AppRoutes = () => {

    return (
        <>
            <Toaster position={"top-center"}/>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/signup-success" element={<SignupSuccessPage/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path="/chat" element={<ChatMainPage/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default AppRoutes