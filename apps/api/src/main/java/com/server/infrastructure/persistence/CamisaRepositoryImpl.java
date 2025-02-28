package com.server.infrastructure.persistence;

import com.server.domain.repository.CamisaRepository;
import com.server.domain.model.Camisa;
import com.server.infrastructure.persistence.jpa.CamisaJpaRepository;

import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class CamisaRepositoryImpl implements CamisaRepository {

    private final CamisaJpaRepository camisaJpaRepository;

    public CamisaRepositoryImpl(CamisaJpaRepository camisaJpaRepository) {
        this.camisaJpaRepository = camisaJpaRepository;
    }

    @Override
    public List<Camisa> findAll() {
        return camisaJpaRepository.findByDeletedAtIsNull();
    }

    @Override
    public Optional<Camisa> findById(UUID id) {
        return camisaJpaRepository.findByIdAndDeletedAtIsNull(id);
    }

    @Override
    public Camisa save(Camisa camisa) {
        return camisaJpaRepository.save(camisa);
    }

    @Override
    public Camisa update(Camisa camisa) {
        return camisaJpaRepository.save(camisa);
    }

    @Override
    public void deleteById(UUID id) {
        // Soft delete: Marca el registro como eliminado (actualiza deleted_at)
        camisaJpaRepository.findById(id).ifPresent(camisa -> {
            camisa.setDeletedAt(LocalDateTime.now());
            camisaJpaRepository.save(camisa);
        });
    }

}
