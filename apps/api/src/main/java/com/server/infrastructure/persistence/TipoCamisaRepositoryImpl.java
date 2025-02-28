package com.server.infrastructure.persistence;
import com.server.domain.repository.TipoCamisaRepository;
import com.server.domain.model.TipoCamisa;
import com.server.infrastructure.persistence.jpa.TipoCamisaJpaRepository;

import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class TipoCamisaRepositoryImpl implements TipoCamisaRepository{

    private final TipoCamisaJpaRepository tipoCamisaJpaRepository;

    public TipoCamisaRepositoryImpl(TipoCamisaJpaRepository tipoCamisaJpaRepository) {
        this.tipoCamisaJpaRepository = tipoCamisaJpaRepository;
    }

    @Override
    public List<TipoCamisa> findAll() {
        return tipoCamisaJpaRepository.findByDeletedAtIsNull();
    }

    @Override
    public Optional<TipoCamisa> findById(UUID id) {
        return tipoCamisaJpaRepository.findByIdAndDeletedAtIsNull(id);
    }

    @Override
    public TipoCamisa save(TipoCamisa tipoCamisa) {
        return tipoCamisaJpaRepository.save(tipoCamisa);
    }

    @Override
    public TipoCamisa update(TipoCamisa tipoCamisa) {
        return tipoCamisaJpaRepository.save(tipoCamisa);
    }

    @Override
    public void deleteById(UUID id) {
        TipoCamisa tipoCamisa = tipoCamisaJpaRepository.findById(id).orElseThrow();
        tipoCamisa.setDeletedAt(LocalDateTime.now());
        tipoCamisaJpaRepository.save(tipoCamisa);
    }
}
