package com.hamtalk.chat.config.swagger;

import com.hamtalk.chat.jwt.LoginFilter;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.PathItem;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.*;
import io.swagger.v3.oas.models.parameters.RequestBody;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;

import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class SwaggerConfig {
    private final ApplicationContext applicationContext;

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
            .components(new Components())
            .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
            .title("HamTalk API")
            .description("채팅 웹사이트 API")
            .version("2.6.0");
    }

    // 🔹 ① OpenApiCustomiser: 로그인 API 문서를 Swagger에 등록
    @Bean
    public OpenApiCustomizer springSecurityLoginEndpointCustomiser() {
        FilterChainProxy filterChainProxy = applicationContext.getBean(
                AbstractSecurityWebApplicationInitializer.DEFAULT_FILTER_NAME, FilterChainProxy.class);

        return openAPI -> {
            for (SecurityFilterChain filterChain : filterChainProxy.getFilterChains()) {
                Optional<LoginFilter> optionalFilter =
                        filterChain.getFilters().stream()
                                .filter(LoginFilter.class::isInstance) // 🔹 LoginFilter 찾기
                                .map(LoginFilter.class::cast)
                                .findAny();

                if (optionalFilter.isPresent()) {
                    LoginFilter loginFilter = optionalFilter.get();
                    Operation operation = new Operation();

                    // 🔹 요청 JSON 데이터 구조 정의 (email, password)
                    Schema<?> schema = new ObjectSchema()
                            .addProperties("email", new StringSchema())
                            .addProperties("password", new StringSchema());

                    RequestBody requestBody = new RequestBody().content(
                            new Content().addMediaType(org.springframework.http.MediaType.APPLICATION_JSON_VALUE,
                                    new MediaType().schema(schema))
                    );
                    operation.requestBody(requestBody);

                    // 🔹 응답 코드 정의
                    ApiResponses apiResponses = new ApiResponses();
                    apiResponses.addApiResponse("200", new ApiResponse().description("로그인 성공"));
                    apiResponses.addApiResponse("400", new ApiResponse().description("잘못된 요청"));

                    operation.responses(apiResponses);
                    operation.addTagsItem("Auth"); // 🔹 Swagger 태그 지정

                    // 🔹 로그인 API 엔드포인트 문서화
                    PathItem pathItem = new PathItem().post(operation);
                    openAPI.getPaths().addPathItem("/api/auth/login", pathItem);
                }
            }
        };
    }

    // 🔹 ② OpenApiCustomiser를 Swagger 문서 생성에 적용
    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("HamTalk API")
                .pathsToMatch("/api/**") // 🔹 문서화할 API 경로
                .addOpenApiCustomizer(springSecurityLoginEndpointCustomiser()) // 🔹 로그인 API 적용
                .build();
    }


}