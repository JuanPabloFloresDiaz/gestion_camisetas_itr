"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, X } from "lucide-react";

interface DetallePedidoModalProps {
  isOpen: boolean;
  onClose: () => void;
  pedido: any;
}

export default function DetallePedidoModal({ isOpen, onClose, pedido }: DetallePedidoModalProps) {
  if (!pedido) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/50 backdrop-blur-sm">
        <ModalContent className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-3xl w-full flex flex-col overflow-hidden">
          <ModalHeader className="border-b p-5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-t-xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              <h2 className="text-xl font-bold">Detalles del Pedido</h2>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </ModalHeader>

          <ScrollArea className="flex-1 overflow-y-auto">
            <ModalBody className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <p><strong>Cliente que hizo el pedido:</strong> {pedido.cliente}</p>
                <p><strong>Fecha del Pedido:</strong> {new Date(pedido.fechaPedido).toLocaleDateString()}</p>
                <p><strong>Dirección:</strong> {pedido.direccionPedido || "No especificada"}</p>
              </div>
              
              <Separator />

              <h3 className="text-lg font-semibold">Productos Comprados</h3>
              <div className="space-y-4">
                {pedido.detallesPedidos.map((detalle: any) => (
                  <Card key={detalle.id} className="border border-indigo-200">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Precio: ${detalle.precioProducto.toFixed(2)}</p>
                        <p className="text-sm">Cantidad: {detalle.cantidadComprada}</p>
                      </div>
                      <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                        Subtotal: ${(detalle.precioProducto * detalle.cantidadComprada).toFixed(2)}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ModalBody>
          </ScrollArea>

          <ModalFooter className="p-5 border-t flex justify-end">
            <Button variant="outline" onClick={onClose} className="border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">
              <X className="mr-2 h-4 w-4" />
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </div>
    </Modal>
  );
}
