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
                        // TODO: key는 실제 Props로 전달 되지 않음. React에서 특별 취급. key는 내부적으로 사용하여 컴포넌트를 식별하고 렌더링 최적화
                        <FriendProfile
                            key={friend.toUserId}
                            userId={friend.toUserId}
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