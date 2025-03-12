package com.server.api.controller;

import com.server.api.service.TipoCamisaService;
import com.server.api.model.TipoCamisa;
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
@RequestMapping("/api/tipo-camisas")
public class TipoCamisaController {

        private final TipoCamisaService tipoCamisaService;

        public TipoCamisaController(TipoCamisaService tipoCamisaService) {
                this.tipoCamisaService = tipoCamisaService;
        }

        // Obtener todos los tipos de camisas con paginación
        @GetMapping
        public ResponseEntity<Map<String, Object>> findAll(
                        @RequestParam(defaultValue = "1") int page,
                        @RequestParam(defaultValue = "5") int limit,
                        @RequestParam(required = false) String search) {

                Page<TipoCamisa> tipoCamisasPage = tipoCamisaService.findAll(page, limit, search);

                Map<String, Object> response = new HashMap<>();
                response.put("data", tipoCamisasPage.getContent());
                response.put("total", tipoCamisasPage.getTotalElements());
                response.put("page", page);
                response.put("limit", limit);
                response.put("totalPages", tipoCamisasPage.getTotalPages());

                return new ResponseEntity<>(response, HttpStatus.OK);
        }

        // Obtener un tipo de camisa por ID
        @GetMapping("/{id}")
        public ResponseEntity<TipoCamisa> findById(@PathVariable UUID id) {
                Optional<TipoCamisa> tipoCamisa = tipoCamisaService.findById(id);
                return tipoCamisa.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }

        // Crear un tipo de camisa
        @PostMapping
        public ResponseEntity<TipoCamisa> save(@Valid @RequestBody TipoCamisa tipoCamisa) {
                TipoCamisa savedTipoCamisa = tipoCamisaService.save(tipoCamisa);
                return new ResponseEntity<>(savedTipoCamisa, HttpStatus.CREATED);
        }

        // Actualizar un tipo de camisa
        @PutMapping("/{id}")
        public ResponseEntity<TipoCamisa> update(@PathVariable UUID id, @Valid @RequestBody TipoCamisa tipoCamisa) {
                tipoCamisa.setId(id); // Asegúrate de que el ID coincida
                TipoCamisa updatedTipoCamisa = tipoCamisaService.update(tipoCamisa);
                return new ResponseEntity<>(updatedTipoCamisa, HttpStatus.OK);
        }

        // Eliminar un tipo de camisa (soft delete)
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
                tipoCamisaService.deleteById(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
}