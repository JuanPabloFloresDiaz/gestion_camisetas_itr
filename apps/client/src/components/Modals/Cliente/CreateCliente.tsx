"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { createCliente } from "@/services/clientes.service"; // Importar servicio de clientes
import { Cliente } from "@/services/clientes.service"; // Importar interfaz Clientes
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
import { IMaskInput } from "react-imask"; // Para las máscaras de entrada
import { toast } from "sonner"; // Para mostrar notificaciones

// Esquema de validación con Zod
const clienteSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(50, "El nombre no puede tener más de 50 caracteres"),
  apellido: z.string().min(1, "El apellido es obligatorio").max(50, "El apellido no puede tener más de 50 caracteres"),
  correo: z.string().email("El correo debe tener un formato válido").max(80, "El correo no puede tener más de 80 caracteres"),
  telefono: z.string().min(1, "El teléfono es obligatorio").max(15, "El teléfono no puede tener más de 15 caracteres"),
  dui: z.string().max(10, "El DUI no puede tener más de 10 caracteres").optional(),
  direccion: z.string().min(1, "La dirección es obligatoria").max(100, "La dirección no puede tener más de 100 caracteres"),
});

type ClienteFormValues = z.infer<typeof clienteSchema>;

export default function CreateClienteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient(); // Para acceder a la caché de TanStack Query

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteSchema),
  });

  const onSubmit: SubmitHandler<ClienteFormValues> = async (data) => {
    try {
      const newCliente = await createCliente(data);

      // Actualizar la caché de TanStack Query
      queryClient.setQueryData(["clientes"], (oldData: Cliente[] | undefined) => {
        return oldData ? [...oldData, newCliente] : [newCliente];
      });

      // Mostrar alerta de éxito con sonner
      toast.success("Cliente creado", {
        description: "El cliente se ha agregado correctamente.",
      });

      setIsOpen(false);
      reset();
    } catch (error) {
      console.error("Error al crear cliente:", error);

      // Mostrar alerta de error con sonner
      toast.error("Error", {
        description: "No se pudo crear el cliente.",
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
        Agregar Cliente
      </Button>

      {/* Modal de HeroUI */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-neutral-500 bg-opacity-5">
          <ModalContent className="bg-white rounded-lg shadow-lg max-w-lg w-auto h-auto max-h-[59vh] flex flex-col">
            {/* Cabecera con borde azul */}
            <ModalHeader className="border-b-2 border-blue-800 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="material-icons text-blue-800">add</span>
                <h2 className="text-xl font-bold text-blue-800">
                  Crear Cliente
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nombre */}
                  <div>
                    <Label htmlFor="nombre" className="text-blue-800">
                      Nombre
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="nombre"
                        {...register("nombre")}
                        placeholder="Ingrese el nombre"
                        className="pl-10 border-2 border-blue-800 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-800">
                        <span className="material-icons">person</span>
                      </span>
                    </div>
                    {errors.nombre && (
                      <p className="text-sm text-red-500">
                        {errors.nombre.message}
                      </p>
                    )}
                  </div>

                  {/* Apellido */}
                  <div>
                    <Label htmlFor="apellido" className="text-blue-800">
                      Apellido
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="apellido"
                        {...register("apellido")}
                        placeholder="Ingrese el apellido"
                        className="pl-10 border-2 border-blue-800 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-800">
                        <span className="material-icons">person</span>
                      </span>
                    </div>
                    {errors.apellido && (
                      <p className="text-sm text-red-500">
                        {errors.apellido.message}
                      </p>
                    )}
                  </div>

                  {/* Correo electrónico */}
                  <div className="col-span-1 md:col-span-2">
                    <Label htmlFor="correo" className="text-blue-800">
                      Correo electrónico
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="correo"
                        type="email"
                        {...register("correo")}
                        placeholder="Ingrese el correo electrónico"
                        className="pl-10 border-2 border-blue-800 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-800">
                        <span className="material-icons">email</span>
                      </span>
                    </div>
                    {errors.correo && (
                      <p className="text-sm text-red-500">
                        {errors.correo.message}
                      </p>
                    )}
                  </div>

                  {/* Teléfono con máscara */}
                  <div>
                    <Label htmlFor="telefono" className="text-blue-800">
                      Teléfono
                    </Label>
                    <div className="relative mt-2">
                      <IMaskInput
                        id="telefono"
                        mask="0000-0000"
                        placeholder="Ingrese el teléfono"
                        className="pl-10 border-2 border-blue-800 rounded-lg"
                        onAccept={(value) => setValue("telefono", value)} // Actualizar el valor en react-hook-form
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-800">
                        <span className="material-icons">phone</span>
                      </span>
                    </div>
                    {errors.telefono && (
                      <p className="text-sm text-red-500">
                        {errors.telefono.message}
                      </p>
                    )}
                  </div>

                  {/* DUI con máscara */}
                  <div>
                    <Label htmlFor="dui" className="text-blue-800">
                      DUI
                    </Label>
                    <div className="relative mt-2">
                      <IMaskInput
                        id="dui"
                        mask="00000000-0"
                        placeholder="Ingrese el DUI"
                        className="pl-10 border-2 border-blue-800 rounded-lg"
                        onAccept={(value) => setValue("dui", value)} // Actualizar el valor en react-hook-form
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-800">
                        <span className="material-icons">badge</span>
                      </span>
                    </div>
                    {errors.dui && (
                      <p className="text-sm text-red-500">
                        {errors.dui.message}
                      </p>
                    )}
                  </div>

                  {/* Dirección */}
                  <div className="col-span-1 md:col-span-2">
                    <Label htmlFor="direccion" className="text-blue-800">
                      Dirección
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="direccion"
                        {...register("direccion")}
                        placeholder="Ingrese la dirección"
                        className="pl-10 border-2 border-blue-800 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-800">
                        <span className="material-icons">location_on</span>
                      </span>
                    </div>
                    {errors.direccion && (
                      <p className="text-sm text-red-500">
                        {errors.direccion.message}
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