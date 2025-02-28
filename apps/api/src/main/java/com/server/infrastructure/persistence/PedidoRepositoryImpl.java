package com.server.infrastructure.persistence;
import com.server.domain.repository.PedidoRepository;
import com.server.domain.model.Pedido;
import com.server.infrastructure.persistence.jpa.PedidoJpaRepository;

import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class PedidoRepositoryImpl implements PedidoRepository{

    private final PedidoJpaRepository pedidoJpaRepository;

    public PedidoRepositoryImpl(PedidoJpaRepository pedidoJpaRepository) {
        this.pedidoJpaRepository = pedidoJpaRepository;
    }

    @Override
    public List<Pedido> findAll() {
        return pedidoJpaRepository.findByDeletedAtIsNull();
    }

    @Override
    public Optional<Pedido> findById(UUID id) {
        return pedidoJpaRepository.findByIdAndDeletedAtIsNull(id);
    }

    @Override
    public Pedido save(Pedido pedido) {
        return pedidoJpaRepository.save(pedido);
    }

    @Override
    public Pedido update(Pedido pedido) {
        return pedidoJpaRepository.save(pedido);
    }

    @Override
    public void deleteById(UUID id) {
        Pedido pedido = pedidoJpaRepository.findById(id).orElseThrow();
        pedido.setDeletedAt(LocalDateTime.now());
        pedidoJpaRepository.save(pedido);
    }
}
