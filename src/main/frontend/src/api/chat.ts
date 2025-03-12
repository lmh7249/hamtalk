export const getMyChatRoomListApi = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch("/api/chat-rooms", {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });
    if(!response.ok) {
        throw new Error("채팅방 목록 api 호출 실패")
    }
    return response.json();

}