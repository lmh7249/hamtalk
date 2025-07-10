import {
    createDirectChatRoomApi,
    findDirectChatRoomApi,
    getChatMessageListApi, getLastReadAtListApi,
    getMyChatRoomListApi, getOnlineParticipantsApi, getUnreadMessageCountApi,
    updateLastReadAtApi
} from "../api/chat";

export const getMyChatRoomList = async () => {
    const response = getMyChatRoomListApi();
    return await response;

}

export const findDirectChatRoom = async (friendId: number) => {
    const response = await findDirectChatRoomApi(friendId);
    return response.data;
}

// export const sendChatMessage = async (chatRoomId: number, message: string) => {
//     const response = await sendChatMessageApi(chatRoomId, message);
//     return response.data;
// }

export const getChatMessageList = async (chatRoomId: number) => {
    const response = await getChatMessageListApi(chatRoomId);
    return response.data;
}


export const createDirectChatRoom = async (friendId: number[]) =>{
    const response = await createDirectChatRoomApi(friendId);
    return response.data;
}

// TODO: 마지막 입퇴장 시간 기록(mongoDB)
export const updateLastReadAt = async (chatRoomId: number) => {
    const response = await updateLastReadAtApi(chatRoomId);
}

export const getUnreadMessageCount = async () => {
    const response = await getUnreadMessageCountApi();
    if(response.status === "success" && response.data) {
        return response.data;
    }
    throw new Error(response.errorMessage || "");
}

export const getOnlineParticipants = async (chatRoomId: number) => {
    const response = await getOnlineParticipantsApi(chatRoomId);
    if(response.status === "success" && response.data) {
        return response.data;
    }
    throw new Error(response.errorMessage || "");
}

export const getLastReadAtList = async (chatRoomId: number) => {
    const response = await getLastReadAtListApi(chatRoomId);
    if(response.status === "success" && response.data) {
        return response.data;
    }
    throw new Error(response.errorMessage || "");
}