package com.server.api.configuration;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {

    @SuppressWarnings("null")
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Origen permitido
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @SuppressWarnings("null")
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.stream()
            .filter(converter -> converter instanceof MappingJackson2HttpMessageConverter)
            .forEach(converter -> {
                MappingJackson2HttpMessageConverter jsonConverter = (MappingJackson2HttpMessageConverter) converter;
                // Agrega ambos tipos de media (con y sin charset)
                List<MediaType> mediaTypes = new ArrayList<>();
                mediaTypes.add(MediaType.APPLICATION_JSON);
                mediaTypes.add(new MediaType("application", "json", StandardCharsets.UTF_8));
                jsonConverter.setSupportedMediaTypes(mediaTypes);
            });
    }

}
