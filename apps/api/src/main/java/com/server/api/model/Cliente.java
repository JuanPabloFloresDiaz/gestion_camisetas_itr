package com.server.api.model;

import java.util.List;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "tb_clientes")
@EqualsAndHashCode(callSuper = true)
public class Cliente extends BaseEntity {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 50, message = "El nombre no puede tener más de 50 caracteres")
    @Column(name = "nombre_cliente", nullable = false, length = 50)
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 50, message = "El apellido no puede tener más de 50 caracteres")
    @Column(name = "apellido_cliente", nullable = false, length = 50)
    private String apellido;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo debe tener un formato válido")
    @Size(max = 80, message = "El correo no puede tener más de 80 caracteres")
    @Column(name = "correo_cliente", 
            nullable = false, 
            unique = true, 
            length = 80)
    private String correo;

    @Size(max = 10, message = "El DUI no puede tener más de 10 caracteres")
    @Column(name = "dui_cliente", 
            unique = true, 
            length = 10)
    private String dui;

    @NotBlank(message = "El teléfono es obligatorio")
    @Size(max = 15, message = "El teléfono no puede tener más de 15 caracteres")
    @Column(name = "telefono_cliente", 
            nullable = false, 
            length = 15)
    private String telefono;

    @Size(max = 100, message = "La dirección no puede tener más de 100 caracteres")
    @Column(name = "direccion_cliente", length = 100)
    private String direccion;

    // Relación con Pedido
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    @JsonManagedReference("cliente-pedidos")
    private List<Pedido> pedidos;

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