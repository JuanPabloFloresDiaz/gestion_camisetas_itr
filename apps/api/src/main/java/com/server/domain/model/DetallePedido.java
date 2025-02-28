package com.server.domain.model;

import com.server.domain.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "tb_detalles_pedidos")
@EqualsAndHashCode(callSuper = true)
public class DetallePedido extends BaseEntity {

    @Column(name = "precio_producto", nullable = false)
    private BigDecimal precioProducto;

    @Column(name = "cantidad_comprada", nullable = false)
    private Integer cantidadComprada;

    // Relación con Pedido
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pedido", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_detalles_pedido"))
    private Pedido pedido;

    // Relación con DetalleCamisa
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_detalle_camisa", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_detalle_camisa_pedido"))
    private DetalleCamisa detalleCamisa;
}