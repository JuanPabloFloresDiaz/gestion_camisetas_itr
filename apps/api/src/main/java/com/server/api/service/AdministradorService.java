package com.server.api.service;

import com.server.api.repository.AdministradorRepository;
import com.server.api.model.Administrador;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AdministradorService {

    private final AdministradorRepository administradorRepository;
    private final PasswordEncoder passwordEncoder;

    public AdministradorService(AdministradorRepository administradorRepository, PasswordEncoder passwordEncoder) {
            this.administradorRepository = administradorRepository;
            this.passwordEncoder = passwordEncoder;
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
        administrador.setClave(passwordEncoder.encode(administrador.getClave()));
        return administradorRepository.save(administrador);
    }

    // Actualizar un administrador
    public Administrador update(Administrador administrador) {
        // Asegúrate de que el administrador exista antes de actualizarlo
        Optional<Administrador> existingAdministrador = administradorRepository.findById(administrador.getId());
        if (existingAdministrador.isPresent()) {
            // Si la clave no se proporciona en la solicitud, mantén la clave existente
            if (administrador.getClave() == null || administrador.getClave().isEmpty()) {
                administrador.setClave(existingAdministrador.get().getClave());
            }
            // Guarda el administrador actualizado
            return administradorRepository.save(administrador);
        } else {
            // Maneja el caso en que el administrador no existe
            throw new RuntimeException("Administrador no encontrado");
        }
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