package com.server.infrastructure.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                //.requestMatchers("/api/administradores/**").authenticated() // Requiere autenticación
                .anyRequest().permitAll() // El resto de endpoints son públicos
            )
            .httpBasic(httpBasic -> {}) // Habilita la autenticación básica
            .csrf(csrf -> csrf.disable()); // Desactiva CSRF para APIs REST

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        // Crea un usuario en memoria para pruebas
        UserDetails user = User.builder()
            .username("admin") // Nombre de usuario
            .password(passwordEncoder().encode("password")) // Contraseña
            .roles("USER") // Rol del usuario
            .build();

        return new InMemoryUserDetailsManager(user);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Codificador de contraseñas
    }
}