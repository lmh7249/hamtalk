import {customFetch} from "./customFetch";
import {ApiResponse} from "../../types/api-response";
import {Friend} from "../components/chat/ContentList";

export const getMyFriendListApi = async (): Promise<ApiResponse<Friend[]>> => {
    const response = await customFetch("/api/friends", {
        method: "get",

    });
    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || "친구 목록 api 호출 실패")
    }
    return await response.json();
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