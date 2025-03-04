"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTipoCamisa } from "@/services/tipo_camisas.service"; // Importar servicio de tipos de camisas

interface DeleteTipoCamisaModalProps {
  tipoCamisaId: string; // ID del tipo de camisa a eliminar
  onClose: () => void; // Función para cerrar el modal
}

export default function DeleteTipoCamisaModal({ tipoCamisaId, onClose }: DeleteTipoCamisaModalProps) {
  const queryClient = useQueryClient(); // Para acceder a la caché de TanStack Query

  const mutation = useMutation({
    mutationFn: () => deleteTipoCamisa(tipoCamisaId), // Función para eliminar el tipo de camisa
    onSuccess: () => {
      // Invalida la caché de la lista de tipos de camisas para que se actualice
      queryClient.invalidateQueries({ queryKey: ["tipoCamisas"] });
      onClose(); // Cierra el modal después de eliminar
    },
    onError: (error) => {
      console.error("Error al eliminar tipo de camisa:", error);
    },
  });

  const handleDelete = () => {
    mutation.mutate(); // Ejecuta la mutación para eliminar el tipo de camisa
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center z-40 bg-neutral-500 bg-opacity-5">
        <ModalContent className="bg-white rounded-lg shadow-lg max-w-lg w-auto h-auto max-h-[30vh] flex flex-col">
          {/* Cabecera con borde rojo */}
          <ModalHeader className="border-b-2 border-red-500 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="material-icons text-red-500">warning</span>
              <h2 className="text-xl font-bold text-red-500">Eliminar Tipo de Camisa</h2>
            </div>
          </ModalHeader>

          {/* Cuerpo del modal */}
          <ModalBody className="p-4">
            <p className="text-gray-700">
              ¿Estás seguro de que deseas eliminar este tipo de camisa? Esta acción no se puede deshacer.
            </p>
          </ModalBody>

          {/* Botones de acción */}
          <ModalFooter className="flex justify-end space-x-2 mt-4 mb-5">
            <Button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 flex items-center"
              onClick={onClose}
            >
              <span className="material-icons mr-2">cancel</span>
              Cancelar
            </Button>
            <Button
              type="button"
              className="bg-red-500 hover:bg-red-600 flex items-center"
              onClick={handleDelete}
            >
              <span className="material-icons mr-2">delete</span>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </div>
    </Modal>
  );
}
