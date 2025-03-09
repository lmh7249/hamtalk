import {checkDuplicateEmailApi, getMyProfileApi, getUserProfileByEmailApi, getUserProfileByIdApi} from "../api/user";

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

