import LoginContainer from "../containers/LoginContainer";
import {AuthPageLayouts} from "../styles/layouts/PageLayouts";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {logout} from "../store/userSlice";
import {resetChatState} from "../store/chatRoomsSlice";
import {resetChatActivity} from "../store/chatActivitySlice";
import {closeDetail} from "../store/contentDetailSlice";

const LoginPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("LoginPage가 로드. 이전 세션의 Redux 상태를 모두 초기화");
        // handleLogout 함수에서 옮겨온 '뒷정리' 작업들
        dispatch(logout());             // userSlice 초기화 (isLoggingOut 깃발도 여기서 내려감)
        dispatch(resetChatState());     // chatRoomsSlice 초기화
        dispatch(resetChatActivity());  // chatActivitySlice 초기화
        dispatch(closeDetail());        // contentDetailSlice 초기화
    }, [dispatch]);
    return (
        <AuthPageLayouts>
            <LoginContainer/>
        </AuthPageLayouts>
    )
}

export default LoginPage