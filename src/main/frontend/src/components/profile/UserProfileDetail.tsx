import styled from "styled-components";
import ProfileCat from "../../assets/images/profile-cat.jpg";
import TestImage from "../../assets/images/img.png";
import BackGroundImageSample from "../../assets/images/background.jpg";
import ModalButton from "../common/ModalButton";
import ProfileMenuIcon from "../../assets/icons/profile-menu-icon.svg";
import React, {useEffect, useRef, useState} from "react";
import {getUserProfileById, updateUserProfileImage, updateUserStatusMessage} from "../../services/user-service";
import {addFriend, checkFriendship} from "../../services/friend-service";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {FaCamera} from 'react-icons/fa';
import {FiEdit} from "react-icons/fi";
import {updateProfileImageUrl, updateStatusMessage} from "../../store/userSlice";
import {useAddFriendMutation} from "../../hooks/useAddFriendMutation";

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
    margin-top: 30px;

`;

const StyledNickName = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin: 0;
`;

const StyledStatusMessage = styled.p`
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
`;
const StyledAbsoluteUserPosition = styled.div`
    position: absolute;
    transform: translateY(-80px);
    left: 30px;
`;

const UserNameAndEmailWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const ProfileMenuIconImage = styled.img`
    width: 20px;
    height: 20px;
`;

const ProfileMenuIconButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const ProfileMenuIconWrapper = styled.div`
    display: flex;
    width: 99%;
    justify-content: flex-end;
    margin-top: 20px;
`;

const ProfileImageWrapper = styled.div`
    position: relative;
    width: 150px;
    height: 150px;
`;

interface ProfileImageEditButtonProps {
    onClick: () => void;
}


const InputWrapper = styled.div`
    position: relative;
    width: 300px;
`;

const StyledInput = styled.input`
    padding: 8px 50px 8px 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    width: 100%;
    box-sizing: border-box;

    &:focus {
        border-color: #aaa;
    }
`;

const StatusFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 5px;
`;

const CharCount = styled.span`
    font-size: 12px;
    color: #888;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
`;

const SaveButton = styled.button`
    background-color: #FFCE00;
    border: none;
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 14px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;

    &:hover {
        background-color: #e6ba00;
    }
`;

const CancelButton = styled.button`
    background-color: #f4f4f4;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 14px;
    cursor: pointer;
    font-weight: 600;
    color: #555;
    transition: background-color 0.2s;

    &:hover {
        background-color: #eaeaea;
    }
`;

const EditingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const ProfileImageEditButton = ({onClick}: ProfileImageEditButtonProps) => {
    return (
        <button style={{
            position: "absolute",
            bottom: "3px",
            right: "1px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "50%",
            padding: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
                onClick={onClick}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#f0f0f0";
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                }}
        >
            <FaCamera size={20} color="#333"/>
        </button>
    );
};

const StatusMessageWrapper = styled.div`
    display: flex;
    gap: 6px; // 버튼과 메시지 사이 여백
