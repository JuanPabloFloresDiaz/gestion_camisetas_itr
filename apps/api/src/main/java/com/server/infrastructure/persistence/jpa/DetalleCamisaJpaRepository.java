package com.server.infrastructure.persistence.jpa;
import com.server.domain.model.DetalleCamisa;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
public interface DetalleCamisaJpaRepository extends JpaRepository<DetalleCamisa, UUID> {
    List<DetalleCamisa> findByDeletedAtIsNull();
    Optional<DetalleCamisa> findByIdAndDeletedAtIsNull(UUID id);
}
