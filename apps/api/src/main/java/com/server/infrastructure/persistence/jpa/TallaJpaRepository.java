package com.server.infrastructure.persistence.jpa;
import com.server.domain.model.Talla;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
public interface TallaJpaRepository extends JpaRepository<Talla, UUID> {
    List<Talla> findByDeletedAtIsNull();
    Optional<Talla> findByIdAndDeletedAtIsNull(UUID id);
    Optional<Talla> findByNombreAndDeletedAtIsNull(String nombre);

}
