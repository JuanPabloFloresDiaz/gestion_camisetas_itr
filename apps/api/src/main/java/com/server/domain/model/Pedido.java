package com.server.domain.model;

import com.fasterxml.jackson.annotation.*;
import com.server.domain.common.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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

    @NotNull(message = "El estado del pedido es obligatorio")
    @Enumerated(EnumType.STRING)
    @Column(name = "estado_pedido", columnDefinition = "estado_pedido_enum DEFAULT 'Pendiente'")
    private EstadoPedido estadoPedido = EstadoPedido.Pendiente;

    @Column(name = "fecha_pedido")
    private LocalDateTime fechaPedido;

    @Size(max = 200, message = "La dirección del pedido no puede tener más de 200 caracteres")
    @Column(name = "direccion_pedido", length = 200)
    private String direccionPedido;

    // Relación con Cliente
    @NotNull(message = "El cliente es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference 
    @JoinColumn(name = "id_cliente", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_carrito_del_cliente"))
    private Cliente cliente;

    // Relación inversa: Un pedido puede tener muchos detalles
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DetallePedido> detallesPedidos;
}