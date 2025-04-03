import styled from "styled-components";

const SettingList = () => {
    const ProfileButton = styled.button`
        background-color: #f5f5f5;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 8px;
        transition: background-color 0.2s ease-in-out;
        text-align: left;
        font-weight: bold;

        &:hover {
            background-color: #e0e0e0;
        }
    `;


    return (
        <ProfileButton>내 프로필 보기</ProfileButton>

    )
}

export default SettingList