export const sendEmailVerificationApi = async (email : string) => {
    try {
        const response = await fetch("/api/auth/email-verification/code", {
            method:"post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "email": email }),
        })

        if(response.ok) {
            alert("이메일 인증번호 전송 성공");
            return true;
        }

    } catch (error) {
        console.log("이메일 인증번호 전송 실패", error);
        return false;
    }
}

export const verifyEmailVerificationCodeApi = async (email : string, verificationCode: string) => {
    try {
        const response = await fetch("/api/auth/email-verification/code/verify", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email"  : email,
                "verificationCode" : verificationCode
            })
        })
        const data = await response.json();

        if(data.status == "success") {
            alert("인증번호 검증 통과")
            return {success: true, errorMessage : undefined};
        } else {
            // 인증번호가 틀린 경우
            return {success: false, errorMessage: data.errorMessage};
        }

    } catch (error){
        console.log("이메일 인증번호 에러!", error);
        return {success: false, errorMessage: "인증번호 에러"};
    }
}