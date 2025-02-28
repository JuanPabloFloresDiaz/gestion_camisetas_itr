package com.server.infrastructure.persistence;

import com.server.domain.repository.AdministradorRepository;
import com.server.domain.model.Administrador;
import com.server.infrastructure.persistence.jpa.AdministradorJpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class AdministradorRepositoryImpl implements AdministradorRepository {

    private final AdministradorJpaRepository administradorJpaRepository;

    public AdministradorRepositoryImpl(AdministradorJpaRepository administradorJpaRepository) {
        this.administradorJpaRepository = administradorJpaRepository;
    }

    @Override
    public List<Administrador> findAll() {
        // Filtra solo los registros no eliminados (deleted_at es nulo)
        return administradorJpaRepository.findByDeletedAtIsNull();
    }

    @Override
    public Optional<Administrador> findById(UUID id) {
        // Filtra solo los registros no eliminados
        return administradorJpaRepository.findByIdAndDeletedAtIsNull(id);
    }

    @Override
    public Administrador save(Administrador administrador) {
        return administradorJpaRepository.save(administrador);
    }

    @Override
    public Administrador update(Administrador administrador) {
        // Actualiza el registro si existe
        return administradorJpaRepository.save(administrador);
    }

    @Override
    public void deleteById(UUID id) {
        // Soft delete: Marca el registro como eliminado (actualiza deleted_at)
        administradorJpaRepository.findById(id).ifPresent(administrador -> {
            administrador.setDeletedAt(LocalDateTime.now());
            administradorJpaRepository.save(administrador);
        });
    }

    @Override
    public Optional<Administrador> findByCorreo(String correo) {
        // Filtra solo los registros no eliminados
        return administradorJpaRepository.findByCorreoAndDeletedAtIsNull(correo);
    }
}