package com.server.api.controller;

import com.server.api.service.PedidoService;
import com.server.api.model.Pedido;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {
    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    // Obtener todos los pedidos
    @GetMapping
    public ResponseEntity<List<Pedido>> findAll() {
        List<Pedido> pedidos = pedidoService.findAll();
        return new ResponseEntity<>(pedidos, HttpStatus.OK);
    }

    // Obtener un pedido por ID
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> findById(@PathVariable UUID id) {
        Optional<Pedido> pedido = pedidoService.findById(id);
        return pedido.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Crear un pedido
    @PostMapping
    public ResponseEntity<Pedido> save(@Valid @RequestBody Pedido pedido) {
        Pedido savedPedido = pedidoService.save(pedido);
        return new ResponseEntity<>(savedPedido, HttpStatus.CREATED);
    }

    // Crear un pedido con detalles
    @PostMapping("/with-details")
    public ResponseEntity<Pedido> saveWithDetails(@Valid @RequestBody PedidoWithDetailsRequest request) {
        Pedido savedPedido = pedidoService.savePedidoWithDetails(request.getPedido(), request.getDetallesPedidos());
        return new ResponseEntity<>(savedPedido, HttpStatus.CREATED);
    }

    // Actualizar un pedido
    @PutMapping("/{id}")
    public ResponseEntity<Pedido> update(@PathVariable UUID id, @Valid @RequestBody Pedido pedido) {
        pedido.setId(id); // Asegúrate de que el ID coincida
        Pedido updatedPedido = pedidoService.update(pedido);
        return new ResponseEntity<>(updatedPedido, HttpStatus.OK);
    }

    // Eliminar un pedido (soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
        pedidoService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
