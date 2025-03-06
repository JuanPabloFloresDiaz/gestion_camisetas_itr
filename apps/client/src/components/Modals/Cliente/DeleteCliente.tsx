"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCliente } from "@/services/clientes.service"; // Importar servicio de clientes

interface DeleteClienteModalProps {
  clienteId: string; // ID del cliente a eliminar
  onClose: () => void; // Función para cerrar el modal
}

export default function DeleteClienteModal({ clienteId, onClose }: DeleteClienteModalProps) {
  const queryClient = useQueryClient(); // Para acceder a la caché de TanStack Query
  const [isDeleting, setIsDeleting] = useState(false);

  const mutation = useMutation({
    mutationFn: () => deleteCliente(clienteId), // Función para eliminar el cliente
    onSuccess: () => {
      // Invalida la caché de la lista de clientes para que se actualice
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      setIsDeleting(false);
      onClose(); // Cierra el modal después de eliminar
    },
    onError: (error) => {
      console.error("Error al eliminar cliente:", error);
      setIsDeleting(false);
    },
  });

  const handleDelete = () => {
    setIsDeleting(true);
    mutation.mutate(); // Ejecuta la mutación para eliminar el cliente
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/50 backdrop-blur-sm">
        <ModalContent className="bg-white rounded-xl shadow-2xl max-w-md w-full h-auto flex flex-col border border-gray-100 overflow-hidden">
          {/* Cabecera con gradiente rojo */}
          <ModalHeader className="p-5 flex items-center justify-between bg-gradient-to-r from-red-600 to-red-500 text-white">
            <div className="flex items-center space-x-3">
              <span className="material-icons text-white bg-white/20 p-2 rounded-full">warning</span>
              <h2 className="text-xl font-bold">Eliminar Cliente</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
              disabled={isDeleting}
            >
              <span className="material-icons">close</span>
            </button>
          </ModalHeader>

          {/* Cuerpo del modal */}
          <ModalBody className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <span className="material-icons text-red-500 text-3xl">delete_forever</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">¿Estás seguro?</h3>
              <p className="text-gray-600">
                Esta acción eliminará permanentemente el cliente seleccionado y no podrá ser recuperado.
              </p>
            </div>
          </ModalBody>

          {/* Botones de acción */}
          <ModalFooter className="flex justify-center space-x-3 p-5 border-t bg-gray-50">
            <Button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center transition-colors px-5"
              onClick={onClose}
              disabled={isDeleting}
            >
              <span className="material-icons mr-2">cancel</span>
              Cancelar
            </Button>
            <Button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white flex items-center transition-colors px-5"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="material-icons animate-spin mr-2">refresh</span>
                  Eliminando...
                </>
              ) : (
                <>
                  <span className="material-icons mr-2">delete</span>
                  Eliminar
                </>
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </div>
    </Modal>
  );
}
