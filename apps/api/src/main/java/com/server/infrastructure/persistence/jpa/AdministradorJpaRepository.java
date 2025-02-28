package com.server.infrastructure.persistence.jpa;

import com.server.domain.model.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AdministradorJpaRepository extends JpaRepository<Administrador, UUID> {

    // Busca todos los registros no eliminados
    List<Administrador> findByDeletedAtIsNull();

    // Busca un registro por ID que no esté eliminado
    Optional<Administrador> findByIdAndDeletedAtIsNull(UUID id);

    // Busca un registro por correo que no esté eliminado
    Optional<Administrador> findByCorreoAndDeletedAtIsNull(String correo);
}