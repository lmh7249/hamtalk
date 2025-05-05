import {customFetch} from "./customFetch";

export const getMyFriendListApi = async () => {
    const response = await customFetch("/api/friends", {
        method: "get",

    });
    if(!response.ok) {
        throw new Error("친구 목록 api 호출 실패")
    }
    return response.json();
}

export const addFriendApi = async (toUserId:number) => {
    const response = await customFetch(`/api/friends/${toUserId}`, {
        method:"post",

    });
    if(!response.ok) {
        throw new Error("친구 추가 api 호출 실패");
    }
    return response.json();
}

export const checkFriendshipApi = async (toUserId:number) => {
    const response = await customFetch(`/api/friends/${toUserId}`, {
        method: "get",
    });
    if(!response.ok) {
        throw new Error("친구 추가 api 호출 실패");
    }
    return response.json();
}