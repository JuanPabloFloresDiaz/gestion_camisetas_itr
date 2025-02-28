package com.server.domain.repository;

import org.springframework.stereotype.Repository;

import com.server.domain.model.Talla;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TallaRepository {
    List<Talla> findAll();
    Optional<Talla> findById(UUID id);
    Talla save(Talla Talla);
    Talla update(Talla Talla);
    void deleteById(UUID id); // Soft delete
}
