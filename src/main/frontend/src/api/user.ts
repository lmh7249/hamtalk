import toast from "react-hot-toast";

export const checkDuplicateEmailApi = async (email: string) => {
    try {
        const response = await fetch(`/api/users/email-check?email=${email}`, {
            method: "get",
        });
        const data = await response.json();
        console.log("응답 데이터:", data);

        if (response.ok) {
            return true;
        } else if (response.status === 409) {
            toast.error(data.errorMessage);
            return false;
        }
    } catch (error) {
        // 네트워크 오류 등 예외 처리
        console.error("요청 실패:", error);
        alert("서버와의 연결에 문제가 발생했습니다. 나중에 다시 시도해주세요.");
        return false;
    }
};

export const getMyProfileApi = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch("api/profiles/me", {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });
    if (!response.ok) {
        throw new Error("프로필 받아오기 실패")
    }
    return response.json();
}

export const getUserProfileByEmailApi = async (email: string) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`api/users?email=${email}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });
    return response.json();
}

export const getUserProfileByIdApi = async (id: number) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`api/users/${id}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });
    return response.json();
}