package com.server.domain.model;

import com.server.domain.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "tb_clientes")
@EqualsAndHashCode(callSuper = true)
public class Cliente extends BaseEntity {

    @Column(name = "nombre_cliente", nullable = false, length = 50)
    private String nombre;

    @Column(name = "apellido_cliente", nullable = false, length = 50)
    private String apellido;

    @Column(name = "correo_cliente", 
            nullable = false, 
            unique = true, 
            length = 50)
    private String correo;

    @Column(name = "dui_cliente", 
            unique = true, 
            length = 10)
    private String dui;

    @Column(name = "telefono_cliente", 
            nullable = false, 
            length = 15)
    private String telefono;

    @Column(name = "direccion_cliente", length = 100)
    private String direccion;

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

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getDui() {
        return dui;
    }

    public void setDui(String dui) {
        this.dui = dui;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
}