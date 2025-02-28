package com.server.domain.repository;

import org.springframework.stereotype.Repository;

import com.server.domain.model.Administrador;
import java.util.UUID;
import java.util.Optional;
import java.util.List;

@Repository
public interface AdministradorRepository {
    List<Administrador> findAll();
    Optional<Administrador> findById(UUID id);
    Administrador save(Administrador administrador);
    Administrador update(Administrador administrador);
    void deleteById(UUID id); // Soft delete
    Optional<Administrador> findByCorreo(String correo);
}
