package com.server.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.domain.model.DetalleCamisa;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DetalleCamisaRepository extends JpaRepository<DetalleCamisa, UUID> {
    List<DetalleCamisa> findAll();
    Optional<DetalleCamisa> findById(UUID id);
    @SuppressWarnings("unchecked")
    DetalleCamisa save(DetalleCamisa DetalleCamisa);
    DetalleCamisa update(DetalleCamisa DetalleCamisa);
    void deleteById(UUID id); // Soft delete
}
