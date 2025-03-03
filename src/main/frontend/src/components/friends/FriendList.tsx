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
            {/*/!*친구 목록 DB에서 꺼내와서 반복. *!/*/}
            {/*<FriendProfile nickName={"임성규"} statusMessage={"상메 ㅎㅎ"} email={"lsk@naa.com"} profileImageUrl = {""}/>*/}
            {/*<FriendProfile nickName={"홍길동"} statusMessage={"반갑습니다."} email={"hgd@naa.com"} profileImageUrl = {""}/>*/}
        </StyledFriendListWrapper>
    );
}

export default FriendList