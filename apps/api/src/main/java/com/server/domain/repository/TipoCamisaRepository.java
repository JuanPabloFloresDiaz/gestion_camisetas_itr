package com.server.domain.repository;

import org.springframework.stereotype.Repository;

import com.server.domain.model.TipoCamisa;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TipoCamisaRepository {
    List<TipoCamisa> findAll();
    Optional<TipoCamisa> findById(UUID id);
    TipoCamisa save(TipoCamisa TipoCamisa);
    TipoCamisa update(TipoCamisa TipoCamisa);
    void deleteById(UUID id); // Soft delete
}
