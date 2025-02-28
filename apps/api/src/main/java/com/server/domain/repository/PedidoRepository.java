package com.server.domain.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.domain.model.Pedido;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, UUID> {
    List<Pedido> findAll();
    Optional<Pedido> findById(UUID id);
    @SuppressWarnings("unchecked")
    Pedido save(Pedido Pedido);
    Pedido update(Pedido Pedido);
    void deleteById(UUID id); // Soft delete
}
