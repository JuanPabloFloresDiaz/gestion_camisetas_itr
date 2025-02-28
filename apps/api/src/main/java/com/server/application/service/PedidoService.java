package com.server.application.service;
import com.server.domain.repository.PedidoRepository;
import com.server.domain.model.Pedido;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;

    public PedidoService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    // Obtener todos los pedidos (no eliminados)
    public List<Pedido> findAll() {
        return pedidoRepository.findAll();
    }

    // Obtener un pedido por ID (no eliminado)
    public Optional<Pedido> findById(UUID id) {
        return pedidoRepository.findById(id);
    }

    // Guardar un pedido
    public Pedido save(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    // Actualizar un pedido
    public Pedido update(Pedido pedido) {
        return pedidoRepository.update(pedido);
    }

    // Eliminar un pedido (soft delete)
    public void deleteById(UUID id) {
        pedidoRepository.deleteById(id);
    }
}
