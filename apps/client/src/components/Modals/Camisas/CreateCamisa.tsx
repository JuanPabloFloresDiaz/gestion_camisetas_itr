"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, type SubmitHandler } from "react-hook-form"
import { createCamisa } from "@/services/camisas.service"
import type { Camisa } from "@/services/camisas.service"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { getAdministradores } from "@/services/administradores.service"
import { getTipoCamisas } from "@/services/tipo_camisas.service"

const camisaSchema = z.object({
  nombre: z.string().min(1, "Nombre obligatorio").max(50),
  descripcion: z.string().max(200).optional(),
  precio: z.number().min(0).max(999.99),
  estadoVenta: z.boolean(),
  administrador: z.object({ id: z.string() }),
  tipoCamisa: z.object({ id: z.string() }),
})

type CamisaFormValues = z.infer<typeof camisaSchema>

export default function CreateCamisaModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [estadoVenta, setEstadoVenta] = useState(true)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CamisaFormValues>({
    resolver: zodResolver(camisaSchema),
    defaultValues: {
      estadoVenta: true,
    },
  })

  const { data: administradores } = useQuery({
    queryKey: ["administradores"],
    queryFn: getAdministradores,
  })

  const { data: tipoCamisas } = useQuery({
    queryKey: ["tipoCamisas"],
    queryFn: getTipoCamisas,
  })

  const onSubmit: SubmitHandler<CamisaFormValues> = async (data) => {
    try {
      const newCamisa = await createCamisa(data)
      // Actualizar la caché de TanStack Query
      queryClient.setQueryData(["camisas"], (oldData: Camisa[] | undefined) => {
        return oldData ? [...oldData, newCamisa] : [newCamisa]
      })

      // Mostrar alerta de éxito con sonner
      toast.success("Camisa creada", {
        description: "La camisa se ha agregado correctamente.",
      })
      setIsOpen(false)
      reset()
    } catch (error) {
      toast.error("Error al crear camisa")
    }
  }

  return (
    <>
      <Button
        className="bg-blue-700 text-white hover:bg-blue-800 transition-colors rounded-lg shadow-sm flex items-center space-x-2 px-4"
        onClick={() => setIsOpen(true)}
      >
        <span className="material-icons">add_circle</span>
        <span>Agregar Camisa</span>
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/50 backdrop-blur-sm">
          <ModalContent className="bg-white rounded-xl shadow-2xl max-w-lg w-full h-auto max-h-[85vh] flex flex-col border border-gray-100">
            <ModalHeader className="border-b p-5 flex items-center justify-between bg-gradient-to-r from-blue-800 to-blue-700 text-white rounded-t-xl">
              <div className="flex items-center space-x-3">
                <span className="material-icons text-white">add_circle</span>
                <h2 className="text-xl font-bold">Crear Camisa</h2>
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
                  {/* Nombre */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Nombre</Label>
                    <div className="relative">
                      <Input
                        {...register("nombre")}
                        placeholder="Nombre de la camisa"
                        className="pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-600">
                        <span className="material-icons">checkroom</span>
                      </span>
                    </div>
                    {errors.nombre && <p className="text-sm text-red-500 mt-1">{errors.nombre.message}</p>}
                  </div>

                  {/* Precio */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Precio ($)</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        {...register("precio", { valueAsNumber: true })}
                        placeholder="0.00"
                        className="pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-600">
                        <span className="material-icons">attach_money</span>
                      </span>
                    </div>
                    {errors.precio && <p className="text-sm text-red-500 mt-1">{errors.precio.message}</p>}
                  </div>

                  {/* Descripción */}
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-gray-700 font-medium">Descripción</Label>
                    <div className="relative">
                      <Input
                        {...register("descripcion")}
                        placeholder="Descripción de la camisa"
                        className="pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-600">
                        <span className="material-icons">description</span>
                      </span>
                    </div>
                    {errors.descripcion && <p className="text-sm text-red-500 mt-1">{errors.descripcion.message}</p>}
                  </div>

                  {/* Administrador */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Administrador</Label>
                    <div className="relative">
                      <select
                        {...register("administrador.id")}
                        className="w-full pl-10 border border-gray-300 rounded-lg bg-white h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        onChange={(e) => setValue("administrador.id", e.target.value)}
                      >
                        <option value="">Seleccione...</option>
                        {administradores?.map((admin) => (
                          <option key={admin.id} value={admin.id}>
                            {admin.nombre} {admin.apellido}
                          </option>
                        ))}
                      </select>
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-600">
                        <span className="material-icons">person</span>
                      </span>
                    </div>
                    {errors.administrador?.id && (
                      <p className="text-sm text-red-500 mt-1">{errors.administrador.id.message}</p>
                    )}
                  </div>

                  {/* Tipo de Camisa */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Tipo de Camisa</Label>
                    <div className="relative">
                      <select
                        {...register("tipoCamisa.id")}
                        className="w-full pl-10 border border-gray-300 rounded-lg bg-white h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        onChange={(e) => setValue("tipoCamisa.id", e.target.value)}
                      >
                        <option value="">Seleccione...</option>
                        {tipoCamisas?.map((tipo) => (
                          <option key={tipo.id} value={tipo.id}>
                            {tipo.nombre}
                          </option>
                        ))}
                      </select>
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-600">
                        <span className="material-icons">tag</span>
                      </span>
                    </div>
                    {errors.tipoCamisa?.id && (
                      <p className="text-sm text-red-500 mt-1">{errors.tipoCamisa.id.message}</p>
                    )}
                  </div>

                  {/* Estado de Venta */}
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-gray-700 font-medium">Estado de Venta</Label>
                    <div className="mt-2 flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setEstadoVenta(!estadoVenta)
                          setValue("estadoVenta", !estadoVenta)
                        }}
                        className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2 rounded-lg"
                      >
                        <span className={`material-icons text-2xl ${estadoVenta ? "text-green-500" : "text-red-500"}`}>
                          {estadoVenta ? "check_circle" : "cancel"}
                        </span>
                        <span className="font-medium">{estadoVenta ? "Disponible para venta" : "No disponible"}</span>
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
  )
}

