import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addFriend} from "../services/friend-service";
import toast from "react-hot-toast";


export const useAddFriendMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  // React Query에서 내부 캐시 상태를 조작할 수 있는 객체(QueryClient)를 리턴해주는 함수

    return useMutation({
      // mutationFn: 실제 API 호출 함수
      mutationFn: (toUserId: number) => addFriend(toUserId),
      // onSuccess: 성공했을 때 실행
      onSuccess: (response) => {
          toast.success(response.data);
          if(onSuccessCallback) onSuccessCallback();
          // 캐시 무효화
          queryClient.invalidateQueries({queryKey: ["myFriends"]});
          },
      // onError: 실패했을 때 실행
      onError: (error) => {
          toast.error("친구 추가에 실패했습니다.");
          console.error("친구 추가 실패:", error);
      },
  });
};