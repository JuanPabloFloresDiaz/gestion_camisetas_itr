package com.server.api.controller;

import com.server.api.service.AdministradorService;
import com.server.api.model.Administrador;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
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
    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE,
            MediaType.MULTIPART_FORM_DATA_VALUE }, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Administrador> save(@Valid @RequestBody Administrador administrador) {
        Administrador savedAdministrador = administradorService.save(administrador);
        return new ResponseEntity<>(savedAdministrador, HttpStatus.CREATED);
    }

    // Actualizar un administrador
    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Administrador> update(@PathVariable UUID id, @RequestBody Administrador administrador) {
        // Asegúrate de que el ID del administrador coincida con el ID de la URL
        administrador.setId(id);
    
        // Llama al servicio para actualizar el administrador
        Administrador updatedAdministrador = administradorService.update(administrador);
    
        // Devuelve la respuesta con el administrador actualizado
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