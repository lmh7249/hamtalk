export const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // 오전 오후 구분 및 12시간제 변환
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 || 12;
    return `${ampm} ${formattedHours}:${minutes}`;
}

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export const isSameDay = (date1: string, date2: string): boolean => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
}


// 채팅방 마지막 메세지 날짜 변환 함수
export function formatLastMessageTime(dateString: string): string {

    const messageDate = new Date(dateString);
    const now = new Date();

    const msInDay = 1000 * 60 * 60 * 24;

    // 오늘 자정
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 어제 자정
    const yesterdayStart = new Date(todayStart.getTime() - msInDay);

    if (messageDate >= todayStart) {
        // 오늘 => 오전/오후 시:분
        const hours = messageDate.getHours();
        const minutes = messageDate.getMinutes().toString().padStart(2, "0");
        const isAm = hours < 12;
        const displayHour = hours % 12 === 0 ? 12 : hours % 12;

        return `${isAm ? "오전" : "오후"} ${displayHour}:${minutes}`;
    } else if (messageDate >= yesterdayStart) {
        // 어제
        return "어제";
    } else {
        // 이틀 이상
        const year = messageDate.getFullYear();
        const month = (messageDate.getMonth() + 1).toString().padStart(2, "0");
        const day = messageDate.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    }
}
