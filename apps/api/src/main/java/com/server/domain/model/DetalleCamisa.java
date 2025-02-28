package com.server.domain.model;

import com.server.domain.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "tb_detalles_camisas")
@EqualsAndHashCode(callSuper = true)

public class DetalleCamisa extends BaseEntity{
        // Relación con Camisa
        @ManyToOne
        @JoinColumn(name = "id_camisa", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_detalle_de_camisa"), nullable = false)
        private Camisa camisa;
        // Relación con Talla
        @ManyToOne
        @JoinColumn(name = "id_talla", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_talla_de_camisa"), nullable = false)
        private Talla talla;
    
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
