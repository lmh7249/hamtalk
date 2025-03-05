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