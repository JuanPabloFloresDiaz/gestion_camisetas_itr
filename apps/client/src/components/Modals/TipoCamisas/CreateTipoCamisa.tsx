"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { createTipoCamisa } from "@/services/tipo_camisas.service";
import { TipoCamisa } from "@/services/tipo_camisas.service";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const tipoCamisaSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(50, "El nombre no puede tener más de 50 caracteres"),
  descripcion: z.string().max(200, "La descripción no puede tener más de 200 caracteres").optional(),
});

type TipoCamisaFormValues = z.infer<typeof tipoCamisaSchema>;

export default function CreateTipoCamisaModal() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TipoCamisaFormValues>({
    resolver: zodResolver(tipoCamisaSchema),
  });

  const onSubmit: SubmitHandler<TipoCamisaFormValues> = async (data) => {
    try {
      await createTipoCamisa(data);

      // Invalidar la caché para forzar nueva petición
      await queryClient.invalidateQueries({
        queryKey: ["tipoCamisas"],
        refetchType: "active"
      });

      toast.success("Tipo de camisa creado", {
        description: "El tipo de camisa se ha agregado correctamente.",
      });

      setIsOpen(false);
      reset();
    } catch (error) {
      console.error("Error al crear tipo de camisa:", error);

      toast.error("Error", {
        description: "No se pudo crear el tipo de camisa.",
      });
    }
  };

  return (
    <>
      <Button
        className="bg-blue-700 text-white hover:bg-blue-800 transition-colors rounded-lg shadow-sm flex items-center space-x-2 px-4"
        onClick={() => setIsOpen(true)}
      >
        <span className="material-icons">add_circle</span>
        <span>Agregar Tipo de Camisa</span>
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/50 backdrop-blur-sm">
          <ModalContent className="bg-white rounded-xl shadow-2xl max-w-lg w-full h-auto max-h-[85vh] flex flex-col border border-gray-100">
            <ModalHeader className="border-b p-5 flex items-center justify-between bg-gradient-to-r from-blue-800 to-blue-700 text-white rounded-t-xl">
              <div className="flex items-center space-x-3">
                <span className="material-icons text-white">add_circle</span>
                <h2 className="text-xl font-bold">Crear Tipo de Camisa</h2>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/logo.avif" alt="Logo" width={40} height={40} className="rounded-lg bg-white p-1" />
                <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 transition-colors">
                  <span className="material-icons">close</span>
                </button>
              </div>
            </ModalHeader>

            <ModalBody className="p-6 overflow-y-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Nombre</Label>
                    <div className="relative">
                      <Input
                        {...register("nombre")}
                        placeholder="Ingrese el nombre del tipo de camisa"
                        className="pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-600">
                        <span className="material-icons">checkroom</span>
                      </span>
                    </div>
                    {errors.nombre && <p className="text-sm text-red-500 mt-1">{errors.nombre.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Descripción</Label>
                    <div className="relative">
                      <Input
                        {...register("descripcion")}
                        placeholder="Ingrese la descripción"
                        className="pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-600">
                        <span className="material-icons">description</span>
                      </span>
                    </div>
                    {errors.descripcion && <p className="text-sm text-red-500 mt-1">{errors.descripcion.message}</p>}
                  </div>
                </div>

                <ModalFooter className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                  <Button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="material-icons mr-2">cancel</span>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-blue-700 hover:bg-blue-800 flex items-center transition-colors">
                    <span className="material-icons mr-2">save</span>
                    Crear
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </div>
      </Modal>
    </>
  );
}
