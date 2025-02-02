import {sendEmailVerificationApi, verifyEmailVerificationCodeApi} from "../api/auth";

export const sendEmailVerification = async (email : string) => {
   return  await sendEmailVerificationApi(email);
}

export const verifyEmailVerificationCode = async (email: string, verificationCode: string) => {
   return await verifyEmailVerificationCodeApi(email, verificationCode);
}