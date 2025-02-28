package com.server.infrastructure.persistence;
import com.server.domain.repository.DetalleCamisaRepository;
import com.server.domain.model.DetalleCamisa;
import com.server.infrastructure.persistence.jpa.DetalleCamisaJpaRepository;

import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class DetalleCamisaRepositoryImpl implements DetalleCamisaRepository{

    private final DetalleCamisaJpaRepository detalleCamisaJpaRepository;

    public DetalleCamisaRepositoryImpl(DetalleCamisaJpaRepository detalleCamisaJpaRepository) {
        this.detalleCamisaJpaRepository = detalleCamisaJpaRepository;
    }

    @Override
    public List<DetalleCamisa> findAll() {
        return detalleCamisaJpaRepository.findByDeletedAtIsNull();
    }

    @Override
    public Optional<DetalleCamisa> findById(UUID id) {
        return detalleCamisaJpaRepository.findByIdAndDeletedAtIsNull(id);
    }

    @Override
    public DetalleCamisa save(DetalleCamisa detalleCamisa) {
        return detalleCamisaJpaRepository.save(detalleCamisa);
    }

    @Override
    public DetalleCamisa update(DetalleCamisa detalleCamisa) {
        return detalleCamisaJpaRepository.save(detalleCamisa);
    }

    @Override
    public void deleteById(UUID id) {
        DetalleCamisa detalleCamisa = detalleCamisaJpaRepository.findById(id).orElseThrow();
        detalleCamisa.setDeletedAt(LocalDateTime.now());
        detalleCamisaJpaRepository.save(detalleCamisa);
    }
}
