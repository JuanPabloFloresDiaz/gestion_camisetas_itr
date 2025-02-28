package com.server.api.controller;

import com.server.application.service.AdministradorService;
import com.server.domain.model.Administrador;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/administradores")
public class AdministradorController {

    private final AdministradorService administradorService;

    public AdministradorController(AdministradorService administradorService) {
        this.administradorService = administradorService;
    }

    // Obtener todos los administradores
    @GetMapping
    public ResponseEntity<List<Administrador>> findAll() {
        List<Administrador> administradores = administradorService.findAll();
        return new ResponseEntity<>(administradores, HttpStatus.OK);
    }

    // Obtener un administrador por ID
    @GetMapping("/{id}")
    public ResponseEntity<Administrador> findById(@PathVariable UUID id) {
        Optional<Administrador> administrador = administradorService.findById(id);
        return administrador.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Crear un administrador
    @PostMapping
    public ResponseEntity<Administrador> save(@RequestBody Administrador administrador) {
        Administrador savedAdministrador = administradorService.save(administrador);
        return new ResponseEntity<>(savedAdministrador, HttpStatus.CREATED);
    }

    // Actualizar un administrador
    @PutMapping("/{id}")
    public ResponseEntity<Administrador> update(@PathVariable UUID id, @RequestBody Administrador administrador) {
        administrador.setId(id); // Asegúrate de que el ID coincida
        Administrador updatedAdministrador = administradorService.update(administrador);
        return new ResponseEntity<>(updatedAdministrador, HttpStatus.OK);
    }

    // Eliminar un administrador (soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
        administradorService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Buscar un administrador por correo
    @GetMapping("/correo/{correo}")
    public ResponseEntity<Administrador> findByCorreo(@PathVariable String correo) {
        Optional<Administrador> administrador = administradorService.findByCorreo(correo);
        return administrador.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}