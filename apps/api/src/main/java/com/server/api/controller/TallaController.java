package com.server.api.controller;

import com.server.api.service.TallaService;
import com.server.api.model.Talla;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/tallas")
public class TallaController {

    private final TallaService tallaService;

    public TallaController(TallaService tallaService) {
        this.tallaService = tallaService;
    }

    // Obtener todas las tallas sin paginación
    @GetMapping("/all")
    public ResponseEntity<Iterable<Talla>> findAll() {
        Iterable<Talla> tallas = tallaService.findAll();
        return new ResponseEntity<>(tallas, HttpStatus.OK);
    }

    // Obtener todas las tallas con paginación
    @GetMapping
    public ResponseEntity<Map<String, Object>> findAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int limit,
            @RequestParam(required = false) String search) {

        Page<Talla> tallasPage = tallaService.findAll(page, limit, search);

        Map<String, Object> response = new HashMap<>();
        response.put("data", tallasPage.getContent());
        response.put("total", tallasPage.getTotalElements());
        response.put("page", page);
        response.put("limit", limit);
        response.put("totalPages", tallasPage.getTotalPages());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Obtener una talla por ID
    @GetMapping("/{id}")
    public ResponseEntity<Talla> findById(@PathVariable UUID id) {
        Optional<Talla> talla = tallaService.findById(id);
        return talla.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Crear una talla
    @PostMapping
    public ResponseEntity<Talla> save(@Valid @RequestBody Talla talla) {
        Talla savedTalla = tallaService.save(talla);
        return new ResponseEntity<>(savedTalla, HttpStatus.CREATED);
    }

    // Actualizar una talla
    @PutMapping("/{id}")
    public ResponseEntity<Talla> update(@PathVariable UUID id, @Valid @RequestBody Talla talla) {
        talla.setId(id); // Asegúrate de que el ID coincida
        Talla updatedTalla = tallaService.update(talla);
        return new ResponseEntity<>(updatedTalla, HttpStatus.OK);
    }

    // Eliminar una talla (soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
        tallaService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}