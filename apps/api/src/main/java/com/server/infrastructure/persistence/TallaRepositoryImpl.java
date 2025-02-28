package com.server.infrastructure.persistence;
import com.server.domain.repository.TallaRepository;
import com.server.domain.model.Talla;
import com.server.infrastructure.persistence.jpa.TallaJpaRepository;

import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class TallaRepositoryImpl implements TallaRepository{

    private final TallaJpaRepository tallaJpaRepository;

    public TallaRepositoryImpl(TallaJpaRepository tallaJpaRepository) {
        this.tallaJpaRepository = tallaJpaRepository;
    }

    @Override
    public List<Talla> findAll() {
        return tallaJpaRepository.findByDeletedAtIsNull();
    }

    @Override
    public Optional<Talla> findById(UUID id) {
        return tallaJpaRepository.findByIdAndDeletedAtIsNull(id);
    }

    @Override
    public Talla save(Talla talla) {
        return tallaJpaRepository.save(talla);
    }

    @Override
    public Talla update(Talla talla) {
        return tallaJpaRepository.save(talla);
    }

    @Override
    public void deleteById(UUID id) {
        Talla talla = tallaJpaRepository.findById(id).orElseThrow();
        talla.setDeletedAt(LocalDateTime.now());
        tallaJpaRepository.save(talla);
    }
}
