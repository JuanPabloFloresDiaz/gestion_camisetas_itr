package com.server.application.service;
import com.server.domain.repository.DetalleCamisaRepository;
import com.server.domain.model.DetalleCamisa;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Service
public class DetalleCamisaService {
    private final DetalleCamisaRepository detalleCamisaRepository;
    public DetalleCamisaService(DetalleCamisaRepository detalleCamisaRepository) {
        this.detalleCamisaRepository = detalleCamisaRepository;
    }

    // Obtener todos los detalles de camisas (no eliminados)
    public List<DetalleCamisa> findAll() {
        return detalleCamisaRepository.findAll();
    }

    // Obtener un detalle de camisa por ID (no eliminado)
    public Optional<DetalleCamisa> findById(UUID id) {
        return detalleCamisaRepository.findById(id);
    }

    // Guardar un detalle de camisa
    public DetalleCamisa save(DetalleCamisa detalleCamisa) {
        return detalleCamisaRepository.save(detalleCamisa);
    }

    // Actualizar un detalle de camisa
    public DetalleCamisa update(DetalleCamisa detalleCamisa) {
        return detalleCamisaRepository.update(detalleCamisa);
    }

    // Eliminar un detalle de camisa (soft delete)
    public void deleteById(UUID id) {
        detalleCamisaRepository.deleteById(id);
    }    
}
