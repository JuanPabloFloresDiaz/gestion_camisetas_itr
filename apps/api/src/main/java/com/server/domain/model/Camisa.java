package com.server.domain.model;

import com.server.domain.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@Table(name = "tb_camisas")
@EqualsAndHashCode(callSuper = true)
public class Camisa extends BaseEntity {

    @Column(name = "nombre_camisa",
            nullable = false,
            length = 60)
    private String nombre;

    @Column(name = "descripcion_camisa",
            nullable = false)
    private String descripcion;

    @Column(name = "precio",
            nullable = false,
            precision = 5,
            scale = 2)
    private BigDecimal precio;

    @Column(name = "estado_venta",
            columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean estadoVenta = true;

    @Column(name = "foto_principal",
            length = 50)
    private String fotoPrincipal;

    // Relación con Administrador
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_administrador", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_administrador_de_camisa"))
    private Administrador administrador;

    // Relación con TipoCamisa
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_camisa", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_tipo_de_camisa_producto"))
    private TipoCamisa tipoCamisa;

    // Relación con DetalleCamisa
    @OneToMany(mappedBy = "camisa", cascade = CascadeType.ALL, orphanRemoval = true)
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
