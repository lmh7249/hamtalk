import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import React from "react";
import ChatMainPage from "../pages/ChatMainPage";
import SignupSuccessPage from "../pages/SignupSuccessPage";
import PrivateRoute from "../auth/PrivateRoute";
import {Toaster} from "react-hot-toast";

const AppRoutes = () => {
   // console.log("API URL: ", process.env.REACT_APP_API_URL);  // 환경 변수 로그 출력
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

                {/* 이외에 모든 경로 이동 시, 로그인 페이지로 이동 */}
                {/*TODO:  replace 옵션  브라우저 히스토리에 남지 않아서 뒤로 가기 했을 때 이상한 동작을 방지 */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </>
    )
}

export default AppRoutes