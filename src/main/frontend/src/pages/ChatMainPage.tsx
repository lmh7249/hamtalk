import {ChatPageLayout} from "../styles/layouts/ChatPageLayout";
import ChatMainContainer from "../containers/ChatMainContainer";
import {useEffect} from "react";
import {getMyProfile} from "../services/user-service";

const ChatMainPage = () => {


    return (
        <ChatPageLayout>
            <ChatMainContainer/>
        </ChatPageLayout>
    )
}

export default ChatMainPage