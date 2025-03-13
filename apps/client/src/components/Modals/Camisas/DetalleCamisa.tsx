"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal"
import Image from "next/image"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { getAllTallas } from "@/services/tallas.service"
import {
  searchDetalleCamisasByCamisa,
  createDetalleCamisas,
  deleteDetalleCamisa,
  type DetalleCamisa,
} from "@/services/detalle_camisas.service"
import type { Camisa } from "@/services/camisas.service"

interface DetalleCamisaModalProps {
  camisa: Camisa
}

export default function DetalleCamisasModal({ camisa }: DetalleCamisaModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTallas, setSelectedTallas] = useState<string[]>([])
  const queryClient = useQueryClient()

  // Obtener todas las tallas disponibles
  const { data: tallas } = useQuery({
    queryKey: ["tallas"],
    queryFn: getAllTallas,
  })

  // Obtener detalles existentes para la camisa
  const { data: existingDetails } = useQuery({
    queryKey: ["detalleCamisas", camisa.id],
    queryFn: () => searchDetalleCamisasByCamisa(camisa.id),
    enabled: isOpen,
    select: (data) => data as DetalleCamisa[],
  })

  // Obtener IDs de detalles existentes
  const existingDetailIds = existingDetails?.map((d) => d.id) || []

  // Obtener tallas asociadas a la camisa
  const getTallasAsociadas = () => {
    if (!tallas) return []
    return tallas.filter((talla) => talla.detallesCamisas.some((dc) => existingDetailIds.includes(dc.id)))
  }

  // Cargar selecciones iniciales
  useEffect(() => {
    const asociadas = getTallasAsociadas().map((t) => t.id)
    setSelectedTallas(asociadas)
  }, [tallas, existingDetails])

  const handleCheckboxChange = (tallaId: string) => {
    setSelectedTallas((prev) => (prev.includes(tallaId) ? prev.filter((id) => id !== tallaId) : [...prev, tallaId]))
  }

  const handleAddTallas = async () => {
    try {
      const nuevasTallas = tallas?.filter(
        (t) => selectedTallas.includes(t.id) && !getTallasAsociadas().some((ta) => ta.id === t.id),
      )

      if (nuevasTallas && nuevasTallas.length > 0) {
        const payload = nuevasTallas.map((talla) => ({
          camisa: camisa,
          talla: talla,
        }))

        await createDetalleCamisas(payload)
        queryClient.invalidateQueries(["detalleCamisas", camisa.id])
        toast.success("Tallas actualizadas correctamente")
      }
    } catch (error) {
      toast.error("Error al guardar las tallas")
    }
  }

  const handleDeleteTalla = async (tallaId: string) => {
    try {
      // Buscar el detalle específico para esta combinación camisa-talla
      const detalleAEliminar = existingDetails?.find((d) => getTallasAsociadas().some((ta) => ta.id === tallaId))

      if (detalleAEliminar) {
        await deleteDetalleCamisa(detalleAEliminar.id)
        queryClient.invalidateQueries(["detalleCamisas", camisa.id])
        toast.success("Talla eliminada correctamente")
      }
    } catch (error) {
      toast.error("Error al eliminar la talla")
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        className="text-indigo-600 hover:bg-indigo-100 hover:text-indigo-800 rounded-full w-9 h-9 p-0 flex items-center justify-center transition-all"
        onClick={() => setIsOpen(true)}
        title="Gestionar tallas"
      >
        <span className="material-icons">straighten</span>
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/50 backdrop-blur-sm">
          <ModalContent className="bg-white rounded-xl shadow-2xl max-w-lg w-full h-auto max-h-[85vh] flex flex-col border border-gray-100">
            <ModalHeader className="border-b p-5 flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-t-xl">
              <div className="flex items-center space-x-3">
                <span className="material-icons text-white">straighten</span>
                <h2 className="text-xl font-bold">Gestión de Tallas</h2>
                <span className="bg-white text-indigo-600 text-xs font-bold px-2 py-1 rounded-full">
                  {camisa.nombre}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/logo.avif" alt="Logo" width={40} height={40} className="rounded-lg bg-white p-1" />
                <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 transition-colors">
                  <span className="material-icons">close</span>
                </button>
              </div>
            </ModalHeader>

            <ModalBody className="p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Tallas existentes */}
                {getTallasAsociadas().length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Label className="text-gray-700 font-medium text-base">Tallas disponibles</Label>
                      <span className="ml-2 bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-1 rounded-full">
                        {getTallasAsociadas().length}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {getTallasAsociadas().map((talla) => (
                        <div
                          key={talla.id}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="material-icons text-indigo-500 text-sm">check_circle</span>
                            <span className="font-medium">{talla.nombre}</span>
                          </div>
                          <Button
                            variant="ghost"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full w-8 h-8 p-0"
                            onClick={() => handleDeleteTalla(talla.id)}
                            title="Eliminar talla"
                          >
                            <span className="material-icons text-sm">delete</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selección de nuevas tallas */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Label className="text-gray-700 font-medium text-base">
                      {getTallasAsociadas().length ? "Agregar más tallas" : "Seleccionar tallas"}
                    </Label>
                    {tallas && tallas.filter((t) => !getTallasAsociadas().some((ta) => ta.id === t.id)).length > 0 && (
                      <span className="ml-2 bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                        {tallas.filter((t) => !getTallasAsociadas().some((ta) => ta.id === t.id)).length} disponibles
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {tallas?.map(
                      (talla) =>
                        !getTallasAsociadas().some((ta) => ta.id === talla.id) && (
                          <label
                            key={talla.id}
                            className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all ${
                              selectedTallas.includes(talla.id)
                                ? "border-indigo-500 bg-indigo-50"
                                : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                            }`}
                          >
                            <div className="relative flex items-center justify-center w-5 h-5">
                              <input
                                type="checkbox"
                                checked={selectedTallas.includes(talla.id)}
                                onChange={() => handleCheckboxChange(talla.id)}
                                className="peer sr-only"
                              />
                              <div
                                className={`absolute inset-0 rounded border ${
                                  selectedTallas.includes(talla.id)
                                    ? "bg-indigo-600 border-indigo-600"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedTallas.includes(talla.id) && (
                                  <span className="material-icons text-white text-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    check
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="font-medium">{talla.nombre}</span>
                          </label>
                        ),
                    )}
                  </div>

                  {tallas && tallas.filter((t) => !getTallasAsociadas().some((ta) => ta.id === t.id)).length === 0 && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      <span className="material-icons text-gray-400 text-3xl mb-2">inventory_2</span>
                      <p className="text-gray-500">Todas las tallas ya están asignadas a esta camisa</p>
                    </div>
                  )}
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="flex justify-end space-x-3 mt-2 p-5 border-t">
              <Button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="material-icons mr-2">cancel</span>
                Cancelar
              </Button>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center transition-colors"
                onClick={handleAddTallas}
                disabled={
                  !tallas ||
                  tallas.filter(
                    (t) => selectedTallas.includes(t.id) && !getTallasAsociadas().some((ta) => ta.id === t.id),
                  ).length === 0
                }
              >
                <span className="material-icons mr-2">save</span>
                Guardar
              </Button>
            </ModalFooter>
          </ModalContent>
        </div>
      </Modal>
    </>
  )
}

