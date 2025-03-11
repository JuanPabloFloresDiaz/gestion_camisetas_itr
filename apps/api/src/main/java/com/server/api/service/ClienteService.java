package com.server.api.service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.server.api.repository.ClienteRepository;
import com.server.api.model.Cliente;
import java.util.Optional;
import java.util.UUID;
@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    // Obtener todos los clientes (no eliminados)
    public Page<Cliente> findAll(int page, int limit, String searchTerm) {
        Pageable pageable = PageRequest.of(page - 1, limit); // Pagina base 1
        if (searchTerm != null && !searchTerm.isEmpty()) {
            return clienteRepository.searchAllFields(searchTerm.toLowerCase(), pageable);
        }
        return clienteRepository.findAll(pageable);
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
