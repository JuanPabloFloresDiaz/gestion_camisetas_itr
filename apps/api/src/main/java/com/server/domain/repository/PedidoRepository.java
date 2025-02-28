package com.server.domain.repository;

import org.springframework.stereotype.Repository;

import com.server.domain.model.Pedido;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PedidoRepository{
    List<Pedido> findAll();
    Optional<Pedido> findById(UUID id);
    Pedido save(Pedido Pedido);
    Pedido update(Pedido Pedido);
    void deleteById(UUID id); // Soft delete
}
