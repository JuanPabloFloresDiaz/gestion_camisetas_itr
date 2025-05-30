package com.server.api.controller;

import com.server.api.service.ClienteService;
import com.server.api.model.Cliente;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    // Obtener todos los clientes
    @GetMapping
    public ResponseEntity<Map<String, Object>> findAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int limit,
            @RequestParam(required = false) String search) {

        Page<Cliente> clientesPage = clienteService.findAll(page, limit, search);

        Map<String, Object> response = new HashMap<>();
        response.put("data", clientesPage.getContent());
        response.put("total", clientesPage.getTotalElements());
        response.put("page", page);
        response.put("limit", limit);
        response.put("totalPages", clientesPage.getTotalPages());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Obtener un cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> findById(@PathVariable UUID id) {
        Optional<Cliente> cliente = clienteService.findById(id);
        return cliente.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Crear un cliente
    @PostMapping
    public ResponseEntity<Cliente> save(@Valid @RequestBody Cliente cliente) {
        Cliente savedCliente = clienteService.save(cliente);
        return new ResponseEntity<>(savedCliente, HttpStatus.CREATED);
    }

    // Actualizar un cliente
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> update(@PathVariable UUID id, @Valid @RequestBody Cliente cliente) {
        cliente.setId(id); // Asegúrate de que el ID coincida
        Cliente updatedCliente = clienteService.update(cliente);
        return new ResponseEntity<>(updatedCliente, HttpStatus.OK);
    }

    // Eliminar un cliente (soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
        clienteService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Buscar un cliente por correo
    @GetMapping("/correo/{correo}")
    public ResponseEntity<Cliente> findByCorreo(@PathVariable String correo) {
        Optional<Cliente> cliente = clienteService.findByCorreo(correo);
        return cliente.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
