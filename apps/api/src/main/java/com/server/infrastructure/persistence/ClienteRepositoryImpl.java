package com.server.infrastructure.persistence;

import com.server.domain.repository.ClienteRepository;
import com.server.domain.model.Cliente;
import com.server.infrastructure.persistence.jpa.ClienteJpaRepository;

import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class ClienteRepositoryImpl implements ClienteRepository{

    private final ClienteJpaRepository clienteJpaRepository;

    public ClienteRepositoryImpl(ClienteJpaRepository clienteJpaRepository) {
        this.clienteJpaRepository = clienteJpaRepository;
    }

    @Override
    public List<Cliente> findAll() {
        return clienteJpaRepository.findByDeletedAtIsNull();
    }

    @Override
    public Optional<Cliente> findById(UUID id) {
        return clienteJpaRepository.findByIdAndDeletedAtIsNull(id);
    }

    @Override
    public Cliente save(Cliente cliente) {
        return clienteJpaRepository.save(cliente);
    }

    @Override
    public Cliente update(Cliente cliente) {
        return clienteJpaRepository.save(cliente);
    }

    @Override
    public void deleteById(UUID id) {
        Cliente cliente = clienteJpaRepository.findByIdAndDeletedAtIsNull(id).orElseThrow();
        cliente.setDeletedAt(LocalDateTime.now());
        clienteJpaRepository.save(cliente);
    }

    @Override
    public Optional<Cliente> findByCorreo(String correo) {
        return clienteJpaRepository.findByCorreoAndDeletedAtIsNull(correo);
    }
}
