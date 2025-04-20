export type ButtonTypes = "LOGIN" | "COMPLETE" | "NEXT" | "PREV";

// 색상 정보를 담는 형태를 정의
export interface ButtonColorStyle {
    COLOR: string;
    BACKGROUND: string;
}

// 버튼의 상태별 스타일 형태를 정의
export interface ButtonStateStyle {
    DEFAULT: ButtonColorStyle;
    HOVER: ButtonColorStyle;
    PRESSED: ButtonColorStyle;
    DISABLED: ButtonColorStyle;
}

// 전체 버튼 스타일 형태를 정의
export interface ButtonStyle {
    BUTTON: ButtonStateStyle;
}