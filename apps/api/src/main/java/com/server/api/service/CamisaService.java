package com.server.api.service;

import com.server.api.repository.CamisaRepository;
import com.server.api.model.Camisa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
public class CamisaService {

    private final CamisaRepository camisaRepository;

    public CamisaService(CamisaRepository camisaRepository) {
        this.camisaRepository = camisaRepository;
    }

    // Obtener todas las camisas con paginación
    public Page<Camisa> findAll(int page, int limit, String searchTerm) {
        Pageable pageable = PageRequest.of(page - 1, limit); // Pagina base 1
        if (searchTerm != null && !searchTerm.isEmpty()) {
            return camisaRepository.searchAllFields(searchTerm.toLowerCase(), pageable);
        }
        return camisaRepository.findAll(pageable);
    }

    // Obtener una camisa por ID (no eliminada)
    public Optional<Camisa> findById(UUID id) {
        return camisaRepository.findById(id);
    }

    // Guardar una camisa
    public Camisa save(Camisa camisa) {
        return camisaRepository.save(camisa);
    }

    // Actualizar una camisa
    public Camisa update(Camisa camisa) {
        Optional<Camisa> existingCamisa = camisaRepository.findById(camisa.getId());
        if (existingCamisa.isPresent()) {
            if (camisa.getAdministrador() == null) {
                camisa.setAdministrador(existingCamisa.get().getAdministrador());
            }
            return camisaRepository.save(camisa);
        } else {
            throw new RuntimeException("Camisa no encontrada");
        }
    }

    // Eliminar una camisa (soft delete)
    public void deleteById(UUID id) {
        camisaRepository.deleteById(id);
    }
}