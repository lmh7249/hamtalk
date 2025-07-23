import {customFetch} from "./customFetch";

export const getMyChatRoomListApi = async () => {
    const response = await customFetch("/api/chat-rooms", {
        method: "get",
    });
    if (!response.ok) {
        throw new Error("채팅방 목록 api 호출 실패")
    }
    return response.json();
}

export const findDirectChatRoomApi = async (friendId: number) => {
    const response = await customFetch(`/api/chat-rooms/direct/${friendId}`, {
        method: "get",

    });
    if (!response.ok) {
        throw new Error("1:1 채팅방 불러오기 api 호출 실패");
    }
    return response.json();
}

// 채팅방 id 별, 메세지 조회

export const getChatMessageListApi = async (chatRoomId: number) => {
    const response = await customFetch(`/api/chat/rooms/${chatRoomId}`, {
        method: "get",

    });
    if (!response.ok) {
        throw new Error("채팅방 메세지 리스트 조회 실패");
    }
    return response.json();
}

export const createChatRoomApi = async (friendId: number[]) => {
    const response = await customFetch("/api/chat-rooms", {
        method: "post",
        body: JSON.stringify({
            userIds: friendId // friendId를 배열로 감싸서 전송
        })
    });
    if (!response.ok) {
        throw new Error(`채팅방 생성 실패: ${response.status}`);
    }
    return await response.json();
};

// 채팅방 입장 시간을 저장하는 api
export const updateLastReadAtApi = async (chatRoomId: number) => {
    const response = await customFetch(`/api/chat-rooms/enter/${chatRoomId}`, {
        method: "post",
    });
    if (!response.ok) {
        throw new Error(`채팅방 입장 시간 기록 실패: ${response.status}`);
    }
}

export const getUnreadMessageCountApi = async () => {
    const response = await customFetch(`/api/chat/rooms/unread-counts`, {
        method: "get",
    })
    if (!response.ok) {
        const errorData = await response.json(); // body에 errorMessage 들어있음
        throw new Error(errorData.errorMessage || "서버 오류가 발생했어요.");
    }
    return await response.json();
}


export const getOnlineParticipantsApi = async (chatRoomId: number) => {
    const response = await customFetch(`/api/chat-rooms/${chatRoomId}/participants`, {
        method: "get",
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || "서버 오류가 발생했어요.");
    }
    return await response.json();
}


export const getLastReadAtListApi = async (chatRoomId: number) => {
    const response = await customFetch(`/api/chat-rooms/${chatRoomId}/last-read`, {
        method: "get",
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || "서버 오류가 발생했어요.");
    }
    return await response.json();
}

export const verifyChatRoomApi = async (userIds: number[]) => {
    const response = await customFetch(`/api/chat-rooms/verify`, {
        method: "post",
        body: JSON.stringify({
            userIds: userIds // friendId를 배열로 감싸서 전송
        })
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || "서버 오류가 발생했어요.");
    }
    return await response.json();
}

export const leaveChatRoomApi = async (chatRoomId: number) => {
    const response = await customFetch(`/api/chat-rooms/${chatRoomId}/participants/me`, {
        method: "delete",
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || "서버 오류가 발생했어요.")
    }
    return await response.json();
}

export const getChatRoomDetailApi = async (chatRoomId: number) => {
    const response = await customFetch(`/api/chat-rooms/${chatRoomId}`, {
        method: "get"
    })

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || "서버 오류가 발생했어요.");
    }
    return await response.json();
}