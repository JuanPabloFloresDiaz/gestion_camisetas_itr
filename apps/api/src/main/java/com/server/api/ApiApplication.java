package com.server.api;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.context.annotation.ComponentScan;
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = {
    "com.server.infrastructure.persistence.jpa", // Repositorios JPA
    "com.server.domain.repository" // Puertos de dominio
})
@EntityScan(basePackages = "com.server.domain.model") // Entidades
@ComponentScan(basePackages = {
    "com.server.api", // Controladores y configuraciones en api
    "com.server.application", // Servicios
    "com.server.infrastructure" // Implementaciones de repositorios y otras configuraciones
})
@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
		// Cargar variables del archivo .env
        Dotenv dotenv = Dotenv.configure().load();
        dotenv.entries().forEach(entry -> {
            System.setProperty(entry.getKey(), entry.getValue());
        });
		SpringApplication.run(ApiApplication.class, args);
	}

}
