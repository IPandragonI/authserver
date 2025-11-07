package esgi.fyc.sso.authserver.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI userRoleOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("SSO Auth Server API")
                        .description("Documentation interactive pour les endpoints REST de l'application SSO")
                        .version("1.0.0"));
    }
}
