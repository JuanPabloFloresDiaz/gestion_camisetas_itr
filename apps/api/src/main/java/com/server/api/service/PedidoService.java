package com.server.api.service;
import com.server.api.repository.PedidoRepository;
import com.server.api.repository.DetallePedidoRepository;
import com.server.api.model.DetallePedido;
import com.server.api.model.Pedido;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final DetallePedidoRepository detallePedidoRepository;

    public PedidoService(PedidoRepository pedidoRepository, DetallePedidoRepository detallePedidoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.detallePedidoRepository = detallePedidoRepository;
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
        return pedidoRepository.save(pedido);
    }

    // Eliminar un pedido (soft delete)
    public void deleteById(UUID id) {
        pedidoRepository.deleteById(id);
    }

    // Guardar un pedido y sus detalles
    @Transactional
    public Pedido savePedidoWithDetails(Pedido pedido, List<DetallePedido> detallesPedidos) {
        Pedido savedPedido = pedidoRepository.save(pedido);
        for (DetallePedido detalle : detallesPedidos) {
            detalle.setPedido(savedPedido);
        }
        detallePedidoRepository.saveAll(detallesPedidos);
        return savedPedido;
    }
}
