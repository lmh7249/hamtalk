import React, { useState, useCallback } from "react";
import styled from "styled-components";
import BaseModal from "../common/BaseModal";
import ModalButton from "../common/ModalButton";
import { getUserProfile } from "../../services/user-service";
import { isValidEmail } from "../../utils/signupValidation";
import toast from "react-hot-toast";
import {addFriend} from "../../services/friend-service";

const Title = styled.h3`
    margin-top: 0;
`;

const SearchOptionWrapper = styled.div`
    border-bottom: 1px solid rgb(220, 220, 220);
`;

const SearchOptionText = styled.span`
    display: inline-block;
    font-weight: bold;
    border-bottom: 1px solid rgb(0, 0, 0);
`;

const SearchInput = styled.input`
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 1px solid rgb(0, 0, 0);
    margin-top: 10px;
    padding: 0;
    font-size: 16px;
    outline: none;
`;

const StyledFindUserProfile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const StyledProfileImage = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 50%;
`;

const StyledUserNickName = styled.p`
    margin: 10px;
    font-weight: bold;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    justify-content: flex-end;
    margin-top: 20px;
`;

interface UserProfileDataProps {
    id: number;
    nickname: string;
    profile_image_url: string;
}

interface UserProfileProps {
    userProfileData: UserProfileDataProps;
    handleAddFriend: (toUserId: number) => Promise<void>;
}

const UserProfile: React.FC<UserProfileProps> = ({ userProfileData, handleAddFriend }) => {
    return (
        <>
            <StyledProfileImage src={userProfileData.profile_image_url} alt="유저 프로필 사진" />
            <StyledUserNickName>{userProfileData.nickname}</StyledUserNickName>
            <ButtonWrapper>
                <ModalButton backgroundColor={"#d3d3d3"} hoverColor={"#b0b0b0"} color={"black"}>
                    프로필 보기
                </ModalButton>
                <ModalButton
                    backgroundColor={"#2C2D31"}
                    hoverColor={"#3A3B40"}
                    color={"white"}
                    onClick={() => handleAddFriend(userProfileData.id)}
                >
                    친구 추가
                </ModalButton>
            </ButtonWrapper>
        </>
    );
};

const StyledSearchFailText = styled.p`
    font-size: 15px;
    font-weight: bold;
    color: #e30000;
    text-align: center;
    margin-top: 50px;
    white-space: pre-line;
    line-height: 2.5;
`;

type SearchResultStateProps = "INIT" | "INVALID_EMAIL" | "NOT_FOUND" | "FOUND";

interface SearchResultProps {
    searchResultState: SearchResultStateProps;
    userProfileData: UserProfileDataProps | null;
    handleAddFriend: (toUserId: number) => Promise<void>;
}

const SearchResult: React.FC<SearchResultProps> = ({ searchResultState, userProfileData, handleAddFriend }) => {
    return (
        <>
            {searchResultState === "INIT" && null}
            {searchResultState === "INVALID_EMAIL" && <StyledSearchFailText>유효한 이메일을 입력해주세요.</StyledSearchFailText>}
            {searchResultState === "NOT_FOUND" && (
                <StyledSearchFailText>
                    해당 유저를 찾을 수 없습니다.{"\n"}
                    이메일을 다시 확인해주세요.
                </StyledSearchFailText>
            )}
            {searchResultState === "FOUND" && userProfileData && (
                <StyledFindUserProfile>
                    <UserProfile userProfileData={userProfileData} handleAddFriend={handleAddFriend} />
                </StyledFindUserProfile>
            )}
        </>
    );
};

interface FriendAddModalProps {
    modalClose: () => void;
}

const FriendAddModal: React.FC<FriendAddModalProps> = ({ modalClose }) => {
    const [email, setEmail] = useState<string>("");
    const [searchResultState, setSearchResultState] = useState<SearchResultStateProps>("INIT");
    const [userProfileData, setUserProfileData] = useState<UserProfileDataProps | null>(null);

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (!isValidEmail(email).isValid) {
                setSearchResultState("INVALID_EMAIL");
                return;
            }
            try {
                const userProfile = await getUserProfile(email);
                if (userProfile.data) {
                    setSearchResultState("FOUND");
                    setUserProfileData(userProfile.data);
                } else {
                    setSearchResultState("NOT_FOUND");
                }
            } catch (error) {
                console.error("유저 검색 실패:", error);
                setSearchResultState("NOT_FOUND");
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleAddFriend = useCallback(async (toUserId: number) => {
        try {
            let message = await addFriend(toUserId);
            toast.success(message.data);
            modalClose();
        } catch (error) {
            toast.error("친구 추가에 실패했습니다.");
            console.error("친구 추가 실패:", error);
        }
    }, [modalClose]);

    return (
        <BaseModal width="350px" height="350px" modalClose={modalClose}>
            <Title>친구 추가</Title>
            <SearchOptionWrapper>
                <SearchOptionText>이메일로 추가</SearchOptionText>
            </SearchOptionWrapper>
            <SearchInput
                type="email"
                placeholder="이메일이 정확히 일치해야 검색 가능합니다."
                onChange={handleChange}
                onKeyUp={handleKeyPress}
            />
            <SearchResult searchResultState={searchResultState} userProfileData={userProfileData} handleAddFriend={handleAddFriend} />
        </BaseModal>
    );
};

export default FriendAddModal;
