package com.server.api.service;

import com.server.api.repository.TallaRepository;
import com.server.api.model.Talla;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
public class TallaService {

    private final TallaRepository tallaRepository;

    public TallaService(TallaRepository tallaRepository) {
        this.tallaRepository = tallaRepository;
    }

    // Obtener todas las tallas sin paginación
    public Iterable<Talla> findAll() {
        return tallaRepository.findAll();
    }

    // Obtener todas las tallas con paginación
    public Page<Talla> findAll(int page, int limit, String searchTerm) {
        Pageable pageable = PageRequest.of(page - 1, limit); // Pagina base 1
        if (searchTerm != null && !searchTerm.isEmpty()) {
            return tallaRepository.searchAllFields(searchTerm.toLowerCase(), pageable);
        }
        return tallaRepository.findAll(pageable);
    }

    // Obtener una talla por ID (no eliminada)
    public Optional<Talla> findById(UUID id) {
        return tallaRepository.findById(id);
    }

    // Guardar una talla
    public Talla save(Talla talla) {
        return tallaRepository.save(talla);
    }

    // Actualizar una talla
    public Talla update(Talla talla) {
        return tallaRepository.save(talla);
    }

    // Eliminar una talla (soft delete)
    public void deleteById(UUID id) {
        tallaRepository.deleteById(id);
    }
}