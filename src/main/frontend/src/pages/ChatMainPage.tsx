import {ChatPageLayout} from "../styles/layouts/ChatPageLayout";
import ChatMainContainer from "../containers/ChatMainContainer";
import {useEffect} from "react";
import {connectWebSocket, disconnectWebSocket} from "../utils/websocketUtil";

const ChatMainPage = () => {
    const webSocketConnectUrl = process.env.REACT_APP_WS_URL;
    const accessToken = localStorage.getItem("accessToken");

    // 로그인 성공 시, 웹소켓 최초 연결
    useEffect(() => {
        if (webSocketConnectUrl && accessToken) {
            connectWebSocket(webSocketConnectUrl, accessToken);
        }

        // 컴포넌트 언마운트 시 연결 해제
        return () => {
            disconnectWebSocket();
        }

    }, []);

    return (
        <ChatPageLayout>
            <ChatMainContainer/>
        </ChatPageLayout>
    )
}

export default ChatMainPage