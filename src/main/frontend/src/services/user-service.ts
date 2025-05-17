import {
    checkDuplicateEmailApi,
    getMyProfileApi,
    getUserProfileByEmailApi,
    getUserProfileByIdApi, signupUserApi,
    updateUserProfileImageApi, updateUserStatusMessageApi
} from "../api/user";
import {SignupData} from "../store/signupSlice";
import {ApiResponse} from "../../types/api-response";

export const checkDuplicateEmail = async (email: string) => {
    return await checkDuplicateEmailApi(email);
}

export const getMyProfile = async () => {
    return await getMyProfileApi();
}

export const getUserProfileByEmail = async (email: string) => {
    return await getUserProfileByEmailApi(email);
}

export const getUserProfileById = async (id: number) => {
        const response = await getUserProfileByIdApi(id);
        if(response.status === "success") {
            return response.data;
        }
        return null;
}

export const updateUserProfileImage = async (image:File): Promise<string> => {
    const response = await updateUserProfileImageApi(image);

    // TODO: 여기서 response.status === "success"를 한 번더 검증하면서 이중 장치
    if(response.status === "success" && response.data) {
        return response.data;
    }
    throw new Error(response.errorMessage || "이미지 업로드 실패");
};

export const updateUserStatusMessage = async (statusMessage: string): Promise<string> => {
    const response = await updateUserStatusMessageApi(statusMessage);

    if(response.status === "success" && response.data) {
        return response.data;
    }

    throw new Error(response.errorMessage || "");

}


export const signupUser = async (signupData: SignupData): Promise<string> => {
   const response = await signupUserApi(signupData);

   if(response.status === "success" && response.data) {
       return response.data;
   }
    throw new Error(response.errorMessage || "");


}


