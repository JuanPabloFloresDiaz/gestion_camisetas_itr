package com.server.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.server.api.model.Camisa;
import java.util.UUID;

@Repository
public interface CamisaRepository extends JpaRepository<Camisa, UUID> {

    // Buscar camisas con paginación y filtro de búsqueda
    @Query("SELECT c FROM Camisa c WHERE " +
           "LOWER(c.nombre) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.descripcion) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Camisa> searchAllFields(@Param("searchTerm") String searchTerm, Pageable pageable);

    // Obtener todas las camisas con paginación
    @SuppressWarnings("null")
    Page<Camisa> findAll(Pageable pageable);
}