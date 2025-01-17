import styled from "styled-components";
import Bar from "./Bar";

const ProgressIndicatorWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
`
const PageCount = styled.div `
    margin-left: 8px;
    color: #636262;
    font-size: 16px;
    line-height: 19px;
    
    span {
        font-weight: bold;
        color: #121111;
    }
`

const ProgressIndicator = () => {
    return (
        // status ="done"
        // status ="in-progress"
        // status ="pending"
        <ProgressIndicatorWrapper>
            <Bar />
            <Bar />
            <Bar />
            <Bar/>
            <PageCount><span>2</span>/4</PageCount>
        </ProgressIndicatorWrapper>
    )
}


export default ProgressIndicator