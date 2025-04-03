import {createDirectChatRoomApi, findDirectChatRoomApi, getChatMessageListApi, getMyChatRoomListApi} from "../api/chat";

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


export const createDirectChatRoom = async (friendId: number) =>{
    const response = await createDirectChatRoomApi(friendId);
    return response.data;
}