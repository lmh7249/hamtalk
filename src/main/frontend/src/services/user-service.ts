import {checkDuplicateEmailApi} from "../api/user";

export const checkDuplicateEmail = async (email: string) => {
    return await checkDuplicateEmailApi(email);
}