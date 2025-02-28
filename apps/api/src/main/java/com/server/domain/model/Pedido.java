package com.server.domain.model;

import com.server.domain.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "tb_pedidos")
@EqualsAndHashCode(callSuper = true)
public class Pedido extends BaseEntity {

    // Estado del pedido como Enum
    public enum EstadoPedido {
        Pendiente,
        Entregado,
        EnCamino,
        Cancelado
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_pedido", columnDefinition = "estado_pedido_enum DEFAULT 'Pendiente'")
    private EstadoPedido estadoPedido = EstadoPedido.Pendiente;

    @Column(name = "fecha_pedido")
    private LocalDateTime fechaPedido;

    @Column(name = "direccion_pedido", length = 50)
    private String direccionPedido;

    // Relación con Cliente
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cliente", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_carrito_del_cliente"))
    private Cliente cliente;

    // Relación inversa: Un pedido puede tener muchos detalles
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetallePedido> detallesPedidos;
}