package com.server.api.controller;
import com.server.api.service.DetallePedidoService;
import com.server.api.model.DetallePedido;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/detail-pedidos")
public class DetallePedidoController {
    private final DetallePedidoService detallePedidoService;

    public DetallePedidoController(DetallePedidoService detallePedidoService) {
        this.detallePedidoService = detallePedidoService;
    }

    // Obtener todos los detalles de pedidos
    @GetMapping
    public ResponseEntity<List<DetallePedido>> findAll() {
        List<DetallePedido> detallePedidos = detallePedidoService.findAll();
        return new ResponseEntity<>(detallePedidos, HttpStatus.OK);
    }

    // Obtener un detalle de pedido por ID
    @GetMapping("/{id}")
    public ResponseEntity<DetallePedido> findById(@PathVariable UUID id) {
        Optional<DetallePedido> detallePedido = detallePedidoService.findById(id);
        return detallePedido.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Crear un detalle de pedido
    @PostMapping
    public ResponseEntity<DetallePedido> save(@Valid @RequestBody DetallePedido detallePedido) {
        DetallePedido savedDetallePedido = detallePedidoService.save(detallePedido);
        return new ResponseEntity<>(savedDetallePedido, HttpStatus.CREATED);
    }

    // Actualizar un detalle de pedido
    @PutMapping("/{id}")
    public ResponseEntity<DetallePedido> update(@PathVariable UUID id, @Valid @RequestBody DetallePedido detallePedido) {
        detallePedido.setId(id); // Asegúrate de que el ID coincida
        DetallePedido updatedDetallePedido = detallePedidoService.update(detallePedido);
        return new ResponseEntity<>(updatedDetallePedido, HttpStatus.OK);
    }

    // Eliminar un detalle de pedido (soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
        detallePedidoService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
