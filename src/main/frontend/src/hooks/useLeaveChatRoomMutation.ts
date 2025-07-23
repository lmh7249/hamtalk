import {useMutation, useQueryClient} from "@tanstack/react-query";
import {leaveChatRoom} from "../services/chat-service";
import toast from "react-hot-toast";

export const useLeaveChatRoomMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (chatRoomId: number) => leaveChatRoom(chatRoomId),
        onSuccess: (response) => {
            toast.success(response || "채팅방에서 나갔습니다.");
            // 추후 채팅방을 리액트 쿼리로 관리하기 위해서 미리 작성
            queryClient.invalidateQueries({queryKey: ['myChatRooms']});
        },
        onError: (error: Error) => {
            toast.error(error.message || "채팅방 나가기에 실패했습니다.");
        }
    });
}