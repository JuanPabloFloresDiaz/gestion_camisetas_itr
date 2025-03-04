package com.server.api.controller;
import com.server.api.service.CamisaService;
import com.server.api.model.Camisa;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/camisas")
public class CamisaController {

    private final CamisaService camisaService;

    public CamisaController(CamisaService camisaService) {
        this.camisaService = camisaService;
    }

    // Obtener todas las camisas
    @GetMapping
    public ResponseEntity<List<Camisa>> findAll() {
        List<Camisa> camisas = camisaService.findAll();
        return new ResponseEntity<>(camisas, HttpStatus.OK);
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
    public ResponseEntity<Camisa> update(@PathVariable UUID id, @RequestBody Camisa camisa) {
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
