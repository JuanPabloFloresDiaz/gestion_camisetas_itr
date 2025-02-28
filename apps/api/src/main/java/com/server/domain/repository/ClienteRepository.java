package com.server.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.domain.model.Cliente;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClienteRepository  extends JpaRepository<Cliente, UUID> {
    List<Cliente> findAll();
    Optional<Cliente> findById(UUID id);
    @SuppressWarnings("unchecked")
    Cliente save(Cliente Cliente);
    Cliente update(Cliente Cliente);
    void deleteById(UUID id); // Soft delete
    Optional<Cliente> findByCorreo(String correo);
}
