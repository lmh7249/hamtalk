import styled from "styled-components";
import {StyledErrorText} from "../common/ErrorText";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {updateField} from "../../store/signupSlice";
import FloatingLabelInput from "../common/FloatingLabelInput";

const SignupEmailVerificationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute; // 절대 위치
    gap: 15px;
    width: 350px;
`;

const TimerText = styled.div`
    font-size: 14px;
    font-weight: bold;
    color: #ff4d4f; // 긴박한 느낌의 레드
    text-align: right;

    background-color: #fff1f0;
    border: 1px solid #ffa39e;
    border-radius: 8px;
    padding: 6px 12px;
    width: fit-content;
    margin-left: auto;

    @media (max-width: 500px) {
        font-size: 14px;
        padding: 4px 8px;
    }
`;

const SignupEmailVerificationStep = ({errorMessage}: { errorMessage: { [key: string]: string } }) => {
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.signup);
    const [timeLeft, setTimeLeft] = useState(300); // 5분
    const [canResend, setCanResend] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        dispatch(updateField({field: name as keyof typeof formData, value}));
    };

    const formatTime = (seconds: number) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    useEffect(() => {
        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);


    return (
        <SignupEmailVerificationWrapper>
            <FloatingLabelInput type="number" placeholder="인증번호" name="verificationCode" value={formData.verificationCode}
                                onChange={handleInputChange}/>

            <StyledErrorText>
                {errorMessage && errorMessage.verificationCode ? errorMessage.verificationCode : " "}
            </StyledErrorText>
            <TimerText>남은 시간: {formatTime(timeLeft)}</TimerText>

        </SignupEmailVerificationWrapper>
    )
}
export default SignupEmailVerificationStep