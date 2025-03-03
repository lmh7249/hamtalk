import {checkDuplicateEmailApi, getMyProfileApi, getUserProfileApi} from "../api/user";

export const checkDuplicateEmail = async (email: string) => {
    return await checkDuplicateEmailApi(email);
}

export const getMyProfile = async () => {
    return await getMyProfileApi();
}

export const getUserProfile = async (email: string) => {
    return await getUserProfileApi(email);
}
