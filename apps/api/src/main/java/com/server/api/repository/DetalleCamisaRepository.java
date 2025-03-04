package com.server.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.api.model.DetalleCamisa;

import java.util.UUID;

@Repository
public interface DetalleCamisaRepository extends JpaRepository<DetalleCamisa, UUID>{

}
