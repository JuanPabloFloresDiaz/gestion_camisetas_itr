package com.server.infrastructure.configuration;

import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.http.MediaType;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Origen permitido
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        // Crear un conversor de Jackson personalizado
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        
        // Definir los tipos de medios compatibles (incluyendo charset=UTF-8)
        converter.setSupportedMediaTypes(List.of(
            new MediaType("application", "json", StandardCharsets.UTF_8), // application/json;charset=UTF-8
            MediaType.APPLICATION_JSON // application/json
        ));
        
        // Limpiar los conversores existentes y agregar el conversor personalizado primero
        converters.clear();
        converters.add(converter);
    }

}
