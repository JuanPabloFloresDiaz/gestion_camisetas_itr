package com.server.domain.repository;

import org.springframework.stereotype.Repository;

import com.server.domain.model.Camisa;
import java.util.UUID;
import java.util.Optional;
import java.util.List;

@Repository
public interface CamisaRepository{
    List<Camisa> findAll();
    Optional<Camisa> findById(UUID id);
    Camisa save(Camisa Camisa);
    Camisa update(Camisa Camisa);
    void deleteById(UUID id); // Soft delete
}
