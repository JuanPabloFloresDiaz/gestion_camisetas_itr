"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getClientees } from "@/services/clientes.service"
import { getCamisas } from "@/services/camisas.service"
import { getTallas } from "@/services/tallas.service"
import { createPedidoWithDetails } from "@/services/pedidos.service"
import {
  Calendar,
  ShoppingBag,
  MapPin,
  User,
  ShoppingCart,
  Shirt,
  Ruler,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  X,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

interface CreatePedidoModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SelectedItem {
  camisaId: string
  tallaId: string
  detalleCamisaId: string
  cantidad: number
}

export default function CreatePedidoModal({ isOpen, onClose }: CreatePedidoModalProps) {
  const queryClient = useQueryClient()
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])
  const [formData, setFormData] = useState({
    fechaPedido: new Date().toISOString().split("T")[0],
    direccionPedido: "",
    clienteId: "",
  })

  // Obtener clientes
  const { data: clientes } = useQuery({
    queryKey: ["clientes"],
    queryFn: getClientees,
  })

  // Obtener camisas con tallas disponibles
  const { data: camisas } = useQuery({
    queryKey: ["camisas"],
    queryFn: getCamisas,
    select: (data) => data.filter((camisa) => camisa.detallesCamisa.length > 0),
  })

  // Obtener tallas
  const { data: tallas } = useQuery({
    queryKey: ["tallas"],
    queryFn: getTallas,
  })

  const handleSizeSelect = (camisaId: string, tallaId: string) => {
    const camisa = camisas?.find((c) => c.id === camisaId)
    const talla = tallas?.find((t) => t.id === tallaId)

    // Buscar el detalle de camisa que coincide con la talla seleccionada
    const detalleCamisa = camisa?.detallesCamisa.find((dc) => talla?.detallesCamisas.some((tdc) => tdc.id === dc.id))

    if (!detalleCamisa) return

    setSelectedItems((prev) => {
      const exists = prev.find((item) => item.camisaId === camisaId && item.tallaId === tallaId)
      if (exists) return prev

      return [
        ...prev,
        {
          camisaId,
          tallaId,
          detalleCamisaId: detalleCamisa.id,
          cantidad: 1,
        },
      ]
    })
  }

  const handleQuantityChange = (index: number, delta: number) => {
    setSelectedItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              cantidad: Math.min(9, Math.max(1, item.cantidad + delta)),
            }
          : item,
      ),
    )
  }

  const handleSubmit = async () => {
    try {
      const pedido = {
        fechaPedido: new Date(formData.fechaPedido),
        direccionPedido: formData.direccionPedido || null,
        cliente: { id: formData.clienteId },
        estadoPedido: null,
      }

      const detallesPedidos = selectedItems.map((item) => ({
        precioProducto: camisas?.find((c) => c.id === item.camisaId)?.precio || 0,
        cantidadComprada: item.cantidad,
        detalleCamisa: { id: item.detalleCamisaId },
      }))

      await createPedidoWithDetails(pedido, detallesPedidos)
      queryClient.invalidateQueries(["pedidos"])
      toast.success("Pedido creado correctamente")
      onClose()
    } catch (error) {
      toast.error("Error al crear el pedido")
    }
  }

  // Calcular el total del pedido
  const totalPedido = selectedItems.reduce((total, item) => {
    const camisa = camisas?.find((c) => c.id === item.camisaId)
    return total + (camisa?.precio || 0) * item.cantidad
  }, 0)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/50 backdrop-blur-sm">
        <ModalContent className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden">
          <ModalHeader className="border-b p-5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-t-xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              <h2 className="text-xl font-bold">Nuevo Pedido</h2>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </ModalHeader>

          <ScrollArea className="flex-1 overflow-y-auto">
            <ModalBody className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-indigo-500" />
                    Fecha del pedido
                  </Label>
                  <Input
                    type="date"
                    value={formData.fechaPedido}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        fechaPedido: e.target.value,
                      }))
                    }
                    className="border-indigo-200 focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <User className="h-4 w-4 text-indigo-500" />
                    Cliente
                  </Label>
                  <div className="relative">
                    <select
                      className="w-full p-2 border rounded-md appearance-none pl-3 pr-10 py-2 border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white dark:bg-gray-800"
                      value={formData.clienteId}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          clienteId: e.target.value,
                        }))
                      }
                    >
                      <option value="">Seleccionar cliente</option>
                      {clientes?.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nombre} {cliente.apellido}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-indigo-500" />
                    Dirección (opcional)
                  </Label>
                  <Input
                    value={formData.direccionPedido}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        direccionPedido: e.target.value,
                      }))
                    }
                    className="border-indigo-200 focus:border-indigo-500"
                    placeholder="Dirección de entrega"
                  />
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shirt className="h-5 w-5 text-indigo-500" />
                  Selecciona productos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {camisas?.map((camisa) => {
                    const camisaTallas = tallas?.filter((talla) =>
                      talla.detallesCamisas.some((tdc) => camisa.detallesCamisa.some((cdc) => cdc.id === tdc.id)),
                    )

                    if (!camisaTallas?.length) return null

                    return (
                      <Card
                        key={camisa.id}
                        className="overflow-hidden border-indigo-100 hover:border-indigo-300 transition-colors"
                      >
                        <CardContent className="p-0">
                          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-indigo-700 dark:text-indigo-300">{camisa.nombre}</h3>
                                <Badge variant="outline" className="mt-1 bg-white dark:bg-indigo-800 font-semibold">
                                  ${camisa.precio.toFixed(2)}
                                </Badge>
                              </div>
                              <Shirt className="h-6 w-6 text-indigo-500" />
                            </div>
                          </div>

                          <div className="p-4">
                            <Label className="text-sm flex items-center gap-2 mb-2">
                              <Ruler className="h-4 w-4 text-indigo-500" />
                              Tallas disponibles
                            </Label>
                            <div className="flex flex-wrap gap-2">
                              {camisaTallas.map((talla) => {
                                const isSelected = selectedItems.some(
                                  (item) => item.camisaId === camisa.id && item.tallaId === talla.id,
                                )
                                return (
                                  <Button
                                    key={talla.id}
                                    variant={isSelected ? "default" : "outline"}
                                    size="sm"
                                    className={
                                      isSelected
                                        ? "bg-indigo-600 hover:bg-indigo-700"
                                        : "hover:border-indigo-500 hover:text-indigo-500"
                                    }
                                    onClick={() => handleSizeSelect(camisa.id, talla.id)}
                                    disabled={isSelected}
                                  >
                                    {talla.nombre}
                                    {isSelected && <CheckCircle className="ml-1 h-3 w-3" />}
                                  </Button>
                                )
                              })}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {selectedItems.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-indigo-500" />
                    Detalles del Pedido
                  </h3>
                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-indigo-50 dark:bg-indigo-950">
                              <th className="text-left p-3 text-indigo-700 dark:text-indigo-300 font-semibold">
                                Producto
                              </th>
                              <th className="text-left p-3 text-indigo-700 dark:text-indigo-300 font-semibold">
                                Talla
                              </th>
                              <th className="text-left p-3 text-indigo-700 dark:text-indigo-300 font-semibold">
                                Precio
                              </th>
                              <th className="text-left p-3 text-indigo-700 dark:text-indigo-300 font-semibold">
                                Cantidad
                              </th>
                              <th className="text-left p-3 text-indigo-700 dark:text-indigo-300 font-semibold">
                                Subtotal
                              </th>
                              <th className="text-left p-3 text-indigo-700 dark:text-indigo-300 font-semibold"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedItems.map((item, index) => {
                              const camisa = camisas?.find((c) => c.id === item.camisaId)
                              const talla = tallas?.find((t) => t.id === item.tallaId)
                              const subtotal = (camisa?.precio || 0) * item.cantidad

                              return (
                                <tr
                                  key={`${item.camisaId}-${item.tallaId}`}
                                  className="border-b border-indigo-100 dark:border-indigo-800"
                                >
                                  <td className="p-3">
                                    <div className="flex items-center gap-2">
                                      <Shirt className="h-4 w-4 text-indigo-500" />
                                      <span>{camisa?.nombre}</span>
                                    </div>
                                  </td>
                                  <td className="p-3">
                                    <Badge
                                      variant="outline"
                                      className="bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
                                    >
                                      {talla?.nombre}
                                    </Badge>
                                  </td>
                                  <td className="p-3">${camisa?.precio.toFixed(2)}</td>
                                  <td className="p-3">
                                    <div className="flex items-center gap-1">
                                      <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-7 w-7 rounded-full border-indigo-200"
                                        onClick={() => handleQuantityChange(index, -1)}
                                        disabled={item.cantidad <= 1}
                                      >
                                        <Minus className="h-3 w-3" />
                                      </Button>
                                      <span className="w-8 text-center font-medium">{item.cantidad}</span>
                                      <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-7 w-7 rounded-full border-indigo-200"
                                        onClick={() => handleQuantityChange(index, 1)}
                                        disabled={item.cantidad >= 9}
                                      >
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </td>
                                  <td className="p-3 font-medium">${subtotal.toFixed(2)}</td>
                                  <td className="p-3">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                      onClick={() => setSelectedItems((prev) => prev.filter((_, i) => i !== index))}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </td>
                                </tr>
                              )
                            })}
                            <tr className="bg-indigo-50 dark:bg-indigo-950">
                              <td colSpan={4} className="p-3 text-right font-bold text-indigo-700 dark:text-indigo-300">
                                Total:
                              </td>
                              <td className="p-3 font-bold text-indigo-700 dark:text-indigo-300">
                                ${totalPedido.toFixed(2)}
                              </td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </ModalBody>
          </ScrollArea>

          <ModalFooter className="flex justify-end space-x-3 p-5 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!formData.clienteId || selectedItems.length === 0}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Crear Pedido
            </Button>
          </ModalFooter>
        </ModalContent>
      </div>
    </Modal>
  )
}
