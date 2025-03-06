package com.server.api.controller;

import com.server.api.model.Pedido;
import com.server.api.model.DetallePedido;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class PedidoWithDetailsRequest {

    @NotNull
    @Valid
    private Pedido pedido;

    @NotNull
    @Valid
    private List<DetallePedido> detallesPedidos;

    // Getters y setters

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public List<DetallePedido> getDetallesPedidos() {
        return detallesPedidos;
    }

    public void setDetallesPedidos(List<DetallePedido> detallesPedidos) {
        this.detallesPedidos = detallesPedidos;
    }
}