package com.server.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.domain.model.DetallePedido;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, UUID> {
    List<DetallePedido> findAll();
    Optional<DetallePedido> findById(UUID id);
    @SuppressWarnings("unchecked")
    DetallePedido save(DetallePedido DetallePedido);
    DetallePedido update(DetallePedido DetallePedido);
    void deleteById(UUID id); // Soft delete
}
