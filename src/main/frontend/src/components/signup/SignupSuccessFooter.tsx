import Button from "../common/Button";
import React from "react";
import {useNavigate} from "react-router-dom";

const SignupSuccessFooter = () => {
    const navigate = useNavigate();

    const handleLoginPageRedirect = () => {
        navigate("/login");
    }

    return (
        <Button type="LOGIN" onClick={handleLoginPageRedirect}>로그인 이동</Button>
    )
}
export default SignupSuccessFooter