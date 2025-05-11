package com.hamtalk.chat.config.swagger;

import com.hamtalk.chat.jwt.LoginFilter;
import com.hamtalk.chat.jwt.CustomLogoutFilter;
import io.swagger.v3.oas.models.*;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.*;
import io.swagger.v3.oas.models.parameters.RequestBody;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
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

//    @Bean
//    public OpenAPI openAPI() {
//        return new OpenAPI()
//                .components(new Components())
//                .info(apiInfo());
//    }

    @Bean
    public OpenAPI customOpenAPI() {
        // Security Scheme 정의
        // Swagger UI에서 JWT 토큰 테스트를 하기 위한 설정.
        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .in(SecurityScheme.In.HEADER)
                .name("Authorization");

        // Security Requirement 정의
        SecurityRequirement securityRequirement = new SecurityRequirement().addList("BearerAuth");

        return new OpenAPI()
                .info(new Info().title("HamTalk API")
                        .description("채팅 웹사이트 API")
                        .version("2.6.0"))
                .addSecurityItem(securityRequirement)  // Security Requirement 추가
                .schemaRequirement("BearerAuth", securityScheme);  // Security Scheme 추가
    }



//    private Info apiInfo() {
//        return new Info()
//                .title("HamTalk API")
//                .description("채팅 웹사이트 API")
//                .version("2.6.0");
//    }

    @Bean
    public OpenApiCustomizer springSecurityEndpointCustomiser() {
        FilterChainProxy filterChainProxy = applicationContext.getBean(
                AbstractSecurityWebApplicationInitializer.DEFAULT_FILTER_NAME, FilterChainProxy.class);

        return openAPI -> {
            for (SecurityFilterChain filterChain : filterChainProxy.getFilterChains()) {
                // 로그인 필터 문서화
                Optional<LoginFilter> loginFilter = filterChain.getFilters().stream()
                        .filter(LoginFilter.class::isInstance)
                        .map(LoginFilter.class::cast)
                        .findAny();

                if (loginFilter.isPresent()) {
                    Operation loginOperation = new Operation()
                            .summary("사용자 로그인")
                            .description("성공 시, AccessToken(헤더/지속시간 10분), RefreshToken(쿠키/지속시간 1일)를 발급합니다.");

                    Schema<?> loginSchema = new ObjectSchema()
                            .addProperties("email", new StringSchema())
                            .addProperties("password", new StringSchema());

                    RequestBody loginRequestBody = new RequestBody().content(
                            new Content().addMediaType(org.springframework.http.MediaType.APPLICATION_JSON_VALUE,
                                    new MediaType().schema(loginSchema))
                    );
                    loginOperation.requestBody(loginRequestBody);

                    ApiResponses loginResponses = new ApiResponses();
                    loginResponses.addApiResponse("200", new ApiResponse().description("로그인 성공"));
                    loginResponses.addApiResponse("401", new ApiResponse().description("로그인 실패"));

                    loginOperation.responses(loginResponses);
                    loginOperation.addTagsItem("AuthController");

                    PathItem loginPathItem = new PathItem().post(loginOperation);
                    openAPI.getPaths().addPathItem("/api/auth/login", loginPathItem);
                }

                // 로그아웃 필터 문서화
                Optional<CustomLogoutFilter> logoutFilter = filterChain.getFilters().stream()
                        .filter(CustomLogoutFilter.class::isInstance)
                        .map(CustomLogoutFilter.class::cast)
                        .findAny();

                if (logoutFilter.isPresent()) {
                    Operation logoutOperation = new Operation()
                            .summary("사용자 로그아웃")
                            .description("AccessToken(localStorage), RefreshToken(Cookie, redis)을 삭제합니다.");

                    ApiResponses logoutResponses = new ApiResponses();
                    logoutResponses.addApiResponse("200", new ApiResponse().description("로그아웃 성공"));
                    logoutResponses.addApiResponse("400", new ApiResponse().description("유효하지 않은 리프레시 토큰"));

                    logoutOperation.responses(logoutResponses);
                    logoutOperation.addTagsItem("AuthController");

                    PathItem logoutPathItem = new PathItem().post(logoutOperation);
                    openAPI.getPaths().addPathItem("/api/auth/logout", logoutPathItem);
                }
            }
        };
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("HamTalk API")
                .pathsToMatch("/api/**")
                .addOpenApiCustomizer(springSecurityEndpointCustomiser())
                .build();
    }
}