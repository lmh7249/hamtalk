// 멀티파티인 경우, 해당 커스텀 fetch 호출 시, isMultipart를 true로 설정해줘야함.

export const customFetch = async (
    url: string,
    options: RequestInit = {},
    retry: boolean = true,
    isMultipart: boolean = false
): Promise<Response> => {
    let accessToken = localStorage.getItem("accessToken");

    // 이 부분이 변경됨: Content-Type을 조건부로 설정
    const headers: any = {
        "Authorization": `Bearer ${accessToken}`,
        ...options.headers
    };

    // 멀티파트가 아닐 때만 Content-Type 설정
    if (!isMultipart) {
        headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
        ...options,
        headers,  // 수정된 headers 객체 사용
        credentials: "include",
    });

    if(response.status === 401 && retry) {
        //401 에러 발생: 액세스 토큰 만료됨. 리프레시 토큰으로 재발급 시도
        // accessToken 만료 → refresh 요청
        const refreshRes = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/reissue`, {
            method: "POST",
            credentials: "include",
        })
        if (refreshRes.ok) {
            const newAccessToken = refreshRes.headers.get("access")?.replace("Bearer ", "");
           if(newAccessToken) {
               localStorage.setItem("accessToken", newAccessToken);
               return customFetch(url, options, false, isMultipart); // retry는 한 번만
           } else {
               throw new Error("새로운 액세스 토큰이 응답에 존재하지 않습니다.");
           }
        } else {
            localStorage.removeItem("accessToken");
            alert("로그인이 만료되었어요. 다시 로그인해주세요.");
            window.location.href = "/login";
            throw new Error("로그인이 만료되었어요. 다시 로그인해주세요.");
        }
    }
    return response;
}