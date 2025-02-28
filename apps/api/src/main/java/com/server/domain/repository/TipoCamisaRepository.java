package com.server.domain.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.domain.model.TipoCamisa;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TipoCamisaRepository extends JpaRepository<TipoCamisa, UUID> {
    List<TipoCamisa> findAll();
    Optional<TipoCamisa> findById(UUID id);
    @SuppressWarnings("unchecked")
    TipoCamisa save(TipoCamisa TipoCamisa);
    TipoCamisa update(TipoCamisa TipoCamisa);
    void deleteById(UUID id); // Soft delete
}
