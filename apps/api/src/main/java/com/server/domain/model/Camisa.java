package com.server.domain.model;

import com.fasterxml.jackson.annotation.*;
import com.server.domain.common.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@Table(name = "tb_camisas")
@EqualsAndHashCode(callSuper = true)
public class Camisa extends BaseEntity {

    @NotBlank(message = "El nombre de la camisa es obligatorio")
    @Size(max = 60, message = "El nombre de la camisa no puede tener más de 60 caracteres")
    @Column(name = "nombre_camisa",
            nullable = false,
            length = 60)
    private String nombre;

    @NotBlank(message = "La descripción es obligatorio")
    @Size(max = 300, message = "La descripción no puede tener más de 300 caracteres")
    @Column(name = "descripcion_camisa",
            nullable = false)
    private String descripcion;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.00", message = "El precio debe ser mayor o igual a $0.00")
    @DecimalMax(value = "999.99", message = "El precio debe ser menor o igual a $999.99")
    @Digits(integer = 3, fraction = 2, message = "El precio debe tener máximo 3 enteros y 2 decimales")
    @Column(name = "precio",
            nullable = false,
            precision = 5,
            scale = 2)
    private BigDecimal precio;

    @NotNull(message = "El estado de venta es obligatorio")
    @Column(name = "estado_venta",
            columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean estadoVenta = true;

    @Column(name = "foto_principal",
            length = 50)
    private String fotoPrincipal;

    // Relación con Administrador
    @NotNull(message = "El administrador es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference 
    @JoinColumn(name = "id_administrador", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_administrador_de_camisa"))
    private Administrador administrador;

    // Relación con TipoCamisa
    @NotNull(message = "El tipo de camisa es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference 
    @JoinColumn(name = "id_tipo_camisa", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_tipo_de_camisa_producto"))
    private TipoCamisa tipoCamisa;

    // Relación con DetalleCamisa
    @OneToMany(mappedBy = "camisa", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DetalleCamisa> detallesCamisa;
    
    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public Boolean getEstadoVenta() {
        return estadoVenta;
    }

    public void setEstadoVenta(Boolean estadoVenta) {
        this.estadoVenta = estadoVenta;
    }

    public String getFotoPrincipal() {
        return fotoPrincipal;
    }

    public void setFotoPrincipal(String fotoPrincipal) {
        this.fotoPrincipal = fotoPrincipal;
    }

    public Administrador getAdministrador() {
        return administrador;
    }

    public void setAdministrador(Administrador administrador) {
        this.administrador = administrador;
    }

    public TipoCamisa getTipoCamisa() {
        return tipoCamisa;
    }

    public void setTipoCamisa(TipoCamisa tipoCamisa) {
        this.tipoCamisa = tipoCamisa;
    }
}
