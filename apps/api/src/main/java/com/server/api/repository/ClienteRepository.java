package com.server.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.server.api.model.Cliente;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, UUID>{
    Optional<Cliente> findByCorreo(String correo);
    
    @Query("SELECT c FROM Cliente c WHERE " +
       "LOWER(c.nombre) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
       "LOWER(c.apellido) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
       "LOWER(c.correo) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
       "LOWER(c.telefono) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
       "LOWER(c.dui) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Cliente> searchAllFields(@Param("searchTerm") String searchTerm, Pageable pageable);
    
    @SuppressWarnings("null")
    Page<Cliente> findAll(Pageable pageable);
}