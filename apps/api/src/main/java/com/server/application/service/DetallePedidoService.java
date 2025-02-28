package com.server.application.service;
import com.server.domain.repository.DetallePedidoRepository;
import com.server.domain.model.DetallePedido;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Service
public class DetallePedidoService {

    private final DetallePedidoRepository detallePedidoRepository;

    public DetallePedidoService(DetallePedidoRepository detallePedidoRepository) {
        this.detallePedidoRepository = detallePedidoRepository;
    }

    // Obtener todos los detalles de pedidos (no eliminados)
    public List<DetallePedido> findAll() {
        return detallePedidoRepository.findAll();
    }

    // Obtener un detalle de pedido por ID (no eliminado)
    public Optional<DetallePedido> findById(UUID id) {
        return detallePedidoRepository.findById(id);
    }

    // Guardar un detalle de pedido
    public DetallePedido save(DetallePedido detallePedido) {
        return detallePedidoRepository.save(detallePedido);
    }

    // Actualizar un detalle de pedido
    public DetallePedido update(DetallePedido detallePedido) {
        return detallePedidoRepository.update(detallePedido);
    }

    // Eliminar un detalle de pedido (soft delete)
    public void deleteById(UUID id) {
        detallePedidoRepository.deleteById(id);
    }
    
}
