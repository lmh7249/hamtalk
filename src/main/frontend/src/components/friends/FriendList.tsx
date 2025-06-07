import styled from "styled-components";
import FriendItem from "../chat/FriendItem";
import React from "react";
import {Friend} from "../chat/ContentList";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useMyFriendsQuery} from "../../hooks/useMyFriendsQuery";

const StyledFriendListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

interface FriendListProps {
    friends: Friend[];
}

const FriendList = () => {
    const keyword = useSelector((state: RootState) => state.search.keyword);
    //TODO: 반복되는 selectedMenu, isFriendsTab를 커스텀 hook으로 빼자.
    const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);
    const isFriendsTab = selectedMenu.key === "friends";
    const {data: friends = [], isLoading, error} = useMyFriendsQuery(isFriendsTab);
    const filteredFriends = friends.filter(friend =>
        (friend.nickname || "").toLowerCase().includes(keyword.toLowerCase())
    );

    return (
        <>
            <div> 친구 {filteredFriends.length} </div>
            <StyledFriendListWrapper>
                {
                    filteredFriends.length > 0 ? (
                            filteredFriends.map((friend) => (
                                // TODO: key는 실제 Props로 전달 되지 않음. React에서 특별 취급. key는 내부적으로 사용하여 컴포넌트를 식별하고 렌더링 최적화
                                <FriendItem
                                    key={friend.toUserId}
                                    userId={friend.toUserId}
                                  />
                            ))
                        ) :
                        <p>친구 목록이 없어요 !</p>
                }
            </StyledFriendListWrapper>
        </>
    );
}

export default FriendList