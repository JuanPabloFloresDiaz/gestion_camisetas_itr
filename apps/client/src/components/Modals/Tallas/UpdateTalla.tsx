"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateTalla } from "@/services/tallas.service";
import { Talla } from "@/services/tallas.service";
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

const tallaSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(50, "El nombre no puede tener más de 50 caracteres"),
});

type TallaFormValues = z.infer<typeof tallaSchema>;

interface UpdateTallaModalProps {
  talla: Talla;
  currentPage: number;
}

export default function UpdateTallaModal({ talla }: UpdateTallaModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

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
      const payload = { ...data, id: talla.id };
      await updateTalla(talla.id, payload);

      // Invalidar consulta y mantener scroll position
      await queryClient.invalidateQueries({
        queryKey: ["tallas"],
        exact: false,
        refetchPage: (page: number, index: number) => index === currentPage - 1 
      });
      
      toast.success("Talla actualizada", {
        description: "La talla se ha actualizado correctamente.",
      });

      setIsOpen(false);
      reset();
    } catch (error) {
      console.error("Error al actualizar talla:", error);
      toast.error("Error", {
        description: "No se pudo actualizar la talla.",
      });
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="text-amber-500 hover:bg-amber-100 hover:text-amber-700 rounded-full w-9 h-9 p-0 flex items-center justify-center transition-all"
        onClick={() => setIsOpen(true)}
        title="Editar talla"
      >
        <span className="material-icons">edit</span>
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/50 backdrop-blur-sm">
          <ModalContent className="bg-white rounded-xl shadow-2xl max-w-lg w-full h-auto max-h-[85vh] flex flex-col border border-gray-100">
            <ModalHeader className="border-b p-5 flex items-center justify-between bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-t-xl">
              <div className="flex items-center space-x-3">
                <span className="material-icons text-white">edit</span>
                <h2 className="text-xl font-bold">Actualizar Talla</h2>
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
                        placeholder="Nombre de la talla"
                        className="pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-amber-500">
                        <span className="material-icons">straighten</span>
                      </span>
                    </div>
                    {errors.nombre && <p className="text-sm text-red-500 mt-1">{errors.nombre.message}</p>}
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
