"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { createCamisa } from "@/services/camisas.service";
import { Camisa } from "@/services/camisas.service";
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
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAdministradores } from "@/services/administradores.service";
import { getTipoCamisas } from "@/services/tipo_camisas.service";

const camisaSchema = z.object({
  nombre: z.string().min(1, "Nombre obligatorio").max(50),
  descripcion: z.string().max(200).optional(),
  precio: z.number().min(0).max(999.99),
  estadoVenta: z.boolean(),
  administrador: z.object({ id: z.string() }),
  tipoCamisa: z.object({ id: z.string() }),
});

type CamisaFormValues = z.infer<typeof camisaSchema>;

export default function CreateCamisaModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [estadoVenta, setEstadoVenta] = useState(true);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<CamisaFormValues>({
    resolver: zodResolver(camisaSchema),
    defaultValues: {
      estadoVenta: true,
    },
  });

  const { data: administradores } = useQuery({
    queryKey: ["administradores"],
    queryFn: getAdministradores,
  });

  const { data: tipoCamisas } = useQuery({
    queryKey: ["tipoCamisas"],
    queryFn: getTipoCamisas,
  });

  const onSubmit: SubmitHandler<CamisaFormValues> = async (data) => {
    try {
      const newCamisa = await createCamisa(data);
      // Actualizar la caché de TanStack Query
      queryClient.setQueryData(["camisas"], (oldData: Camisa[] | undefined) => {
      return oldData ? [...oldData, newCamisa] : [newCamisa];
      });
      
        // Mostrar alerta de éxito con sonner
        toast.success("Camisa creada", {
            description: "La camisa se ha agregado correctamente.",
        });
      setIsOpen(false);
      reset();
    } catch (error) {
      toast.error("Error al crear camisa");
    }
  };

  return (
    <>
      <Button
        className="bg-blue-800 text-white hover:bg-gray-900"
        onClick={() => setIsOpen(true)}
      >
        <span className="material-icons mr-2">add</span>
        Agregar Camisa
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-neutral-500 bg-opacity-5">
          <ModalContent className="bg-white rounded-lg shadow-lg max-w-lg w-auto h-auto max-h-[83vh] flex flex-col">
            <ModalHeader className="border-b-2 border-blue-800 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="material-icons text-blue-800">add</span>
                <h2 className="text-xl font-bold text-blue-800">Crear Camisa</h2>
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nombre */}
                  <div>
                    <Label className="text-blue-800">Nombre</Label>
                    <div className="relative mt-2">
                      <Input
                        {...register("nombre")}
                        placeholder="Nombre de la camisa"
                        className="pl-10 border-2 border-blue-800 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-800">
                        <span className="material-icons">checkroom</span>
                      </span>
                    </div>
                    {errors.nombre && (
                      <p className="text-sm text-red-500">{errors.nombre.message}</p>
                    )}
                  </div>

                  {/* Precio */}
                  <div>
                    <Label className="text-blue-800">Precio ($)</Label>
                    <div className="relative mt-2">
                      <Input
                        type="number"
                        {...register("precio", { valueAsNumber: true })}
                        placeholder="0.00"
                        className="pl-10 border-2 border-blue-800 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-800">
                        <span className="material-icons">attach_money</span>
                      </span>
                    </div>
                    {errors.precio && (
                      <p className="text-sm text-red-500">{errors.precio.message}</p>
                    )}
                  </div>

                  {/* Descripción */}
                  <div className="md:col-span-2">
                    <Label className="text-blue-800">Descripción</Label>
                    <div className="relative mt-2">
                      <Input
                        {...register("descripcion")}
                        placeholder="Descripción de la camisa"
                        className="pl-10 border-2 border-blue-800 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-800">
                        <span className="material-icons">description</span>
                      </span>
                    </div>
                    {errors.descripcion && (
                      <p className="text-sm text-red-500">{errors.descripcion.message}</p>
                    )}
                  </div>

                  {/* Administrador */}
                  <div>
                    <Label className="text-blue-800">Administrador</Label>
                    <div className="relative mt-2">
                      <select
                        {...register("administrador.id")}
                        className="w-full pl-10 border-2 border-blue-800 rounded-lg bg-white h-10"
                        onChange={(e) => setValue("administrador.id", e.target.value)}
                      >
                        <option value="">Seleccione...</option>
                        {administradores?.map((admin) => (
                          <option key={admin.id} value={admin.id}>
                            {admin.nombre} {admin.apellido}
                          </option>
                        ))}
                      </select>
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-800">
                        <span className="material-icons">person</span>
                      </span>
                    </div>
                    {errors.administrador?.id && (
                      <p className="text-sm text-red-500">{errors.administrador.id.message}</p>
                    )}
                  </div>

                  {/* Tipo de Camisa */}
                  <div>
                    <Label className="text-blue-800">Tipo de Camisa</Label>
                    <div className="relative mt-2">
                      <select
                        {...register("tipoCamisa.id")}
                        className="w-full pl-10 border-2 border-blue-800 rounded-lg bg-white h-10"
                        onChange={(e) => setValue("tipoCamisa.id", e.target.value)}
                      >
                        <option value="">Seleccione...</option>
                        {tipoCamisas?.map((tipo) => (
                          <option key={tipo.id} value={tipo.id}>
                            {tipo.nombre}
                          </option>
                        ))}
                      </select>
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-800">
                        <span className="material-icons">tag</span>
                      </span>
                    </div>
                    {errors.tipoCamisa?.id && (
                      <p className="text-sm text-red-500">{errors.tipoCamisa.id.message}</p>
                    )}
                  </div>

                  {/* Estado de Venta */}
                  <div className="md:col-span-2">
                    <Label className="text-blue-800">Estado de Venta</Label>
                    <div className="mt-2 flex items-center">
                      <button
                        type="button"
                        onClick={() => {
                          setEstadoVenta(!estadoVenta);
                          setValue("estadoVenta", !estadoVenta);
                        }}
                        className="flex items-center"
                      >
                        <span
                          className={`material-icons text-2xl ${
                            estadoVenta ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {estadoVenta ? "check_circle" : "cancel"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

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