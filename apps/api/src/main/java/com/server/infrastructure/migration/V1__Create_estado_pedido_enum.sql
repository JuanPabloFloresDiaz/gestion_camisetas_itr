-- V1__Create_estado_pedido_enum.sql
CREATE TYPE estado_pedido_enum AS ENUM ('Pendiente', 'Entregado', 'EnCamino', 'Cancelado');