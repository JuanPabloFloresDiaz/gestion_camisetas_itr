package com.server.api.controller;
import com.server.application.service.TallaService;
import com.server.domain.model.Talla;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/camisas")
public class TallaController {
    private final TallaService tallaService;

    public TallaController(TallaService tallaService) {
        this.tallaService = tallaService;
    }

    // Obtener todas las tallas
    @GetMapping
    public ResponseEntity<List<Talla>> findAll() {
        List<Talla> tallas = tallaService.findAll();
        return new ResponseEntity<>(tallas, HttpStatus.OK);
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
