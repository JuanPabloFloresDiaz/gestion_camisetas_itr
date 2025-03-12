package com.server.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.server.api.model.TipoCamisa;
import java.util.UUID;

@Repository
public interface TipoCamisaRepository extends JpaRepository<TipoCamisa, UUID> {

    // Buscar tipos de camisas con paginación y filtro de búsqueda
    @Query("SELECT t FROM TipoCamisa t WHERE " +
           "LOWER(t.nombre) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<TipoCamisa> searchAllFields(@Param("searchTerm") String searchTerm, Pageable pageable);

    // Obtener todos los tipos de camisas con paginación
    @SuppressWarnings("null")
    Page<TipoCamisa> findAll(Pageable pageable);
}