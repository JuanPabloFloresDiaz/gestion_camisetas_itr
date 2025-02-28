package com.server.domain.model;

import java.util.List;

import com.server.domain.common.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "tb_administradores")
@EqualsAndHashCode(callSuper = true)
public class Administrador extends BaseEntity {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 50, message = "El nombre no puede tener más de 50 caracteres")
    @Column(name = "nombre_administrador", 
            nullable = false, 
            length = 50)
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 50, message = "El apellido no puede tener más de 50 caracteres")
    @Column(name = "apellido_administrador", 
            nullable = false, 
            length = 50)
    private String apellido;

    @NotBlank(message = "La clave es obligatoria")
    @Size(min = 8, max = 100, message = "La clave debe tener entre 8 y 100 caracteres")
    @Column(name = "clave_administrador", 
            nullable = false, 
            length = 100)
    private String clave;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo debe tener un formato válido")
    @Size(max = 80, message = "El correo no puede tener más de 80 caracteres")
    @Column(name = "correo_administrador", 
            nullable = false, 
            unique = true, 
            length = 80)
    private String correo;

    @NotBlank(message = "El teléfono es obligatorio")
    @Size(max = 15, message = "El teléfono no puede tener más de 15 caracteres")
    @Column(name = "telefono_administrador", 
            nullable = false, 
            length = 15)
    private String telefono;

    @Size(max = 10, message = "El DUI no puede tener más de 10 caracteres")
    @Column(name = "dui_administrador", 
            unique = true, 
            length = 10)
    private String dui;

    @Size(max = 25, message = "El alias no puede tener más de 25 caracteres")
    @Column(name = "alias_administrador", 
            unique = true, 
            length = 25)
    private String alias;

    @Column(name = "estado_administrador", 
            columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean estado = true;

    @Column(name = "recovery_code", length = 80)
    private String recoveryCode = "0000";

    // Relación inversa: Un administrador puede tener muchas camisas
    @OneToMany(mappedBy = "administrador", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Camisa> camisas;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDui() {
        return dui;
    }

    public void setDui(String dui) {
        this.dui = dui;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    public String getRecoveryCode() {
        return recoveryCode;
    }

    public void setRecoveryCode(String recoveryCode) {
        this.recoveryCode = recoveryCode;
    }
}