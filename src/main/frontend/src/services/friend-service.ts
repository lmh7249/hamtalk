import {addFriendApi, checkFriendshipApi, getMyFriendListApi} from "../api/friend";

export const getMyFriendList = async () => {
    return await getMyFriendListApi();
}

export const addFriend = async (toUserId: number) => {
    return await addFriendApi(toUserId);
}

export const checkFriendship = async (toUserId: number) => {
    return await checkFriendshipApi(toUserId);
}