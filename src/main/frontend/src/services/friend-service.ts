import {addFriendApi, checkFriendshipApi, getMyFriendListApi} from "../api/friend";
import {getFilteredFriendListProps} from "../containers/ChatMainContainer";

export const getMyFriendList = async () => {
    return await getMyFriendListApi();
}

export const addFriend = async (toUserId: number) => {
    return await addFriendApi(toUserId);
}

export const checkFriendship = async (toUserId: number) => {
    return await checkFriendshipApi(toUserId);
}

export const getFilteredFriendList = async () => {
    const response = await getMyFriendListApi();
    return response.data.map(({toUserId, nickname, email, profileImageUrl}: getFilteredFriendListProps) => ({
        toUserId,
        nickname,
        email,
        profileImageUrl
    }));
}

