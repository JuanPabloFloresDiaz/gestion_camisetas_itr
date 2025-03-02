"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateAdministrador } from "@/services/administradores.service";
import { Administrador } from "@/services/administradores.service";
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

// Esquema de validación con Zod (sin el campo de contraseña)
const adminSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  correo: z.string().email("Correo electrónico inválido"),
  telefono: z.string().min(8, "El teléfono debe tener al menos 8 caracteres"),
  dui: z.string().min(9, "El DUI debe tener 9 caracteres"),
  alias: z.string().min(1, "El alias es obligatorio"),
  estado: z.boolean(),
});

type AdminFormValues = z.infer<typeof adminSchema>;

interface UpdateAdminModalProps {
  admin: Administrador; // El administrador a actualizar
}

export default function UpdateAdminModal({ admin }: UpdateAdminModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [estado, setEstado] = useState(admin.estado);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      nombre: admin.nombre,
      apellido: admin.apellido,
      correo: admin.correo,
      telefono: admin.telefono,
      dui: admin.dui,
      alias: admin.alias,
      estado: admin.estado,
    },
  });

  const onSubmit: SubmitHandler<AdminFormValues> = async (data) => {
    try {
      // Agregar el id del administrador al objeto data
      const payload = { ...data, id: admin.id };
      await updateAdministrador(admin.id, payload);
      setIsOpen(false);
      reset();
    } catch (error) {
      console.error("Error al actualizar administrador:", error);
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
          <ModalContent className="bg-white rounded-lg shadow-lg max-w-lg w-auto h-auto max-h-[73vh] flex flex-col">
            {/* Cabecera con borde amarillo */}
            <ModalHeader className="border-b-2 border-yellow-500 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="material-icons text-yellow-500">edit</span>
                <h2 className="text-xl font-bold text-yellow-500">
                  Actualizar Administrador
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
                    <Label htmlFor="nombre" className="text-yellow-500">
                      Nombre
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="nombre"
                        {...register("nombre")}
                        placeholder="Ingrese el nombre"
                        className="pl-10 border-2 border-yellow-500 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-yellow-500">
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
                    <Label htmlFor="apellido" className="text-yellow-500">
                      Apellido
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="apellido"
                        {...register("apellido")}
                        placeholder="Ingrese el apellido"
                        className="pl-10 border-2 border-yellow-500 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-yellow-500">
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
                    <Label htmlFor="correo" className="text-yellow-500">
                      Correo electrónico
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="correo"
                        type="email"
                        {...register("correo")}
                        placeholder="Ingrese el correo electrónico"
                        className="pl-10 border-2 border-yellow-500 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-yellow-500">
                        <span className="material-icons">email</span>
                      </span>
                    </div>
                    {errors.correo && (
                      <p className="text-sm text-red-500">
                        {errors.correo.message}
                      </p>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div>
                    <Label htmlFor="telefono" className="text-yellow-500">
                      Teléfono
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="telefono"
                        {...register("telefono")}
                        placeholder="Ingrese el teléfono"
                        className="pl-10 border-2 border-yellow-500 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-yellow-500">
                        <span className="material-icons">phone</span>
                      </span>
                    </div>
                    {errors.telefono && (
                      <p className="text-sm text-red-500">
                        {errors.telefono.message}
                      </p>
                    )}
                  </div>

                  {/* DUI */}
                  <div>
                    <Label htmlFor="dui" className="text-yellow-500">
                      DUI
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="dui"
                        {...register("dui")}
                        placeholder="Ingrese el DUI"
                        className="pl-10 border-2 border-yellow-500 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-yellow-500">
                        <span className="material-icons">badge</span>
                      </span>
                    </div>
                    {errors.dui && (
                      <p className="text-sm text-red-500">
                        {errors.dui.message}
                      </p>
                    )}
                  </div>

                  {/* Alias */}
                  <div>
                    <Label htmlFor="alias" className="text-yellow-500">
                      Alias
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="alias"
                        {...register("alias")}
                        placeholder="Ingrese el alias"
                        className="pl-10 border-2 border-yellow-500 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-yellow-500">
                        <span className="material-icons">tag</span>
                      </span>
                    </div>
                    {errors.alias && (
                      <p className="text-sm text-red-500">
                        {errors.alias.message}
                      </p>
                    )}
                  </div>

                  {/* Estado (Ícono) */}
                  <div className="col-span-1 md:col-span-2">
                    <Label htmlFor="estado" className="text-yellow-500">
                      Estado
                    </Label>
                    <div className="mt-2 flex items-center">
                      <button
                        type="button"
                        onClick={() => setEstado(!estado)}
                        className="flex items-center"
                      >
                        <span
                          className={`material-icons text-2xl ${
                            estado ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {estado ? "check_circle" : "cancel"}
                        </span>
                      </button>
                      <input
                        id="estado"
                        type="checkbox"
                        {...register("estado")}
                        className="hidden"
                        checked={estado}
                        onChange={() => setEstado(!estado)}
                      />
                    </div>
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