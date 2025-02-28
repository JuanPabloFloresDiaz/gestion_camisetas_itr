package com.server.infrastructure.persistence.jpa;

import com.server.domain.model.Camisa;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CamisaJpaRepository extends JpaRepository<Camisa, UUID>{

    // Busca todos los registros no eliminados
    List<Camisa> findByDeletedAtIsNull();

    // Busca un registro por ID que no esté eliminado
    Optional<Camisa> findByIdAndDeletedAtIsNull(UUID id);
}
