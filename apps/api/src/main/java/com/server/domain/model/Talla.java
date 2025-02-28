package com.server.domain.model;

import java.util.List;

import com.server.domain.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@Entity
@Table(name = "tb_tallas")
@EqualsAndHashCode(callSuper = true)
public class Talla extends BaseEntity{

    @Column(name = "nombre_talla", nullable = false, length = 5)
    private String nombre;

    // Relación inversa: Una talla puede estar en muchos detalles de camisas	
    @OneToMany(mappedBy = "talla", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetalleCamisa> detallesCamisas;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
