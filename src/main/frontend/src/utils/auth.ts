/**
 * 리프레시 토큰을 사용해 새로운 액세스 토큰을 발급받는 함수.
 * 성공 시 새로운 액세스 토큰을 반환하고, 실패 시 null을 반환.
 */
export const refreshToken = async (): Promise<string | null> => {
    try {
        const refreshRes = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/reissue`, {
            method: "POST",
            credentials: "include",
        });

        if (refreshRes.ok) {
            const newAccessToken = refreshRes.headers.get("access")?.replace("Bearer ", "");
            if (newAccessToken) {
                localStorage.setItem("accessToken", newAccessToken);
                console.log("✅ [WebSocket] 토큰이 성공적으로 재발급되었습니다.");
                return newAccessToken;
            } else {
                console.error("❌ [WebSocket] 재발급 응답에 새로운 액세스 토큰이 없습니다.");
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        console.error("❌ [WebSocket] 토큰 재발급 중 네트워크 오류 발생", error);
        return null;
    }
};