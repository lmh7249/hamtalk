import styled from "styled-components";


// status = "아직 답변 못한 상태" | 입력중인 상태 | 입력한 상태
// {status}
// if(status === 'pending') {
//     return '#E3E2E7';
// } else if(status === 'in-progress') {
//     return '#ff527a'
// } else if(status === 'done') {
//     return '#ffb6c1'
// }



const Bar = styled.div`
    height: 8px;
    width: 120px;
    border-radius: 16px;
    background-color: #ffb6c1;
    //#ffb6c1
    //#ff527a
`
export default Bar;