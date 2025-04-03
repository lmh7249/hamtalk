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

export const findDirectChatRoomApi = async (friendId: number) => {
    const accessToken = localStorage.getItem("accessToken");
    const response =await fetch(`/api/chat-rooms/direct/${friendId}`, {
        method: "get",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" :  `Bearer ${accessToken}`
        }
    });
    if(!response.ok) {
        throw new Error("1:1 채팅방 불러오기 api 호출 실패");
    }
    return response.json();
}

// 채팅방에 메세지 저장, 웹소켓 이전 rest api
// export const sendChatMessageApi = async (chatRoomId: number, message: string) => {
//     const accessToken = localStorage.getItem("accessToken");
//     const response = await fetch(`/api/chat/rooms/${chatRoomId}/messages`, {
//         method: "post",
//         headers: {
//             "Content-Type" : "application/json",
//             "Authorization" :  `Bearer ${accessToken}`
//         },
//         body: JSON.stringify({
//             message: message
//         })
//     });
//     if(!response.ok) {
//         throw new Error("채팅 메세지 저장 실패");
//     }
//     return response.json();
// }

// 채팅방 id 별, 메세지 조회

export const getChatMessageListApi = async (chatRoomId: number) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`/api/chat/rooms/${chatRoomId}`, {
        method: "get",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" :  `Bearer ${accessToken}`
        }
    });
    if(!response.ok) {
        throw new Error("채팅방 메세지 리스트 조회 실패");
    }
    return response.json();
}

// 신규 1:1 채팅방 생성  api
export const createDirectChatRoomApi = async (friendId: number) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch("api/chat-rooms", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            userIds: [friendId] // friendId를 배열로 감싸서 전송
        })
    });
    if (!response.ok) {
        throw new Error(`채팅방 생성 실패: ${response.status}`);
    }
    return await response.json();
};