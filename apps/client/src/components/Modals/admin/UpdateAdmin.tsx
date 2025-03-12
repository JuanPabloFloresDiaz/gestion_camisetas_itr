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
import { useQueryClient } from "@tanstack/react-query";
import { IMaskInput } from "react-imask";
import { toast } from "sonner";

const adminSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(50, "El nombre no puede tener más de 50 caracteres"),
  apellido: z.string().min(1, "El apellido es obligatorio").max(50, "El apellido no puede tener más de 50 caracteres"),
  correo: z.string().email("El correo debe tener un formato válido").max(80, "El correo no puede tener más de 80 caracteres"),
  telefono: z.string().min(1, "El teléfono es obligatorio").max(15, "El teléfono no puede tener más de 15 caracteres"),
  dui: z.string().max(10, "El DUI no puede tener más de 10 caracteres").optional().nullable(),
  alias: z.string().max(25, "El alias no puede tener más de 25 caracteres").optional().nullable(),
  estado: z.boolean().optional(),
});

type AdminFormValues = z.infer<typeof adminSchema>;

interface UpdateAdminModalProps {
  admin: Administrador;
  currentPage: number;
}

export default function UpdateAdminModal({ admin }: UpdateAdminModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [estado, setEstado] = useState(admin.estado);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
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
      const payload = { ...data, id: admin.id };
      await updateAdministrador(admin.id, payload);

      // Invalidar consulta y mantener scroll position
      await queryClient.invalidateQueries({
        queryKey: ["administradores"],
        exact: false,
        refetchPage: (page: number, index: number) => index === currentPage - 1
      });

      toast.success("Administrador actualizado", {
        description: "El administrador se ha actualizado correctamente.",
      });

      setIsOpen(false);
      reset();
    } catch (error) {
      console.error("Error al actualizar administrador:", error);
      toast.error("Error", {
        description: "No se pudo actualizar el administrador.",
      });
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="text-amber-500 hover:bg-amber-100 hover:text-amber-700 rounded-full w-9 h-9 p-0 flex items-center justify-center transition-all"
        onClick={() => setIsOpen(true)}
        title="Editar administrador"
      >
        <span className="material-icons">edit</span>
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/50 backdrop-blur-sm">
          <ModalContent className="bg-white rounded-xl shadow-2xl max-w-lg w-full h-auto max-h-[85vh] flex flex-col border border-gray-100">
            <ModalHeader className="border-b p-5 flex items-center justify-between bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-t-xl">
              <div className="flex items-center space-x-3">
                <span className="material-icons text-white">edit</span>
                <h2 className="text-xl font-bold">Actualizar Administrador</h2>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Nombre</Label>
                    <div className="relative">
                      <Input
                        {...register("nombre")}
                        placeholder="Nombre del administrador"
                        className="pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-amber-500">
                        <span className="material-icons">person</span>
                      </span>
                    </div>
                    {errors.nombre && <p className="text-sm text-red-500 mt-1">{errors.nombre.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Apellido</Label>
                    <div className="relative">
                      <Input
                        {...register("apellido")}
                        placeholder="Apellido del administrador"
                        className="pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-amber-500">
                        <span className="material-icons">person</span>
                      </span>
                    </div>
                    {errors.apellido && <p className="text-sm text-red-500 mt-1">{errors.apellido.message}</p>}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-gray-700 font-medium">Correo electrónico</Label>
                    <div className="relative">
                      <Input
                        type="email"
                        {...register("correo")}
                        placeholder="Correo electrónico"
                        className="pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-amber-500">
                        <span className="material-icons">email</span>
                      </span>
                    </div>
                    {errors.correo && <p className="text-sm text-red-500 mt-1">{errors.correo.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Teléfono</Label>
                    <div className="relative">
                      <IMaskInput
                        mask="0000-0000"
                        placeholder="Teléfono"
                        className="pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        defaultValue={admin.telefono}
                        onAccept={(value) => setValue("telefono", value)}
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-amber-500">
                        <span className="material-icons">phone</span>
                      </span>
                    </div>
                    {errors.telefono && <p className="text-sm text-red-500 mt-1">{errors.telefono.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">DUI</Label>
                    <div className="relative">
                      <IMaskInput
                        mask="00000000-0"
                        placeholder="DUI"
                        className="pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        defaultValue={admin.dui|| ''}
                        onAccept={(value) => setValue("dui", value)}
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-amber-500">
                        <span className="material-icons">badge</span>
                      </span>
                    </div>
                    {errors.dui && <p className="text-sm text-red-500 mt-1">{errors.dui.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Alias</Label>
                    <div className="relative">
                      <Input
                        {...register("alias")}
                        placeholder="Alias"
                        className="pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-amber-500">
                        <span className="material-icons">tag</span>
                      </span>
                    </div>
                    {errors.alias && <p className="text-sm text-red-500 mt-1">{errors.alias.message}</p>}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-gray-700 font-medium">Estado</Label>
                    <div className="mt-2 flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setEstado(!estado);
                          setValue("estado", !estado);
                        }}
                        className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2 rounded-lg"
                      >
                        <span className={`material-icons text-2xl ${estado ? "text-green-500" : "text-red-500"}`}>
                          {estado ? "check_circle" : "cancel"}
                        </span>
                        <span className="font-medium">{estado ? "Activo" : "Inactivo"}</span>
                      </button>
                    </div>
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
                  <Button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-white flex items-center transition-colors"
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
