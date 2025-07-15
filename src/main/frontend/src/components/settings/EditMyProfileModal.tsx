import BaseModal from "../common/BaseModal";
import styled from "styled-components";

import React, {useCallback, useRef, useState} from "react";

import {FaCamera} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import toast from "react-hot-toast";
import {updateUserProfile, updateUserProfileImage} from "../../services/user-service";
import {updateProfile} from "../../store/userSlice";
import {closeModal} from "../../store/modalSlice";


const Title = styled.h3`
    margin-top: 0;
`;

const UserProfileImage = styled.img`
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 5px solid #F5F6F7;
    object-fit: cover;
    background-color: #D6D2BF;
`;

const ProfileImageWrapper = styled.div`
    position: relative;
    width: 150px;
    height: 150px;
`;

interface ProfileImageEditButtonProps {
    onClick: () => void;
}

const ProfileImageContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;


const ProfileImageEditButton = ({onClick}: ProfileImageEditButtonProps) => {
    return (
        <button style={{
            position: "absolute",
            bottom: "15px",
            right: "20px",
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

const ProfileEditInputFields = styled.div`
    display: flex;


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


const SaveButton = styled.button`
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

const StatusFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
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
        border-color: black;
    }
`;

const InputWithCountWrapper = styled.div`
    position: relative;
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

const EditMyProfileModal = () => {
    const myProfile = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [nicknameInputValue, setNicknameInputValue] = useState<string>(myProfile.nickname || "");
    const [statusMessageInputValue, setStatusMessageInputValue] = useState<string>(myProfile.statusMessage || "");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    const [previewImageUrl, setPreviewImageUrl] = useState<string>(myProfile.profileImageUrl || "");
    const nicknameMaxLength = 20;
    const statusMaxLength = 25;

    const handleCloseModal = useCallback(() => {
        dispatch(closeModal());
    }, [dispatch]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImageFile(file); // 나중에 저장할 파일
            setPreviewImageUrl(URL.createObjectURL(file)); // 미리보기용 URL 생성
        }
    };

    const handleImageEditClick = () => {
        fileInputRef.current?.click(); // 숨겨진 input 열기
    };

    const handleSaveClick = async () => {
        // 1. 셋 중 모두 변경된게 없다면 리턴
        if (
            nicknameInputValue === (myProfile.nickname ?? "") &&
            statusMessageInputValue === (myProfile.statusMessage ?? "") &&
            !selectedImageFile
        ) {
            toast.error("변경된 정보가 없습니다.");
            return;
        }

        // 닉네임이 빈값일 경우 에러 처리 추가
        if (nicknameInputValue.trim() === "") {
            toast.error("닉네임은 빈 값일 수 없습니다.");
            return;
        }

        if (nicknameInputValue.length > nicknameMaxLength) {
            toast.error("닉네임은 최대 20자까지 가능합니다.");
            return;
        }
        if (statusMessageInputValue.length > statusMaxLength) {
            toast.error("상태메세지는 최대 25자까지 가능합니다.");
            return;
        }
        // 2. S3 이미지 저장
        let uploadedImageUrl = null;
        if (selectedImageFile) {
            uploadedImageUrl = await updateUserProfileImage(selectedImageFile);
        }

        // 3. 닉네임, 상태메세지, 반환된 url 업데이트 api 호출(변경된것만 전달)
        const updatePayload: any = {};
        if (nicknameInputValue !== myProfile.nickname) {
            updatePayload.nickname = nicknameInputValue;
        }
        if (statusMessageInputValue !== myProfile.statusMessage) {
            updatePayload.statusMessage = statusMessageInputValue;
        }
        if (uploadedImageUrl) {
            updatePayload.profileImageUrl = uploadedImageUrl;
        }

        // api 호출
        try {
            console.log('updatePayload:', updatePayload);
            const profileUpdatePayload = await updateUserProfile(updatePayload);
            // 4. dispatch로 전역변수에서 관리되는 로그인 유저의 데이터 변경해주기.
            dispatch(updateProfile(profileUpdatePayload));
            toast.success("프로필이 성공적으로 수정되었어요.");
            handleCloseModal();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("알 수 없는 오류가 발생했어요.");
            }
        }
    }

    return (
        <BaseModal width="350px" height="350px" modalClose={handleCloseModal}>
            <Title>내 프로필 편집</Title>
            <ProfileImageContainer>

                <ProfileImageWrapper>
                    <UserProfileImage src={previewImageUrl || "이미지가 없습니다."}/>
                    <ProfileImageEditButton onClick={handleImageEditClick}/>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{display: "none"}}
                        onChange={handleImageChange}
                    />
                </ProfileImageWrapper>
            </ProfileImageContainer>
            <ProfileEditInputFields>

            </ProfileEditInputFields>
            <InputWrapper>
                <InputWithCountWrapper>
                    <StyledInput
                        type="text"
                        placeholder={"닉네임"}
                        value={nicknameInputValue}
                        onChange={(e) => setNicknameInputValue(e.target.value)}
                        maxLength={nicknameMaxLength}
                    />
                    <CharCount>{Math.min(nicknameInputValue.length, nicknameMaxLength)} / {nicknameMaxLength}</CharCount>
                </InputWithCountWrapper>
                <InputWithCountWrapper>
                    <StyledInput
                        type="text"
                        placeholder={"상태메세지"}
                        value={statusMessageInputValue}
                        onChange={(e) => setStatusMessageInputValue(e.target.value)}
                        maxLength={statusMaxLength}
                    />
                    <CharCount>{Math.min(statusMessageInputValue.length, statusMaxLength)} / {statusMaxLength}</CharCount>
                </InputWithCountWrapper>
            </InputWrapper>

            <StatusFooter>
                <SaveButton onClick={handleSaveClick}>저장</SaveButton>
                <CancelButton onClick={handleCloseModal}>취소</CancelButton>
            </StatusFooter>
        </BaseModal>
    );
}

export default EditMyProfileModal;