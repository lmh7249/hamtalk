import toast from "react-hot-toast";
import {ApiResponse} from "../../types/api-response";

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
    const response = await fetch(`/api/users?email=${email}`, {
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
    const response = await fetch(`/api/users/${id}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });
    return response.json();
}

//TODO: 이 구조로 api 호출 방식 전부 변경하기.
export const updateUserProfileImageApi = async (imageFile: File): Promise<ApiResponse<string>> => {
    const accessToken = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch('/api/profiles/me/image', {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
    })

    // HTTP 응답코드를 통해 필터링을 먼저하기.
    if (!response.ok) {
        const errorData = await response.json(); // body에 errorMessage 들어있음
        throw new Error(errorData.errorMessage || "서버 오류가 발생했어요.");
    }

    return await response.json(); // status === "success"
}

export const updateUserStatusMessageApi = async (statusMessage: string): Promise<ApiResponse<string>> => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch('/api/profiles/me/status-message', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            statusMessage : statusMessage
        })
    })
    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || "서버 오류가 발생했어요.");
    }
    return await response.json();
}