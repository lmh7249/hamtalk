import styled from "styled-components";
import UserDefaultImage from "../../assets/images/UserDefaultImage.png";

const StyledUserProfile = styled.div`
    height: 200px;
`
const StyledUserProfileDetail = styled.div`
    display: flex;
    gap: 10px;
`

const StyledImage = styled.img`
    object-fit: cover; /* 이미지 비율을 유지하면서 부모 요소에 맞게 조정 */
    border: 1px black solid;
    border-radius: 50%;
    max-width: 50px; /* 부모 요소의 너비를 초과하지 않도록 설정 */
    max-height: 50px; /* 부모 요소의 높이를 초과하지 않도록 설정 */
    padding: 3px;
`

const StyledUserInfo = styled.div`
`

const UserProfile = () => {
    return (
        <StyledUserProfile>
            <h4>
                내 프로필
            </h4>
            <StyledUserProfileDetail>
                <StyledImage src={UserDefaultImage} alt="유저이미지"/>
                <StyledUserInfo>
                    <div>임성규</div>
                    <div>좋은 하루 ㅎㅎ</div>
                    <div>lmh7249@naver.com</div>
                </StyledUserInfo>
            </StyledUserProfileDetail>
        </StyledUserProfile>
    )
}

export default UserProfile