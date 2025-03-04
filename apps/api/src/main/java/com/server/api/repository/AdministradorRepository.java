package com.server.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.api.model.Administrador;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, UUID>{
    // Buscar un administrador por correo (no eliminado)
    Optional<Administrador> findByCorreo(String correo);
    
}
