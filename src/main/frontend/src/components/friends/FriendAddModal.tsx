import styled from "styled-components";
import BaseModal from "../common/BaseModal";

const Title = styled.h3`
    margin-top: 0;

`
const SearchOptionWrapper = styled.div`
    border-bottom: 1px solid rgb(220, 220, 220);
`
const SearchOptionText = styled.span`
    display: inline-block;
    font-weight: bold;
    border-bottom: 1px solid rgb(0, 0, 0);
`

const SearchInput = styled.input`
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 1px solid rgb(0, 0, 0);
    margin-top: 10px;
    padding: 0;
    font-size: 16px;
    outline: none;
`


const FriendAddModal = () => {
    return (
        <BaseModal width="300px" height="400px">
            <Title>친구 추가</Title>
            <SearchOptionWrapper>
                <SearchOptionText>이메일로 추가</SearchOptionText>
            </SearchOptionWrapper>
            <SearchInput type="email" placeholder={"이메일이 정확히 일치해야 검색 가능합니다."}/>
        </BaseModal>
    )
}

export default FriendAddModal