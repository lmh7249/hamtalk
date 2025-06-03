import {addFriendApi, checkFriendshipApi, getMyFriendListApi} from "../api/friend";
import {getFilteredFriendListProps} from "../containers/ChatMainContainer";
import {Friend} from "../components/chat/ContentList";

export const getMyFriendList = async (): Promise<Friend[]> => {
    const response = await getMyFriendListApi();
    
    if(response.status === "success" && response.data) {
        return response.data;
    }
    throw new Error(response.errorMessage || "친구 리스트 불러오기 실패");
}

export const addFriend = async (toUserId: number) => {
    return await addFriendApi(toUserId);
}

export const checkFriendship = async (toUserId: number) => {
    return await checkFriendshipApi(toUserId);
}

// export const getFilteredFriendList = async () => {
//     const response = await getMyFriendListApi();
//     return response.data.map(({toUserId, nickname, email, profileImageUrl}: getFilteredFriendListProps) => ({
//         toUserId,
//         nickname,
//         email,
//         profileImageUrl
//     }));
// }

