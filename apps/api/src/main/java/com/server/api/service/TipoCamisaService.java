package com.server.api.service;
import com.server.api.repository.TipoCamisaRepository;
import com.server.api.model.TipoCamisa;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Service
public class TipoCamisaService {
    private final TipoCamisaRepository tipoCamisaRepository;
    public TipoCamisaService(TipoCamisaRepository tipoCamisaRepository) {
        this.tipoCamisaRepository = tipoCamisaRepository;
    }

    // Obtener todos los tipos de camisa (no eliminados)
    public List<TipoCamisa> findAll() {
        return tipoCamisaRepository.findAll();
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
