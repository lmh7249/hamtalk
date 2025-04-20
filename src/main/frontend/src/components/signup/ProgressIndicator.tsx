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


interface ProgressIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

const getStatus = (index:number, currentStep:number) : "done" | "in-progress" | "pending"  => {
    if (index < currentStep) return "done";
    if (index === currentStep) return "in-progress";
    return "pending";
}


const ProgressIndicator = ({currentStep, totalSteps}: ProgressIndicatorProps) => {
    const pageCount = currentStep+1;

    return (
        <ProgressIndicatorWrapper>
            {Array.from({length: totalSteps}).map((_, index)=>(
                <Bar key={index} status={getStatus(index, currentStep)}/>
            ))}
            <PageCount><span>{pageCount}</span>/{totalSteps}</PageCount>
        </ProgressIndicatorWrapper>
    )
}


export default ProgressIndicator