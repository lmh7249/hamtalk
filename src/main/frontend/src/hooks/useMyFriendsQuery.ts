import {useQuery} from "@tanstack/react-query";
import {getMyFriendList} from "../services/friend-service";

export const useMyFriendsQuery = (enabled: boolean) => {
    return useQuery({
        queryKey: ["myFriends"],
        queryFn: getMyFriendList,
        enabled,
    });
};