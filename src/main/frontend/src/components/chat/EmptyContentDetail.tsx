import styled from "styled-components";
import EmptyChattingRoomIcon from "../../assets/icons/empty-chatting-room.svg";

const StyledEmptyContentDetail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

const EmptyContentDetailDesc = styled.span`
    font-size: 18px;
    color: #555;
`


const EmptyContentDetail = () => {
    return (
        <StyledEmptyContentDetail>
            <img src={EmptyChattingRoomIcon} alt={"채팅을 시작해보세요."} width={200} height={200}/>
            <EmptyContentDetailDesc>채팅을 시작해보세요🐹</EmptyContentDetailDesc>
        </StyledEmptyContentDetail>
    )
}
export default EmptyContentDetail