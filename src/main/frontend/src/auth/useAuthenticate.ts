//TODO: 검증 방식 수정 예정.
export const useAuthenticate = (): boolean => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("액세스 토큰 있어?: ", accessToken)
    return accessToken ? true : false;

};