package com.server.api.service;
import com.server.api.repository.ClienteRepository;
import com.server.api.model.Cliente;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    // Obtener todos los clientes (no eliminados)
    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    // Obtener un cliente por ID (no eliminado)
    public Optional<Cliente> findById(UUID id) {
        return clienteRepository.findById(id);
    }

    // Guardar un cliente
    public Cliente save(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    // Actualizar un cliente
    public Cliente update(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    // Eliminar un cliente (soft delete)
    public void deleteById(UUID id) {
        clienteRepository.deleteById(id);
    }

    // Buscar un cliente por correo (no eliminado)
    public Optional<Cliente> findByCorreo(String correo) {
        return clienteRepository.findByCorreo(correo);
    }
}
