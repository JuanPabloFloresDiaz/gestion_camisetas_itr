package com.server.infrastructure.persistence.jpa;
import com.server.domain.model.TipoCamisa;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
public interface TipoCamisaJpaRepository extends JpaRepository<TipoCamisa, UUID> {
    List<TipoCamisa> findByDeletedAtIsNull();
    Optional<TipoCamisa> findByIdAndDeletedAtIsNull(UUID id);
    Optional<TipoCamisa> findByNombreAndDeletedAtIsNull(String nombre);
}
