package com.server.infrastructure.persistence;
import com.server.domain.repository.DetallePedidoRepository;
import com.server.domain.model.DetallePedido;
import com.server.infrastructure.persistence.jpa.DetallePedidoJpaRepository;

import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class DetallePedidoRepositoryImpl implements DetallePedidoRepository{

    private final DetallePedidoJpaRepository detallePedidoJpaRepository;

    public DetallePedidoRepositoryImpl(DetallePedidoJpaRepository detallePedidoJpaRepository) {
        this.detallePedidoJpaRepository = detallePedidoJpaRepository;
    }

    @Override
    public List<DetallePedido> findAll() {
        return detallePedidoJpaRepository.findByDeletedAtIsNull();
    }

    @Override
    public Optional<DetallePedido> findById(UUID id) {
        return detallePedidoJpaRepository.findByIdAndDeletedAtIsNull(id);
    }

    @Override
    public DetallePedido save(DetallePedido detallePedido) {
        return detallePedidoJpaRepository.save(detallePedido);
    }

    @Override
    public DetallePedido update(DetallePedido detallePedido) {
        return detallePedidoJpaRepository.save(detallePedido);
    }

    @Override
    public void deleteById(UUID id) {
        DetallePedido detallePedido = detallePedidoJpaRepository.findById(id).orElseThrow();
        detallePedido.setDeletedAt(LocalDateTime.now());
        detallePedidoJpaRepository.save(detallePedido);
    }
}
