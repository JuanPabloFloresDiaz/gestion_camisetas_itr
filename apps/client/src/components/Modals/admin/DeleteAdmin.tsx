"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdministrador } from "@/services/administradores.service";

interface DeleteAdminModalProps {
  adminId: string;
  onClose: () => void;
}

export default function DeleteAdminModal({ adminId, onClose }: DeleteAdminModalProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteAdministrador(adminId),
    onSuccess: () => {
      // Invalida la caché de la lista de administradores para que se actualice
      queryClient.invalidateQueries({ queryKey: ["administradores"] });
      onClose(); // Cierra el modal después de eliminar
    },
    onError: (error) => {
      console.error("Error al eliminar administrador:", error);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center z-40 bg-neutral-500 bg-opacity-5">
        <ModalContent className="bg-white rounded-lg shadow-lg max-w-lg w-auto h-auto max-h-[30vh] flex flex-col">
          <ModalHeader className="border-b-2 border-red-500 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="material-icons text-red-500">warning</span>
              <h2 className="text-xl font-bold text-red-500">Eliminar administrador</h2>
            </div>
          </ModalHeader>

          <ModalBody className="p-4">
            <p className="text-gray-700">
              ¿Estás seguro de que deseas eliminar este administrador? Esta acción no se puede deshacer.
            </p>
          </ModalBody>

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