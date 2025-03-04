package com.server.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.api.model.Cliente;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, UUID>{
    // Buscar un cliente por correo (no eliminado)
    Optional<Cliente> findByCorreo(String correo);
}
