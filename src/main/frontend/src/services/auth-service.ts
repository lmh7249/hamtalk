import {sendEmailVerificationApi, userLoginApi, userLogoutApi, verifyEmailVerificationCodeApi} from "../api/auth";

export const sendEmailVerification = async (email : string) => {
   return  await sendEmailVerificationApi(email);
}

export const verifyEmailVerificationCode = async (email: string, verificationCode: string) => {
   return await verifyEmailVerificationCodeApi(email, verificationCode);
}

export const userLogin = async (email: string, password: string) => {
   try {
     const accessToken = await userLoginApi(email, password);
      if(accessToken) {
         localStorage.setItem("accessToken", accessToken);
         console.log("로그인 성공, 토큰 저장 완료.");
         return true; // 로그인 성공 여부 반환
      }
   } catch(error) {
      console.error("로그인 실패:", error);
      return false;
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