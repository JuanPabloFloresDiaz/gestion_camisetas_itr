package com.server.domain.model;

import java.util.List;

import com.server.domain.common.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@Entity
@Table(name = "tb_tallas")
@EqualsAndHashCode(callSuper = true)
public class Talla extends BaseEntity{

    @NotBlank(message = "El nombre de la talla es obligatorio")
    @Size(max = 5, message = "El nombre de la talla no puede tener más de 5 caracteres")
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
