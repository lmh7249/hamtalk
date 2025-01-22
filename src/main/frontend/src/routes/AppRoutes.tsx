import {Routes, Route} from 'react-router-dom';
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import React from "react";
import ChatMainPage from "../pages/ChatMainPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}>
                <Route path={":step"} element={<SignupPage/>}/>
            </Route>
            {/* 채팅 관련 라우트 */}
            <Route path="/chat" element={<ChatMainPage/>}>
                {/*<ProtectedRoute><ChatLayout /></ProtectedRoute>* 원래 위에는 이거/}
                {/*<Route index element={<ChatMainPage />} />  // 사용자의 메인 채팅 대시보드*/}
                {/*<Route path="rooms" element={<ChatRoomList />} />  // 채팅방 목록*/}
                {/*<Route path="rooms/:roomId" element={<ChatRoom />} />  // 특정 채팅방*/}
                {/*<Route path="friends" element={<FriendList />} />  // 친구 목록*/}
            </Route>
        </Routes>
    )
}

export default AppRoutes