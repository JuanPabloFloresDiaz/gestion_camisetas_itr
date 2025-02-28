package com.server.infrastructure.persistence.jpa;
import com.server.domain.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
public interface ClienteJpaRepository extends JpaRepository<Cliente, UUID> {
    List<Cliente> findByDeletedAtIsNull();
    Optional<Cliente> findByIdAndDeletedAtIsNull(UUID id);
    Optional<Cliente> findByCorreoAndDeletedAtIsNull(String correo);
}
