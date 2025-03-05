package com.server.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.api.model.DetalleCamisa;

import java.util.List;
import java.util.UUID;

@Repository
public interface DetalleCamisaRepository extends JpaRepository<DetalleCamisa, UUID>{
    // Buscar detalles de camisas por camisa
    List<DetalleCamisa> findByCamisaId(UUID camisaId);
}
