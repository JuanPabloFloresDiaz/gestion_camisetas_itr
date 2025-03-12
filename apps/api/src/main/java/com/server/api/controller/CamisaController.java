package com.server.api.controller;

import com.server.api.service.CamisaService;
import com.server.api.model.Camisa;
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
@RequestMapping("/api/camisas")
public class CamisaController {

    private final CamisaService camisaService;

    public CamisaController(CamisaService camisaService) {
        this.camisaService = camisaService;
    }

    // Obtener todas las camisas con paginación
    @GetMapping
    public ResponseEntity<Map<String, Object>> findAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int limit,
            @RequestParam(required = false) String search) {

        Page<Camisa> camisasPage = camisaService.findAll(page, limit, search);

        Map<String, Object> response = new HashMap<>();
        response.put("data", camisasPage.getContent());
        response.put("total", camisasPage.getTotalElements());
        response.put("page", page);
        response.put("limit", limit);
        response.put("totalPages", camisasPage.getTotalPages());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Obtener una camisa por ID
    @GetMapping("/{id}")
    public ResponseEntity<Camisa> findById(@PathVariable UUID id) {
        Optional<Camisa> camisa = camisaService.findById(id);
        return camisa.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Crear una camisa
    @PostMapping
    public ResponseEntity<Camisa> save(@Valid @RequestBody Camisa camisa) {
        Camisa savedCamisa = camisaService.save(camisa);
        return new ResponseEntity<>(savedCamisa, HttpStatus.CREATED);
    }

    // Actualizar una camisa
    @PutMapping("/{id}")
    public ResponseEntity<Camisa> update(@PathVariable UUID id, @Valid @RequestBody Camisa camisa) {
        camisa.setId(id); // Asegúrate de que el ID coincida
        Camisa updatedCamisa = camisaService.update(camisa);
        return new ResponseEntity<>(updatedCamisa, HttpStatus.OK);
    }

    // Eliminar una camisa (soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
        camisaService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}