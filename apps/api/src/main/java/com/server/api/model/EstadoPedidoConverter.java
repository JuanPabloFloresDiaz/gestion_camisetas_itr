package com.server.api.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class EstadoPedidoConverter implements AttributeConverter<Pedido.EstadoPedido, String> {

    @Override
    public String convertToDatabaseColumn(Pedido.EstadoPedido estado) {
        if (estado == null) {
            return null;
        }
        return estado.name();
    }

    @Override
    public Pedido.EstadoPedido convertToEntityAttribute(String estado) {
        if (estado == null) {
            return null;
        }
        return Pedido.EstadoPedido.valueOf(estado);
    }
}

