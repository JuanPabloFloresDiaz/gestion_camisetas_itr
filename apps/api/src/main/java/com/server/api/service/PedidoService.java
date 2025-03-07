package com.server.api.service;

import com.server.api.dto.PedidoDTO;
import com.server.api.model.Pedido;
import com.server.api.repository.PedidoRepository;
import com.server.api.repository.DetallePedidoRepository;
import com.server.api.repository.DetalleCamisaRepository;
import com.server.api.model.DetalleCamisa;
import com.server.api.model.DetallePedido;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final DetallePedidoRepository detallePedidoRepository;
    private final DetalleCamisaRepository detalleCamisaRepository;
    private final EntityManager entityManager;
    private static final Logger log = LoggerFactory.getLogger(PedidoService.class);

    public PedidoService(PedidoRepository pedidoRepository, DetallePedidoRepository detallePedidoRepository,
                         DetalleCamisaRepository detalleCamisaRepository, EntityManager entityManager) {
        this.pedidoRepository = pedidoRepository;
        this.detallePedidoRepository = detallePedidoRepository;
        this.detalleCamisaRepository = detalleCamisaRepository;
        this.entityManager = entityManager;
    }

    // Obtener todos los pedidos (no eliminados)
    public List<PedidoDTO> findAll() {
        List<Pedido> pedidos = pedidoRepository.findAll();
        return pedidos.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // Obtener un pedido por ID (no eliminado)
    public Optional<PedidoDTO> findById(UUID id) {
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        return pedido.map(this::convertToDTO);
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

    @Transactional
    public Pedido savePedidoWithDetails(Pedido pedido, List<DetallePedido> detallesPedidos) {
        try {
            //pedido.setEstadoPedido(EstadoPedido.Pendiente);
            // 1. Guardar el pedido primero
            Pedido savedPedido = pedidoRepository.save(pedido);

            // 2. Vincular y validar los detalles
            for (DetallePedido detalle : detallesPedidos) {
                detalle.setPedido(savedPedido); // Establecer relación bidireccional

                // Validar que el detalleCamisa exista
                DetalleCamisa detalleCamisa = detalleCamisaRepository.findById(detalle.getDetalleCamisa().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Detalle de camisa no encontrado"));

                detalle.setDetalleCamisa(detalleCamisa);
            }

            // 3. Guardar todos los detalles
            List<DetallePedido> savedDetails = detallePedidoRepository.saveAll(detallesPedidos);
            savedPedido.setDetallesPedidos(savedDetails); // Actualizar la relación

            // Flush para capturar errores antes de comprometer la transacción
            entityManager.flush();

            return savedPedido;

        } catch (DataIntegrityViolationException e) {
            // Manejar errores de integridad de datos
            Throwable rootCause = e.getRootCause();
            log.error("Error de integridad de datos: "
                    + (rootCause != null ? rootCause.getMessage() : "Causa desconocida"), e);
            throw new TransactionSystemException("Error de integridad de datos: "
                    + (rootCause != null ? rootCause.getMessage() : "Causa desconocida"), e);
        } catch (Exception e) {
            // Manejar otros tipos de excepciones
            log.error("Error al guardar el pedido con detalles: " + e.getMessage(), e);
            throw new TransactionSystemException("Error al guardar el pedido con detalles: " + e.getMessage(), e);
        }
    }

    private PedidoDTO convertToDTO(Pedido pedido) {
        PedidoDTO pedidoDTO = new PedidoDTO();
        pedidoDTO.setCliente(pedido.getCliente());
        return pedidoDTO;
    }
}