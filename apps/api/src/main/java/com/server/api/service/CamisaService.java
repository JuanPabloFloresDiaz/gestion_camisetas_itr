package com.server.api.service;
import com.server.api.repository.CamisaRepository;
import com.server.api.model.Camisa;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Service
public class CamisaService {

    private final CamisaRepository camisaRepository;

    public CamisaService(CamisaRepository camisaRepository) {
        this.camisaRepository = camisaRepository;
    }

    // Obtener todas las camisas (no eliminadas)
    public List<Camisa> findAll() {
        return camisaRepository.findAll();
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
        // Asegúrate de que la camisa exista antes de actualizarla
        Optional<Camisa> existingCamisa = camisaRepository.findById(camisa.getId());
        if (existingCamisa.isPresent()) {
            // Si el administrador no se proporciona en la solicitud, mantén el administrador existente
            if (camisa.getAdministrador() == null) {
                camisa.setAdministrador(existingCamisa.get().getAdministrador());
            }
            // Guarda la camisa actualizada
            return camisaRepository.save(camisa);
        } else {
            // Maneja el caso en que la camisa no existe
            throw new RuntimeException("Camisa no encontrada");
        }
    }

    // Eliminar una camisa (soft delete)
    public void deleteById(UUID id) {
        camisaRepository.deleteById(id);
    }

}
