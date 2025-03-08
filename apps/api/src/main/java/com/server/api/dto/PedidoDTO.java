package com.server.api.dto;

import com.server.api.model.Cliente;

public class PedidoDTO {

    private Cliente cliente;

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}