"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { createTipoCamisa } from "@/services/tipo_camisas.service"; // Importar servicio de tipos de camisas
import { TipoCamisa } from "@/services/tipo_camisas.service"; // Importar interfaz TipoCamisa
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
import { useQueryClient } from "@tanstack/react-query"; // Para actualizar la caché
import { toast } from "sonner"; // Para mostrar notificaciones

// Esquema de validación con Zod
const tipoCamisaSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(50, "El nombre no puede tener más de 50 caracteres"),
  descripcion: z.string().max(200, "La descripción no puede tener más de 200 caracteres").optional(),
});

type TipoCamisaFormValues = z.infer<typeof tipoCamisaSchema>;

export default function CreateTipoCamisaModal() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient(); // Para acceder a la caché de TanStack Query

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
      const newTipoCamisa = await createTipoCamisa(data);

      // Actualizar la caché de TanStack Query
      queryClient.setQueryData(["tipoCamisas"], (oldData: TipoCamisa[] | undefined) => {
        return oldData ? [...oldData, newTipoCamisa] : [newTipoCamisa];
      });

      // Mostrar alerta de éxito con sonner
      toast.success("Tipo de camisa creado", {
        description: "El tipo de camisa se ha agregado correctamente.",
      });

      setIsOpen(false);
      reset();
    } catch (error) {
      console.error("Error al crear tipo de camisa:", error);

      // Mostrar alerta de error con sonner
      toast.error("Error", {
        description: "No se pudo crear el tipo de camisa.",
      });
    }
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <Button
        className="bg-blue-800 text-white hover:bg-gray-900"
        onClick={() => setIsOpen(true)}
      >
        <span className="material-icons mr-2">add</span>
        Agregar Tipo de Camisa
      </Button>

      {/* Modal de HeroUI */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-neutral-500 bg-opacity-5">
          <ModalContent className="bg-white rounded-lg shadow-lg max-w-lg w-auto h-auto max-h-[42vh] flex flex-col">
            {/* Cabecera con borde azul */}
            <ModalHeader className="border-b-2 border-blue-800 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="material-icons text-blue-800">add</span>
                <h2 className="text-xl font-bold text-blue-800">
                  Crear Tipo de Camisa
                </h2>
              </div>
              <Image
                src="/logo.avif"
                alt="Logo de la empresa"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </ModalHeader>

            {/* Cuerpo del modal con altura ajustable */}
            <ModalBody className="p-4 overflow-y-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-4">
                  {/* Nombre */}
                  <div>
                    <Label htmlFor="nombre" className="text-blue-800">
                      Nombre
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="nombre"
                        {...register("nombre")}
                        placeholder="Ingrese el nombre del tipo de camisa"
                        className="pl-10 border-2 border-blue-800 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-800">
                        <span className="material-icons">checkroom</span>
                      </span>
                    </div>
                    {errors.nombre && (
                      <p className="text-sm text-red-500">
                        {errors.nombre.message}
                      </p>
                    )}
                  </div>

                  {/* Descripción */}
                  <div>
                    <Label htmlFor="descripcion" className="text-blue-800">
                      Descripción
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="descripcion"
                        {...register("descripcion")}
                        placeholder="Ingrese la descripción"
                        className="pl-10 border-2 border-blue-800 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-800">
                        <span className="material-icons">description</span>
                      </span>
                    </div>
                    {errors.descripcion && (
                      <p className="text-sm text-red-500">
                        {errors.descripcion.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Botones de acción */}
                <ModalFooter className="flex justify-end space-x-2 mt-4">
                  <Button
                    type="button"
                    className="bg-orange-400 hover:bg-orange-500 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="material-icons mr-2">cancel</span>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-900 hover:bg-blue-800 flex items-center"
                  >
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