`;

interface ProfileStatusEditButtonProps {
    onClick: () => void;

}

const ProfileStatusEditButton = ({onClick}: ProfileImageEditButtonProps) => {
    return (
        <button style={{
            backgroundColor: "white",
            border: "none",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            cursor: "pointer",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            padding: 0,
            transition: "background-color 0.2s ease-in-out",
        }}
                onClick={onClick}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#f0f0f0";
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                }}
        >
            <FiEdit size={18} color="#333"/>
        </button>
    );
};


interface searchUserProfileData {
    id: number;
    email: string;
    profileImageUrl: string;
    nickname: string;
    statusMessage: string;
}

const UserProfileDetail = () => {
    const [searchUserProfile, setSearchUserProfile] = useState<searchUserProfileData>();
    const [isFriend, setIsFriend] = useState<boolean>(false);
    const detailContent = useSelector((state: RootState) => state.detailContent);
    const searchUserProfileId = detailContent.type === 'userProfile' ? detailContent.userId : undefined;
    const loginUserId = useSelector((state: RootState) => state.user.id);
    const isMyUserId: boolean = searchUserProfileId === loginUserId;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const myProfile = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [statusMessageInputValue, setStatusMessageInputValue] = useState<string>(myProfile.statusMessage || "");
    const maxLength = 25;
    const {mutate: addFriendMutate} = useAddFriendMutation();

    const handleClickEditImage = () => {
        fileInputRef.current?.click();
    }


    useEffect(() => {
        if(searchUserProfileId === undefined) return;

        if (searchUserProfileId > 0) {
            console.log(`searchUserProfileId: ${searchUserProfileId}`);
            // api 호출 함수 설정하기.
            const fetchUserProfile = async () => {
                const profileData = await getUserProfileById(searchUserProfileId);
                setSearchUserProfile(profileData);
                const isFriend = await checkFriendship(searchUserProfileId);
                setIsFriend(isFriend.data);
            }
            //TODO: 추후, Promise.All 학습 후, 적용해보기.
            fetchUserProfile();
            console.log("검색한 유저의 프로필 데이터: ", searchUserProfile);
        }
    }, [searchUserProfileId]);

    useEffect(() => {
        setStatusMessageInputValue(myProfile.statusMessage || "");
    }, [myProfile.statusMessage]);

    const handleAddFriend = async (toUserId: number | undefined) => {
        if (toUserId === undefined) {
            toast.error("유효하지 않은 사용자입니다.");
            return;
        }
        addFriendMutate(toUserId, {
            onSuccess: () => {
                setIsFriend(true);
            }
        });
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const newImageUrl = await updateUserProfileImage(file);
            dispatch(updateProfileImageUrl({profileImageUrl: newImageUrl}));
            console.log(myProfile.profileImageUrl);
            toast.success("프로필 이미지가 변경되었어요!");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("알 수 없는 오류가 발생했어요.");
            }
        }
    }

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleCancelClick = () => {
        setIsEditing(false);
        setStatusMessageInputValue(myProfile.statusMessage || "");
    };

    const handleSaveClick = async () => {
        if (statusMessageInputValue.length > 25) {
            alert("상태메세지는 최대 25자까지 가능합니다.");
            return;
        }

        try {
            const newStatusMessage = await updateUserStatusMessage(statusMessageInputValue);
            console.log(newStatusMessage);
            dispatch(updateStatusMessage({statusMessage: newStatusMessage}));
            setIsEditing(false);
            toast.success("상태메세지가 변경되었어요!");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("알 수 없는 오류가 발생했어요.");
            }
        }
    };


    return (
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
                    <ProfileImageWrapper>
                        <UserProfileImage
                            src={isMyUserId ? myProfile.profileImageUrl ?? searchUserProfile?.profileImageUrl : searchUserProfile?.profileImageUrl}/>
                        {isMyUserId && <ProfileImageEditButton onClick={handleClickEditImage}/>}
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{display: "none"}}
                            onChange={handleImageChange}
                        />
                    </ProfileImageWrapper>
                    <StyledUserInfo>
                        <UserNameAndEmailWrapper>
                            <StyledNickName>{isMyUserId ? myProfile.nickname : searchUserProfile?.nickname} </StyledNickName>
                            ｜
                            <StyledEmail>{isMyUserId ? myProfile.email : searchUserProfile?.email}</StyledEmail>
                        </UserNameAndEmailWrapper>
                        <StatusMessageWrapper>
                            {isEditing ? (
                                <EditingWrapper>
                                    <InputWrapper>
                                        <StyledInput
                                            type="text"
                                            value={statusMessageInputValue}
                                            onChange={(e) => setStatusMessageInputValue(e.target.value)}
                                            maxLength={maxLength}
                                        />
                                        <CharCount>{Math.min(statusMessageInputValue.length, maxLength)} / {maxLength}</CharCount>

                                    </InputWrapper>
                                    <StatusFooter>
                                        <SaveButton onClick={handleSaveClick}>저장</SaveButton>
                                        <CancelButton onClick={handleCancelClick}>취소</CancelButton>
                                    </StatusFooter>
                                </EditingWrapper>
                            ) : (
                                <>
                                    <StyledStatusMessage>{isMyUserId ? (myProfile.statusMessage || "상태메세지를 입력해보세요!")
                                        : searchUserProfile?.statusMessage}</StyledStatusMessage>
                                    {isMyUserId && <ProfileStatusEditButton onClick={handleEditClick}/>}
                                </>
                            )}
                        </StatusMessageWrapper>
                    </StyledUserInfo>
                    <ButtonWrapper>
                        {(!isFriend && !isMyUserId) &&
                            <ModalButton backgroundColor={"#d3d3d3"} color={"black"} hoverColor={"#b0b0b0"}
                                         onClick={() => handleAddFriend(searchUserProfile?.id)}>
                                친구 추가
                            </ModalButton>}
                        {!isMyUserId && <ModalButton backgroundColor={"#2C2D31"} color={"white"} hoverColor={"#3A3B40"}>
                            채팅하기
                        </ModalButton>}
                    </ButtonWrapper>
                </StyledAbsoluteUserPosition>
            </StyledUserProfileWrapper>
        </StyledUserProfileDetail>
    )
}

export default UserProfileDetail