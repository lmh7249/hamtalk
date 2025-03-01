import {checkDuplicateEmailApi, getMyProfileApi} from "../api/user";

export const checkDuplicateEmail = async (email: string) => {
    return await checkDuplicateEmailApi(email);
}

export const getMyProfile = async () => {
    return await getMyProfileApi();
}