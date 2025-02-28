package com.server.domain.model;

import java.util.List;

import com.fasterxml.jackson.annotation.*;
import com.server.domain.common.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "tb_detalles_camisas")
@EqualsAndHashCode(callSuper = true)

public class DetalleCamisa extends BaseEntity{
        // Relación con Camisa
        @NotNull(message = "La camisa es obligatoria")
        @ManyToOne
        @JsonBackReference 
        @JoinColumn(name = "id_camisa", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_detalle_de_camisa"), nullable = false)
        private Camisa camisa;
        // Relación con Talla
        @NotNull(message = "La talla es obligatoria")
        @ManyToOne
        @JsonBackReference 
        @JoinColumn(name = "id_talla", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_talla_de_camisa"), nullable = false)
        private Talla talla;

        // Relación con detallePedido
        @OneToMany(mappedBy = "detalleCamisa", cascade = CascadeType.ALL)
        @JsonManagedReference
        private List<DetallePedido> detallePedidos;
    
        public Camisa getCamisa() {
            return camisa;
        }
    
        public void setCamisa(Camisa camisa) {
            this.camisa = camisa;
        }
    
        public Talla getTalla() {
            return talla;
        }
    
        public void setTalla(Talla talla) {
            this.talla = talla;
        }
}
