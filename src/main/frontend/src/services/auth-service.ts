import {
    LoginCredentials,
    sendEmailVerificationApi,
    userLoginApi,
    userLogoutApi,
    verifyEmailVerificationCodeApi
} from "../api/auth";

export const sendEmailVerification = async (email : string) => {
   return  await sendEmailVerificationApi(email);
}

export const verifyEmailVerificationCode = async (email: string, verificationCode: string) => {
   return await verifyEmailVerificationCodeApi(email, verificationCode);
}

export const userLogin = async (credentials: LoginCredentials) => {
   try {
     const data = await userLoginApi(credentials);
     const accessToken = data.accessToken;
      if(accessToken) {
          //Todo Bearer 접두사는 HTTP 요청을 보낼 때만 필요, 로컬 스토리지는 순수한 jwt 토큰 값만 저장"
         localStorage.setItem("accessToken", accessToken.replace("Bearer ", ""));
         console.log("로그인 성공, 토큰 저장 완료.");
         return data.loginUserData; // 로그인 성공 여부 반환
      }
   } catch(error) {
      console.error("로그인 실패:", error);
      return null;
   }
}

export const userLogout = async () => {
   let isSuccess = await userLogoutApi();
   if(isSuccess) {
       localStorage.removeItem("accessToken");
       return true;
   }
   return false;
}