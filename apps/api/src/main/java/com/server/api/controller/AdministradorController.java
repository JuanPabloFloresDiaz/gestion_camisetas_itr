package com.server.api.controller;

import com.server.api.service.AdministradorService;
import com.server.api.model.Administrador;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/administradores")
public class AdministradorController {

    private final AdministradorService administradorService;

    public AdministradorController(AdministradorService administradorService) {
        this.administradorService = administradorService;
    }

    // Obtener todos los administradores con paginación
    @GetMapping
    public ResponseEntity<Map<String, Object>> findAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int limit,
            @RequestParam(required = false) String search) {

        Page<Administrador> adminsPage = administradorService.findAll(page, limit, search);

        Map<String, Object> response = new HashMap<>();
        response.put("data", adminsPage.getContent());
        response.put("total", adminsPage.getTotalElements());
        response.put("page", page);
        response.put("limit", limit);
        response.put("totalPages", adminsPage.getTotalPages());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Obtener todos los administradores sin paginación
    @GetMapping("/all")
    public ResponseEntity<Iterable<Administrador>> findAll() {
        Iterable<Administrador> administradores = administradorService.findAll();
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