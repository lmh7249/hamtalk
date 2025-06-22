import {useSelector} from "react-redux";
import {RootState} from "../store";
import {useUnreadCountsQuery} from "./useUnreadCountsQuery";
import {useMemo} from "react";


export const useUnreadTotal = () => {
    const currentChatRoomId = useSelector((state:RootState) => state.detailContent.chatRoomId);
    const {data: unreadCounts = []} = useUnreadCountsQuery();

    const totalUnreadCount = useMemo(() => {
        return unreadCounts.reduce((total, item) => {
            const count = item.chatRoomId === currentChatRoomId ? 0 : item.unreadCount;
            return total + count;
        }, 0);
    }, [unreadCounts, currentChatRoomId]);
    return totalUnreadCount;
}