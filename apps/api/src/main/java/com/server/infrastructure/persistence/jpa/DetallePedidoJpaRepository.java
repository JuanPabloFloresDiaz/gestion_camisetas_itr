package com.server.infrastructure.persistence.jpa;
import com.server.domain.model.DetallePedido;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
public interface DetallePedidoJpaRepository extends JpaRepository<DetallePedido, UUID> {
    List<DetallePedido> findByDeletedAtIsNull();
    Optional<DetallePedido> findByIdAndDeletedAtIsNull(UUID id);
}
