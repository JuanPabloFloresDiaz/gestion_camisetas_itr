"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateTalla } from "@/services/tallas.service"; // Importar servicio de tallas
import { Talla } from "@/services/tallas.service"; // Importar interfaz Talla
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
const tallaSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(50, "El nombre no puede tener más de 50 caracteres"),
});

type TallaFormValues = z.infer<typeof tallaSchema>;

interface UpdateTallaModalProps {
  talla: Talla; // La talla a actualizar
}

export default function UpdateTallaModal({ talla }: UpdateTallaModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient(); // Para acceder a la caché de TanStack Query

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TallaFormValues>({
    resolver: zodResolver(tallaSchema),
    defaultValues: {
      nombre: talla.nombre as string,
    },
  });

  const onSubmit: SubmitHandler<TallaFormValues> = async (data) => {
    try {
      // Agregar el id de la talla al objeto data
      const payload = { ...data, id: talla.id };
      const updatedTalla = await updateTalla(talla.id, payload);

      // Actualizar la caché de TanStack Query
      queryClient.setQueryData(["tallas"], (oldData: Talla[] | undefined) => {
        return oldData
          ? oldData.map((talla) => (talla.id === updatedTalla.id ? updatedTalla : talla))
          : [updatedTalla];
      });

      // Mostrar alerta de éxito con sonner
      toast.success("Talla actualizada", {
        description: "La talla se ha actualizado correctamente.",
      });

      setIsOpen(false);
      reset();
    } catch (error) {
      console.error("Error al actualizar talla:", error);

      // Mostrar alerta de error con sonner
      toast.error("Error", {
        description: "No se pudo actualizar la talla.",
      });
    }
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <Button
        variant="ghost"
        className="text-yellow-500 hover:bg-yellow-500 hover:text-white"
        onClick={() => setIsOpen(true)}
      >
        <span className="material-icons mr-2">edit</span>
      </Button>

      {/* Modal de HeroUI */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-neutral-500 bg-opacity-5">
          <ModalContent className="bg-white rounded-lg shadow-lg max-w-lg w-auto h-auto max-h-[30vh] flex flex-col">
            {/* Cabecera con borde amarillo */}
            <ModalHeader className="border-b-2 border-yellow-500 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="material-icons text-yellow-500">edit</span>
                <h2 className="text-xl font-bold text-yellow-500">
                  Actualizar Talla
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
                    <Label htmlFor="nombre" className="text-yellow-500">
                      Nombre
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="nombre"
                        {...register("nombre")}
                        placeholder="Ingrese el nombre de la talla"
                        className="pl-10 border-2 border-yellow-500 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-yellow-500">
                        <span className="material-icons">straighten</span>
                      </span>
                    </div>
                    {errors.nombre && (
                      <p className="text-sm text-red-500">
                        {errors.nombre.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Botones de acción */}
                <ModalFooter className="flex justify-end space-x-2 mt-4">
                  <Button
                    type="button"
                    className="bg-gray-400 hover:bg-gray-500 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="material-icons mr-2">cancel</span>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-500 flex items-center"
                  >
                    <span className="material-icons mr-2">save</span>
                    Actualizar
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
