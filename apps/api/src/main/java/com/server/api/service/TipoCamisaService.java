package com.server.api.service;

import com.server.api.repository.TipoCamisaRepository;
import com.server.api.model.TipoCamisa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
public class TipoCamisaService {

    private final TipoCamisaRepository tipoCamisaRepository;

    public TipoCamisaService(TipoCamisaRepository tipoCamisaRepository) {
        this.tipoCamisaRepository = tipoCamisaRepository;
    }

    //  Obtener todos los tipos de camisas sin paginación
    public Iterable<TipoCamisa> findAll() {
        return tipoCamisaRepository.findAll();
    }

    // Obtener todos los tipos de camisas con paginación
    public Page<TipoCamisa> findAll(int page, int limit, String searchTerm) {
        Pageable pageable = PageRequest.of(page - 1, limit); // Pagina base 1
        if (searchTerm != null && !searchTerm.isEmpty()) {
            return tipoCamisaRepository.searchAllFields(searchTerm.toLowerCase(), pageable);
        }
        return tipoCamisaRepository.findAll(pageable);
    }

    // Obtener un tipo de camisa por ID (no eliminado)
    public Optional<TipoCamisa> findById(UUID id) {
        return tipoCamisaRepository.findById(id);
    }

    // Guardar un tipo de camisa
    public TipoCamisa save(TipoCamisa tipoCamisa) {
        return tipoCamisaRepository.save(tipoCamisa);
    }

    // Actualizar un tipo de camisa
    public TipoCamisa update(TipoCamisa tipoCamisa) {
        return tipoCamisaRepository.save(tipoCamisa);
    }

    // Eliminar un tipo de camisa (soft delete)
    public void deleteById(UUID id) {
        tipoCamisaRepository.deleteById(id);
    }
}