package com.server.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.api.model.Pedido;

import java.util.UUID;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, UUID>{

}
