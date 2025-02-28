package com.server.api.controller;
import com.server.application.service.TipoCamisaService;
import com.server.domain.model.TipoCamisa;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/camisas")
public class TipoCamisaController {
        private final TipoCamisaService tipoCamisaService;

        public TipoCamisaController(TipoCamisaService tipoCamisaService) {
                this.tipoCamisaService = tipoCamisaService;
        }

        // Obtener todos los tipos de camisas
        @GetMapping
        public ResponseEntity<List<TipoCamisa>> findAll() {
                List<TipoCamisa> tipoCamisas = tipoCamisaService.findAll();
                return new ResponseEntity<>(tipoCamisas, HttpStatus.OK);
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
