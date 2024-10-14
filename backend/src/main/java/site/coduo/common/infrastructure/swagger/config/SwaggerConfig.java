package site.coduo.common.infrastructure.swagger.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(apiInfo())
                .components(securitySchemeComponents())
                .addServersItem(serverItem())
                .addSecurityItem(securityRequirement());
    }

    private Info apiInfo() {
        return new Info()
                .title("코딩해듀오 API 문서")
                .description("우아한테크코스 레벨3 코딩해듀오 프로젝트 API 문서")
                .version("1.0.0");
    }

    private Components securitySchemeComponents() {
        final SecurityScheme bearerAuth = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat(HttpHeaders.AUTHORIZATION)
                .in(SecurityScheme.In.HEADER)
                .name(HttpHeaders.AUTHORIZATION);

        return new Components().addSecuritySchemes(HttpHeaders.AUTHORIZATION, bearerAuth);
    }

    private Server serverItem() {
        return new Server()
                .url("https://coduo.site")
                .description("클라우드에 배포된 서버");
    }

    private SecurityRequirement securityRequirement() {
        return new SecurityRequirement().addList(HttpHeaders.AUTHORIZATION);
    }
}
