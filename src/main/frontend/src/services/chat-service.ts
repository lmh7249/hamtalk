import {findDirectChatRoomApi, getMyChatRoomListApi} from "../api/chat";

export const getMyChatRoomList = async () => {
    const response = getMyChatRoomListApi();
    return await response;

}

export const findDirectChatRoom = async (friendId: number) => {
    const response = await findDirectChatRoomApi(friendId);
    return response.data;
}