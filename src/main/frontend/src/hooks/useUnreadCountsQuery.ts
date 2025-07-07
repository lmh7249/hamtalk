import {useQuery} from "@tanstack/react-query";
import {getUnreadMessageCount} from "../services/chat-service";

export interface UnreadCountType {
    chatRoomId: number;
    unreadCount: number;
}

//TODO: 아래 형식처럼 리액트 쿼리 반환타입 타입 지정 해주기.
export const useUnreadCountsQuery = () => {
    return useQuery<UnreadCountType[]>({
        queryKey: ['unreadCounts'],
        queryFn: getUnreadMessageCount
    });
};