import {userLogin} from "../services/auth-service";

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

export const userLoginApi = async (email:string, password:string) => {
    try {
        const response =await fetch("/api/auth/login", {
            method:"post",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
            })
        })
        console.log("response 값은?:  ", response);
        if (!response.ok) {  // 응답 상태가 200-299 범위가 아닐 때
            throw new Error("로그인에 실패했습니다.");
        }
        // 헤더에서 access 토큰 가져오기
        const accessToken = response.headers.get("access");
        if (!accessToken) {
            throw new Error("Access Token이 응답 헤더에 포함되지 않았습니다.");
        }
        return accessToken
    } catch(error) {
        console.log("아이디 혹은 비밀번호를 확인해주세요.");
    }
}

export const userLogoutApi = async () => {
    try {
        const response = await fetch("/api/auth/logout", {
            method: "post",
            credentials: "include",
        })
        if(response.ok) {
            console.log("로그아웃 성공!");
            return true;
        }
        return false;

    } catch (error) {
        console.log("로그아웃 api 호출 에러: {}", error)
        return false;
    }
}