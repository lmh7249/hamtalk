import styled from "styled-components";
import ProfileCat from "../../assets/images/profile-cat.jpg";
import TestImage from "../../assets/images/UserDefaultImage.png";
import BackGroundImageSample from "../../assets/images/background.jpg";
import ModalButton from "../common/ModalButton";
import ProfileMenuIcon from "../../assets/icons/profile-menu-icon.svg";

const StyledUserProfileDetail = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const StyledBackGroundImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const BackGroundImage = styled.img`
    height: 150px;
`;
const StyledUserProfileWrapper = styled.div`
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start; // 왼쪽 정렬
`;

const UserProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 5px solid #F5F6F7;
    object-fit: cover;
    background-color: #D6D2BF;
`;

const StyledUserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const StyledNickName = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin: 0;
`;

const StyledStateMessage = styled.p`
    font-size: 16px;
    color: #555;
    font-style: italic;
    margin: 0;
`;

const StyledEmail = styled.span`
    font-size: 14px;
    color: #777;
    margin: 0;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: flex-end;
    margin-top: 20px;
    margin-bottom: 20px;


`
const StyledAbsoluteUserPosition = styled.div`
    position: absolute;
    transform: translateY(-80px);
    left: 30px;
`

const UserNameAndEmailWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const ProfileMenuIconImage = styled.img`
    width: 20px;
    height: 20px;
`

const ProfileMenuIconButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`

const ProfileMenuIconWrapper = styled.div`
    display: flex;
    width: 99%;
    justify-content: flex-end;
    margin-top: 20px;
    
`

const UserProfileDetail = () => {
    return (
        // 전체 영역을 잡는 컴포넌트 -> 이름을 레이아웃으로 바꿔야하나?
        <StyledUserProfileDetail>
            <StyledBackGroundImageWrapper>
                <BackGroundImage src={BackGroundImageSample}/>
            </StyledBackGroundImageWrapper>
            <StyledUserProfileWrapper>
                <ProfileMenuIconWrapper>
                    <ProfileMenuIconButton>
                        <ProfileMenuIconImage src={ProfileMenuIcon}/>
                    </ProfileMenuIconButton>
                </ProfileMenuIconWrapper>
                <StyledAbsoluteUserPosition>
                    <UserProfileImage src={ProfileCat}/>
                    <StyledUserInfo>
                        <UserNameAndEmailWrapper>
                            <StyledNickName>임성규 </StyledNickName>
                            ｜
                            <StyledEmail> lss@naver.com</StyledEmail>
                        </UserNameAndEmailWrapper>
                        <StyledStateMessage>안녕하세요! 연락하지마세요!</StyledStateMessage>
                    </StyledUserInfo>
                    <ButtonWrapper>
                        <ModalButton backgroundColor={"#d3d3d3"} color={"black"} hoverColor={"#b0b0b0"}>
                            친구 추가
                        </ModalButton>
                        <ModalButton backgroundColor={"#2C2D31"} color={"white"} hoverColor={"#3A3B40"}>
                            채팅하기
                        </ModalButton>
                    </ButtonWrapper>
                </StyledAbsoluteUserPosition>
            </StyledUserProfileWrapper>
        </StyledUserProfileDetail>
    )
}

export default UserProfileDetail