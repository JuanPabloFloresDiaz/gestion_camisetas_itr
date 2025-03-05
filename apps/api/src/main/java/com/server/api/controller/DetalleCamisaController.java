package com.server.api.controller;
import com.server.api.service.DetalleCamisaService;
import com.server.api.model.DetalleCamisa;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/detail-camisas")
public class DetalleCamisaController {
    private final DetalleCamisaService detalleCamisaService;

    public DetalleCamisaController(DetalleCamisaService detalleCamisaService) {
        this.detalleCamisaService = detalleCamisaService;
    }

    // Obtener todos los detalles de camisas
    @GetMapping
    public ResponseEntity<List<DetalleCamisa>> findAll() {
        List<DetalleCamisa> detalleCamisas = detalleCamisaService.findAll();
        return new ResponseEntity<>(detalleCamisas, HttpStatus.OK);
    }

    // Obtener un detalle de camisa por ID
    @GetMapping("/{id}")
    public ResponseEntity<DetalleCamisa> findById(@PathVariable UUID id) {
        Optional<DetalleCamisa> detalleCamisa = detalleCamisaService.findById(id);
        return detalleCamisa.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Crear un detalle de camisa
    @PostMapping
    public ResponseEntity<DetalleCamisa> save(@Valid @RequestBody DetalleCamisa detalleCamisa) {
        DetalleCamisa savedDetalleCamisa = detalleCamisaService.save(detalleCamisa);
        return new ResponseEntity<>(savedDetalleCamisa, HttpStatus.CREATED);
    }

    // Crear varios detalles de camisa
    @PostMapping("/all")
    public ResponseEntity<List<DetalleCamisa>> saveAll(@Valid @RequestBody List<DetalleCamisa> detallesCamisa) {
        List<DetalleCamisa> savedDetallesCamisa = detalleCamisaService.saveAll(detallesCamisa);
        return new ResponseEntity<>(savedDetallesCamisa, HttpStatus.CREATED);
    }

    // Actualizar un detalle de camisa
    @PutMapping("/{id}")
    public ResponseEntity<DetalleCamisa> update(@PathVariable UUID id, @Valid @RequestBody DetalleCamisa detalleCamisa) {
        detalleCamisa.setId(id); // Asegúrate de que el ID coincida
        DetalleCamisa updatedDetalleCamisa = detalleCamisaService.update(detalleCamisa);
        return new ResponseEntity<>(updatedDetalleCamisa, HttpStatus.OK);
    }

    // Eliminar un detalle de camisa (soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
        detalleCamisaService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Buscar detalles de camisas por camisa
    @GetMapping("/camisa/{camisaId}")
    public ResponseEntity<List<DetalleCamisa>> findByCamisa(@PathVariable UUID camisaId) {
        List<DetalleCamisa> detallesCamisa = detalleCamisaService.findByCamisa(camisaId);
        return new ResponseEntity<>(detallesCamisa, HttpStatus.OK);
    }
}
