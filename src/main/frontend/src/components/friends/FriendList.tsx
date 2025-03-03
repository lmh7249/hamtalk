import styled from "styled-components";
import FriendProfile from "../chat/FriendProfile";
import React from "react";
import {Friend} from "../chat/ContentList";

const StyledFriendListWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

interface FriendListProps {
    friends: Friend[];
}

const FriendList: React.FC<FriendListProps> = ({friends}) => {
    return (
        <StyledFriendListWrapper>
            {
                friends.length > 0 ? (
                    friends.map((friend) => (
                        <FriendProfile
                            key={friend.toUserId}
                            nickName={friend.nickname}
                            statusMessage={friend.statusMessage}
                            email={friend.email}
                            profileImageUrl={friend.profileImageUrl}/>
                    ))
                ):
                 <p>친구 목록이 없어요 !</p>
            }
        </StyledFriendListWrapper>
    );
}

export default FriendList