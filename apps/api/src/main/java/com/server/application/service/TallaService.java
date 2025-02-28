package com.server.application.service;
import com.server.domain.repository.TallaRepository;
import com.server.domain.model.Talla;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Service
public class TallaService {

    private final TallaRepository tallaRepository;

    public TallaService(TallaRepository tallaRepository) {
        this.tallaRepository = tallaRepository;
    }

    // Obtener todas las tallas (no eliminadas)
    public List<Talla> findAll() {
        return tallaRepository.findAll();
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
        return tallaRepository.update(talla);
    }

    // Eliminar una talla (soft delete)
    public void deleteById(UUID id) {
        tallaRepository.deleteById(id);
    }
}
