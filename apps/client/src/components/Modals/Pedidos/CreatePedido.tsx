"use client";

import { useState, useEffect } from "react";
import { useQueryClient, useQuery, useQueries } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { toast } from "sonner";
import { getClientees } from "@/services/clientes.service";
import { getCamisas, type Camisa } from "@/services/camisas.service";
import { searchDetalleCamisasByCamisa } from "@/services/detalle_camisas.service";
import { createPedidoWithDetails } from "@/services/pedidos.service";
import type { Pedido, DetallePedido } from "@/services/pedidos.service";

interface CreatePedidoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePedidoModal({ isOpen, onClose }: CreatePedidoModalProps) {
  const queryClient = useQueryClient();
  const [selectedCliente, setSelectedCliente] = useState<string>("");
  const [fechaPedido, setFechaPedido] = useState<string>(new Date().toISOString().split('T')[0]);
  const [direccion, setDireccion] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<Array<{
    camisaId: string;
    tallaId: string;
    cantidad: number;
  }>>([]);

  // Obtener clientes
  const { data: clientes } = useQuery({
    queryKey: ["clientes"],
    queryFn: getClientees,
  });

  // Obtener camisas
  const { data: camisas } = useQuery({
    queryKey: ["camisas"],
    queryFn: getCamisas,
  });

  // Obtener detalles de camisas en paralelo
  const detallesCamisasResults = useQueries({
    queries: camisas?.map(camisa => ({
      queryKey: ["detalleCamisas", camisa.id],
      queryFn: () => searchDetalleCamisasByCamisa(camisa.id),
      enabled: !!camisa.id,
    })) || [],
  });

  // Filtrar camisas con tallas disponibles
  const camisasConTallas = camisas?.filter((camisa, index) => {
    const detalles = detallesCamisasResults[index]?.data;
    return detalles && detalles.length > 0;
  }) || [];

  // Manejar selección de tallas
  const handleSelectTalla = (camisaId: string, tallaId: string) => {
    setSelectedItems(prev => {
      const exists = prev.some(item => item.camisaId === camisaId && item.tallaId === tallaId);
      if (exists) return prev;
      return [...prev, { camisaId, tallaId, cantidad: 1 }];
    });
  };

  // Manejar cambio de cantidad
  const updateQuantity = (index: number, newValue: number) => {
    newValue = Math.max(1, Math.min(9, newValue));
    setSelectedItems(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, cantidad: newValue } : item
      )
    );
  };

  // Enviar formulario
  const handleSubmit = async () => {
    if (!selectedCliente || selectedItems.length === 0) {
      toast.error("Seleccione un cliente y al menos un producto");
      return;
    }

    const pedido: Pedido = {
      fechaPedido: new Date(fechaPedido),
      direccionPedido: direccion || null,
      cliente: { id: selectedCliente },
      estadoPedido: "Pendiente",
    };

    const detallesPedidos: DetallePedido[] = selectedItems.map(item => {
      const camisa = camisas?.find(c => c.id === item.camisaId);
      const detalles = detallesCamisasResults.find(q => 
        q.data?.some(d => d.camisa.id === item.camisaId && d.talla.id === item.tallaId)
      )?.data || [];

      const detalleCamisa = detalles.find(d => 
        d.talla.id === item.tallaId && d.camisa.id === item.camisaId
      );

      return {
        precioProducto: camisa?.precio || 0,
        cantidadComprada: item.cantidad,
        detalleCamisa: { id: detalleCamisa?.id || "" },
      };
    });

    try {
      await createPedidoWithDetails(pedido, detallesPedidos);
      queryClient.invalidateQueries({ queryKey: ["pedidos"] });
      toast.success("Pedido creado exitosamente");
      onClose();
    } catch (error) {
      toast.error("Error al crear el pedido");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <ModalContent className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <ModalHeader className="border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Nuevo Pedido</h2>
          </ModalHeader>
          
          <ModalBody className="space-y-6 mt-4">
            {/* Sección de datos del pedido */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Fecha del Pedido</Label>
                <input
                  type="date"
                  value={fechaPedido}
                  onChange={(e) => setFechaPedido(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <Label>Dirección (Opcional)</Label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <Label>Cliente</Label>
                <select
                  value={selectedCliente}
                  onChange={(e) => setSelectedCliente(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Seleccionar cliente</option>
                  {clientes?.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Listado de camisas disponibles */}
            <div className="mt-6">
              <Label>Productos Disponibles</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {camisasConTallas.map((camisa, index) => (
                  <div key={camisa.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{camisa.nombre}</h3>
                      <span className="text-gray-600">${camisa.precio}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {detallesCamisasResults[index]?.data?.map(detalle => (
                        <button
                          key={detalle.talla.id}
                          onClick={() => handleSelectTalla(camisa.id, detalle.talla.id)}
                          className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                        >
                          {detalle.talla.nombre}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Productos seleccionados */}
            <div className="mt-6">
              <Label>Productos Seleccionados</Label>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">Camisa</th>
                      <th className="px-4 py-2 text-left">Talla</th>
                      <th className="px-4 py-2 text-center">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItems.map((item, index) => {
                      const camisa = camisas?.find(c => c.id === item.camisaId);
                      const talla = detallesCamisasResults
                        .find(q => q.data?.some(d => d.camisa.id === item.camisaId))
                        ?.data?.find(d => d.talla.id === item.tallaId)?.talla;

                      return (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2">{camisa?.nombre}</td>
                          <td className="px-4 py-2">{talla?.nombre}</td>
                          <td className="px-4 py-2 flex items-center justify-center gap-2">
                            <button
                              onClick={() => updateQuantity(index, item.cantidad - 1)}
                              className="px-2 py-1 border rounded"
                            >
                              -
                            </button>
                            <span>{item.cantidad}</span>
                            <button
                              onClick={() => updateQuantity(index, item.cantidad + 1)}
                              className="px-2 py-1 border rounded"
                            >
                              +
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </ModalBody>

          <ModalFooter className="mt-6 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-700"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Crear Pedido
            </Button>
          </ModalFooter>
        </ModalContent>
      </div>
    </Modal>
  );
}