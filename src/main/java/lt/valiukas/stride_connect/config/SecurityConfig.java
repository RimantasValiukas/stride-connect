package lt.valiukas.stride_connect.config;

import lt.valiukas.stride_connect.security.JwtAuthenticationFilter;
import lt.valiukas.stride_connect.security.filter.JwtAuthorizationFilter;
import lt.valiukas.stride_connect.security.service.JwtService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;


@Configuration
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity security, AuthenticationConfiguration authenticationConfiguration, JwtService jwtService) throws Exception {

        security.csrf(c -> c.disable());

        security.sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        security.authorizeHttpRequests(c -> c.requestMatchers(HttpMethod.GET, "/api/polls", "/api/polls/**").permitAll().requestMatchers(HttpMethod.POST, "/api/login").permitAll().anyRequest().authenticated());

        security.exceptionHandling(c -> c.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));

        security.addFilter(new JwtAuthenticationFilter(authenticationConfiguration.getAuthenticationManager(), jwtService)).addFilter(new JwtAuthorizationFilter(authenticationConfiguration.getAuthenticationManager(), jwtService));

        return security.build();
    }

}
