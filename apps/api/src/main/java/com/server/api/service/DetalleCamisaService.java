package com.server.api.service;
import com.server.api.repository.DetalleCamisaRepository;
import com.server.api.model.DetalleCamisa;
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

    // Guardar varios detalles de camisa
    public List<DetalleCamisa> saveAll(List<DetalleCamisa> detallesCamisa) {
        return detalleCamisaRepository.saveAll(detallesCamisa);
    }

    // Actualizar un detalle de camisa
    public DetalleCamisa update(DetalleCamisa detalleCamisa) {
        return detalleCamisaRepository.save(detalleCamisa);
    }

    // Eliminar un detalle de camisa (soft delete)
    public void deleteById(UUID id) {
        detalleCamisaRepository.deleteById(id);
    }    

    // Buscar detalles de camisas por camisa
    public List<DetalleCamisa> findByCamisa(UUID camisaId) {
        return detalleCamisaRepository.findByCamisaId(camisaId);
    }
}
