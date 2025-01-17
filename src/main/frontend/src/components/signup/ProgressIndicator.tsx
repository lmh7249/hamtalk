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
    step: number;
    lastStep: number;
}

const getStatus = (index:number, currentStep:number) : "done" | "in-progress" | "pending"  => {
    if (index < currentStep) return "done";
    if (index === currentStep) return "in-progress";
    return "pending";
}


const ProgressIndicator = ({step, lastStep}: ProgressIndicatorProps) => {
    const pageCount = step+1;

    return (
        <ProgressIndicatorWrapper>
            {Array.from({length: lastStep}).map((_, index)=>(
                <Bar key={index} status={getStatus(index, step)}/>
            ))}
            <PageCount><span>{pageCount}</span>/{lastStep}</PageCount>
        </ProgressIndicatorWrapper>
    )
}


export default ProgressIndicator