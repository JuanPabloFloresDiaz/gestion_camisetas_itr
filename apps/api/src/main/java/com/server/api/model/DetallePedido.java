package com.server.api.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "tb_detalles_pedidos")
@EqualsAndHashCode(callSuper = true)
public class DetallePedido extends BaseEntity {

    @NotNull(message = "El precio del producto es obligatorio")
    @DecimalMin(value = "0.00", message = "El precio del producto debe ser mayor o igual a $0.00")
    @DecimalMax(value = "999.99", message = "El precio del producto debe ser menor o igual a $999.99")
    @Digits(integer = 3, fraction = 2, message = "El precio del producto debe tener máximo 3 enteros y 2 decimales")
    @Column(name = "precio_producto", nullable = false)
    private BigDecimal precioProducto;

    @NotNull(message = "La cantidad comprada es obligatoria")
    @Min(value = 1, message = "La cantidad comprada debe ser mayor o igual a 1")
    @Max(value = 10, message = "La cantidad comprada debe ser menor o igual a 10")
    @Column(name = "cantidad_comprada", nullable = false)
    private Integer cantidadComprada;

    // Relación con Pedido
    @NotNull(message = "El pedido es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference("pedido-detalles") 
    @JoinColumn(name = "id_pedido", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_detalles_pedido"))
    private Pedido pedido;

    // Relación con DetalleCamisa
    @NotNull(message = "El detalle de la camisa es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference("detalleCamisa-detallePedidos") 
    @JoinColumn(name = "id_detalle_camisa", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_detalle_camisa_pedido"))
    private DetalleCamisa detalleCamisa;
}