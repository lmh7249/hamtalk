package com.hamtalk.common.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ApiResponse<T> {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final String ERROR = "error";

    // TODO: @JsonInclude(JsonInclude.Include.NON_NULL) : null 값인 필드를 JSON 응답에서 제외
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String status;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String errorCode;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String errorMessage;



    // 성공 응답 생성
    // TODO: 앞쪽 <T> -> 이 메세드에서 사용할 제네릭 타입 선언
    // TODO: 뒤쪽 <T> -> 반환할 ApiResponse 객체의 타입을 지정.
    public static <T> ApiResponse<T> ok(T data) {
        return  ApiResponse.<T>builder()
                .status(SUCCESS)
                .data(data)
                .build();
    }

    // 클라이언트 요청 실패 응답
    public static <T> ApiResponse<T> fail(String errorCode, String errorMessage) {
        return ApiResponse.<T>builder()
                .status(FAIL)
                .errorCode(errorCode)
                .errorMessage(errorMessage)
                .build();
    }

    // 서버 오류 응답
    public static <T> ApiResponse<T> error(String errorCode, String errorMessage) {
        return ApiResponse.<T>builder()
                .status(ERROR)
                .errorCode(errorCode)
                .errorMessage(errorMessage)
                .build();
    }
}
