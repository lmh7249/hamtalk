export const getMyFriendListApi = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch("/api/friends", {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });
    if(!response.ok) {
        throw new Error("친구 목록 api 호출 실패")
    }
    return response.json();
}

export const addFriendApi = async (toUserId:number) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`api/friends/${toUserId}`, {
        method:"post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });
    if(!response.ok) {
        throw new Error("친구 추가 api 호출 실패");
    }
    return response.json();
}

export const checkFriendshipApi = async (toUserId:number) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`api/friends/${toUserId}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });
    if(!response.ok) {
        throw new Error("친구 추가 api 호출 실패");
    }
    return response.json();
}