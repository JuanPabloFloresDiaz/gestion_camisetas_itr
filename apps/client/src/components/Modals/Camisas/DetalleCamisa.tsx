"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import Image from "next/image";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getTallas, Talla } from "@/services/tallas.service";
import { 
  searchDetalleCamisasByCamisa, 
  createDetalleCamisas,
  deleteDetalleCamisa,
  DetalleCamisa
} from "@/services/detalle_camisas.service";
import { Camisa } from "@/services/camisas.service";

interface DetalleCamisaModalProps {
  camisa: Camisa;
}

export default function DetalleCamisasModal({ camisa }: DetalleCamisaModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTallas, setSelectedTallas] = useState<string[]>([]);
  const queryClient = useQueryClient();

  // Obtener todas las tallas disponibles
  const { data: tallas } = useQuery({
    queryKey: ["tallas"],
    queryFn: getTallas,
  });

  // Obtener detalles existentes para la camisa
  const { data: existingDetails } = useQuery({
    queryKey: ["detalleCamisas", camisa.id],
    queryFn: () => searchDetalleCamisasByCamisa(camisa.id),
    enabled: isOpen,
    select: (data) => data as DetalleCamisa[]
  });

  // Obtener IDs de detalles existentes
  const existingDetailIds = existingDetails?.map(d => d.id) || [];

  // Obtener tallas asociadas a la camisa
  const getTallasAsociadas = () => {
    if (!tallas) return [];
    return tallas.filter(talla => 
      talla.detallesCamisas.some(dc => 
        existingDetailIds.includes(dc.id)
    ));
  };

  // Cargar selecciones iniciales
  useEffect(() => {
    const asociadas = getTallasAsociadas().map(t => t.id);
    setSelectedTallas(asociadas);
  }, [tallas, existingDetails]);

  const handleCheckboxChange = (tallaId: string) => {
    setSelectedTallas(prev => 
      prev.includes(tallaId)
        ? prev.filter(id => id !== tallaId)
        : [...prev, tallaId]
    );
  };

  const handleAddTallas = async () => {
    try {
      const nuevasTallas = tallas?.filter(t => 
        selectedTallas.includes(t.id) && 
        !getTallasAsociadas().some(ta => ta.id === t.id)
      );

      if (nuevasTallas && nuevasTallas.length > 0) {
        const payload = nuevasTallas.map(talla => ({
          camisa: camisa,
          talla: talla
        }));
        
        await createDetalleCamisas(payload);
        queryClient.invalidateQueries(["detalleCamisas", camisa.id]);
        toast.success("Tallas actualizadas correctamente");
      }
    } catch (error) {
      toast.error("Error al guardar las tallas");
    }
  };

  const handleDeleteTalla = async (tallaId: string) => {
    try {
      // Buscar el detalle específico para esta combinación camisa-talla
      const detalleAEliminar = existingDetails?.find(d => 
        getTallasAsociadas().some(ta => ta.id === tallaId)
      );
      
      if (detalleAEliminar) {
        await deleteDetalleCamisa(detalleAEliminar.id);
        queryClient.invalidateQueries(["detalleCamisas", camisa.id]);
        toast.success("Talla eliminada correctamente");
      }
    } catch (error) {
      toast.error("Error al eliminar la talla");
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="text-blue-600 hover:bg-blue-600 hover:text-white"
        onClick={() => setIsOpen(true)}
      >
        <span className="material-icons mr-2">straighten</span>
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-neutral-500 bg-opacity-5">
          <ModalContent className="bg-white rounded-lg shadow-lg max-w-lg w-auto h-auto max-h-[73vh] flex flex-col">
            <ModalHeader className="border-b-2 border-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="material-icons text-blue-600">straighten</span>
                <h2 className="text-xl font-bold text-blue-600">Gestión de Tallas</h2>
              </div>
              <Image
                src="/logo.avif"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </ModalHeader>

            <ModalBody className="p-4 overflow-y-auto">
              <div className="space-y-4">
                {/* Tallas existentes */}
                {getTallasAsociadas().length > 0 && (
                  <div>
                    <Label className="text-blue-600">Tallas disponibles</Label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {getTallasAsociadas().map((talla) => (
                        <div key={talla.id} className="flex items-center justify-between p-2 border rounded-lg">
                          <span>{talla.nombre}</span>
                          <Button
                            variant="ghost"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteTalla(talla.id)}
                          >
                            <span className="material-icons">delete</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selección de nuevas tallas */}
                <div>
                  <Label className="text-blue-600">
                    {getTallasAsociadas().length ? "Agregar más tallas" : "Seleccionar tallas"}
                  </Label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {tallas?.map((talla) => (
                      !getTallasAsociadas().some(ta => ta.id === talla.id) && (
                        <label
                          key={talla.id}
                          className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTallas.includes(talla.id)}
                            onChange={() => handleCheckboxChange(talla.id)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                          <span>{talla.nombre}</span>
                        </label>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="flex justify-end space-x-2 mt-4 p-4">
              <Button
                className="bg-gray-400 hover:bg-gray-500 flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <span className="material-icons mr-2">cancel</span>
                Cancelar
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 flex items-center"
                onClick={handleAddTallas}
              >
                <span className="material-icons mr-2">save</span>
                Guardar
              </Button>
            </ModalFooter>
          </ModalContent>
        </div>
      </Modal>
    </>
  );
}