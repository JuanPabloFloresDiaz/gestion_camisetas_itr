package com.server.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.server.api.model.Administrador;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, UUID> {
    // Buscar un administrador por correo (no eliminado)
    Optional<Administrador> findByCorreo(String correo);

    // Buscar administradores con paginación y filtro de búsqueda
    @Query("SELECT a FROM Administrador a WHERE " +
           "LOWER(a.nombre) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(a.apellido) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(a.correo) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(a.telefono) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Administrador> searchAllFields(@Param("searchTerm") String searchTerm, Pageable pageable);

    // Obtener todos los administradores con paginación
    @SuppressWarnings("null")
    Page<Administrador> findAll(Pageable pageable);
}