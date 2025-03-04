"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateCamisa } from "@/services/camisas.service";
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
import { getTipoCamisas } from "@/services/tipo_camisas.service";

const camisaUpdateSchema = z.object({
  nombre: z.string().min(1, "Nombre obligatorio").max(50),
  descripcion: z.string().max(200).optional(),
  precio: z.number().min(0).max(999.99),
  estadoVenta: z.boolean(),
  tipoCamisa: z.object({ id: z.string() }),
});

type CamisaUpdateFormValues = z.infer<typeof camisaUpdateSchema>;

interface UpdateCamisaModalProps {
  camisa: Camisa;
}

export default function UpdateCamisaModal({ camisa }: UpdateCamisaModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [estadoVenta, setEstadoVenta] = useState(camisa.estadoVenta);
  const [defaultTipoCamisaId, setDefaultTipoCamisaId] = useState("");
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<CamisaUpdateFormValues>({
    resolver: zodResolver(camisaUpdateSchema),
    defaultValues: {
      nombre: camisa.nombre,
      descripcion: camisa.descripcion,
      precio: camisa.precio,
      estadoVenta: camisa.estadoVenta,
      tipoCamisa: { id: "" }, // Valor temporal inicial
    },
  });

  const { data: tipoCamisas } = useQuery({
    queryKey: ["tipoCamisas"],
    queryFn: getTipoCamisas,
  });

  useEffect(() => {
    if (tipoCamisas && camisa) {
      const tipoEncontrado = tipoCamisas.find(tipo => 
        tipo.camisas.some(c => c.id === camisa.id)
      );
      
      if (tipoEncontrado) {
        setValue("tipoCamisa.id", tipoEncontrado.id);
        setDefaultTipoCamisaId(tipoEncontrado.id);
      }
    }
  }, [tipoCamisas, camisa, setValue]);

  const onSubmit: SubmitHandler<CamisaUpdateFormValues> = async (data) => {
    try {
      const payload = { ...data, id: camisa.id };
      const updatedCamisa = await updateCamisa(camisa.id, payload);

      queryClient.setQueryData(["camisas"], (oldData: Camisa[] | undefined) => {
        return oldData?.map(item => 
          item.id === updatedCamisa.id ? updatedCamisa : item
        ) || [updatedCamisa];
      });

      toast.success("Camisa actualizada", {
        description: "La camisa se ha actualizado correctamente.",
      });

      setIsOpen(false);
      reset();
    } catch (error) {
      toast.error("Error al actualizar camisa");
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="text-yellow-500 hover:bg-yellow-500 hover:text-white"
        onClick={() => setIsOpen(true)}
      >
        <span className="material-icons mr-2">edit</span>
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-neutral-500 bg-opacity-5">
          <ModalContent className="bg-white rounded-lg shadow-lg max-w-lg w-auto h-auto max-h-[73vh] flex flex-col">
            <ModalHeader className="border-b-2 border-yellow-500 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="material-icons text-yellow-500">edit</span>
                <h2 className="text-xl font-bold text-yellow-500">Actualizar Camisa</h2>
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
                    <Label className="text-yellow-500">Nombre</Label>
                    <div className="relative mt-2">
                      <Input
                        {...register("nombre")}
                        placeholder="Nombre de la camisa"
                        className="pl-10 border-2 border-yellow-500 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-yellow-500">
                        <span className="material-icons">checkroom</span>
                      </span>
                    </div>
                    {errors.nombre && (
                      <p className="text-sm text-red-500">{errors.nombre.message}</p>
                    )}
                  </div>

                  {/* Precio */}
                  <div>
                    <Label className="text-yellow-500">Precio ($)</Label>
                    <div className="relative mt-2">
                      <Input
                        type="number"
                        {...register("precio", { valueAsNumber: true })}
                        placeholder="0.00"
                        className="pl-10 border-2 border-yellow-500 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-yellow-500">
                        <span className="material-icons">attach_money</span>
                      </span>
                    </div>
                    {errors.precio && (
                      <p className="text-sm text-red-500">{errors.precio.message}</p>
                    )}
                  </div>

                  {/* Descripción */}
                  <div className="md:col-span-2">
                    <Label className="text-yellow-500">Descripción</Label>
                    <div className="relative mt-2">
                      <Input
                        {...register("descripcion")}
                        placeholder="Descripción de la camisa"
                        className="pl-10 border-2 border-yellow-500 rounded-lg"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-yellow-500">
                        <span className="material-icons">description</span>
                      </span>
                    </div>
                    {errors.descripcion && (
                      <p className="text-sm text-red-500">{errors.descripcion.message}</p>
                    )}
                  </div>

                  {/* Tipo de Camisa */}
                  <div className="md:col-span-2">
                    <Label className="text-yellow-500">Tipo de Camisa</Label>
                    <div className="relative mt-2">
                      <select
                        {...register("tipoCamisa.id")}
                        className="w-full pl-10 border-2 border-yellow-500 rounded-lg bg-white h-10"
                        value={defaultTipoCamisaId}
                        onChange={(e) => {
                          setDefaultTipoCamisaId(e.target.value);
                          setValue("tipoCamisa.id", e.target.value);
                        }}
                      >
                        <option value="">Seleccione...</option>
                        {tipoCamisas?.map((tipo) => (
                          <option key={tipo.id} value={tipo.id}>
                            {tipo.nombre}
                          </option>
                        ))}
                      </select>
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-yellow-500">
                        <span className="material-icons">tag</span>
                      </span>
                    </div>
                    {errors.tipoCamisa?.id && (
                      <p className="text-sm text-red-500">{errors.tipoCamisa.id.message}</p>
                    )}
                  </div>

                  {/* Estado de Venta */}
                  <div className="md:col-span-2">
                    <Label className="text-yellow-500">Estado de Venta</Label>
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
                    className="bg-gray-400 hover:bg-gray-500 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="material-icons mr-2">cancel</span>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-700 flex items-center"
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