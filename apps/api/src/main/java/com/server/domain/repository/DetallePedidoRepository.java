package com.server.domain.repository;

import org.springframework.stereotype.Repository;

import com.server.domain.model.DetallePedido;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DetallePedidoRepository{
    List<DetallePedido> findAll();
    Optional<DetallePedido> findById(UUID id);
    DetallePedido save(DetallePedido DetallePedido);
    DetallePedido update(DetallePedido DetallePedido);
    void deleteById(UUID id); // Soft delete
}
