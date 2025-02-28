package com.server.infrastructure.persistence.jpa;
import com.server.domain.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
public interface PedidoJpaRepository extends JpaRepository<Pedido, UUID> {
    List<Pedido> findByDeletedAtIsNull();
    Optional<Pedido> findByIdAndDeletedAtIsNull(UUID id);
}
