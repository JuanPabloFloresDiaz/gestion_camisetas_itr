package com.server.application.service;

import com.server.domain.repository.AdministradorRepository;
import com.server.domain.model.Administrador;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AdministradorService {

    private final AdministradorRepository administradorRepository;

    public AdministradorService(AdministradorRepository administradorRepository) {
        this.administradorRepository = administradorRepository;
    }

    // Obtener todos los administradores (no eliminados)
    public List<Administrador> findAll() {
        return administradorRepository.findAll();
    }

    // Obtener un administrador por ID (no eliminado)
    public Optional<Administrador> findById(UUID id) {
        return administradorRepository.findById(id);
    }

    // Guardar un administrador
    public Administrador save(Administrador administrador) {
        return administradorRepository.save(administrador);
    }

    // Actualizar un administrador
    public Administrador update(Administrador administrador) {
        return administradorRepository.update(administrador);
    }

    // Eliminar un administrador (soft delete)
    public void deleteById(UUID id) {
        administradorRepository.deleteById(id);
    }

    // Buscar un administrador por correo (no eliminado)
    public Optional<Administrador> findByCorreo(String correo) {
        return administradorRepository.findByCorreo(correo);
    }
}