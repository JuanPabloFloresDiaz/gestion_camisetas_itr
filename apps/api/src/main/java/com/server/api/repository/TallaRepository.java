package com.server.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.server.api.model.Talla;
import java.util.UUID;

@Repository
public interface TallaRepository extends JpaRepository<Talla, UUID> {

    // Buscar tallas con paginación y filtro de búsqueda
    @Query("SELECT t FROM Talla t WHERE " +
           "LOWER(t.nombre) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Talla> searchAllFields(@Param("searchTerm") String searchTerm, Pageable pageable);

    // Obtener todas las tallas con paginación
    @SuppressWarnings("null")
    Page<Talla> findAll(Pageable pageable);
}