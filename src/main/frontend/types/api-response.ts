export interface ApiResponse<T> {
    status :  "success" | "fail" | "error";
    data?: T;
    errorCode?: string;
    errorMessage?: string;
}