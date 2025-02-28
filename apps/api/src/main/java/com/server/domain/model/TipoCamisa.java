package com.server.domain.model;

import java.util.List;

import com.server.domain.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@Entity
@Table(name = "tb_tipos_camisas")
@EqualsAndHashCode(callSuper = true)
public class TipoCamisa extends BaseEntity{
    
    @Column(name = "nombre_tipo_camisa", nullable = false, length = 50)
    private String nombre;

    @Column(name = "descripcion_tipo_camisa", length = 200)
    private String descripcion;
    
    // Relación inversa: Un tipo de camisa puede estar en muchas camisas
    @OneToMany(mappedBy = "tipoCamisa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Camisa> camisas;

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
}
