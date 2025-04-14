import {userLogin} from "../services/auth-service";
import toast from "react-hot-toast";




export const sendEmailVerificationApi = async (email : string) => {
    try {
        const response = await fetch("/api/auth/email-verification/code", {
            method:"post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "email": email }),
        })

        const data = await response.json();

        if(response.ok) {
            return true;
        } else if(response.status === 400) {
            toast.error(data.errorMessage);
            return false;
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

interface LoginResponse {
    accessToken: string;
    loginUserData: {
        id: number;
        email: string;
        roleId: number;
    };
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export const userLoginApi = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const response =await fetch("/api/auth/login", {
            method:"post",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials),
        })
        const loginUserData = await response.json();
        // 헤더에서 access 토큰 가져오기
        const bearerToken = response.headers.get("Authorization");

        if (!bearerToken || !bearerToken.toLowerCase().startsWith("bearer ")) {
            throw new Error("Access Token이 응답 헤더에 포함되지 않았습니다.");
        }

        // "Bearer " 부분 제거 후 순수한 토큰만 추출
        const accessToken = bearerToken.split(" ")[1];

        return {accessToken, loginUserData};
    } catch(error) {
        console.log("아이디 혹은 비밀번호를 확인해주세요.");
        throw error;
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