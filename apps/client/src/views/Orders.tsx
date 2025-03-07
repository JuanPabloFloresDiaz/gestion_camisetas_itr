"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { getPedidos } from "@/services/pedidos.service"
import { ShoppingCart, Search, Loader2, Eye } from "lucide-react"
import CreatePedidoModal from "@/components/Modals/Pedidos/CreatePedido"
import DetallePedidoModal from "@/components/Modals/Pedidos/DetallePedido"

export default function Pedidos() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null)
  const abrirModalDetalle = (pedido) => {
    setPedidoSeleccionado(pedido)
  }

  const itemsPerPage = 5

  const {
    data: pedidos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pedidos"],
    queryFn: getPedidos,
  })

  const filteredPedidos = Array.isArray(pedidos)
    ? pedidos
        // Primero eliminar clientes duplicados
        .filter(({ cliente }, index, self) => index === self.findIndex((c) => c.cliente?.id === cliente?.id))
        // Luego extraer y mapear los pedidos
        .flatMap(({ cliente }) => {
          if (cliente?.pedidos) {
            return cliente.pedidos.map((pedido) => ({
              ...pedido,
              cliente: `${cliente.nombre} ${cliente.apellido}`,
              correo: cliente.correo,
              telefono: cliente.telefono,
              direccionPedido: pedido.direccionPedido || cliente.direccion,
            }))
          }
          return []
        })
        // Eliminar posibles pedidos duplicados (por si acaso)
        .filter((pedido, index, self) => index === self.findIndex((p) => p.id === pedido.id))
        // Aplicar filtro de búsqueda
        .filter((pedido) => {
          const searchLower = searchTerm.toLowerCase()
          return (
            pedido.fechaPedido.toLowerCase().includes(searchLower) ||
            (pedido.direccionPedido || "").toLowerCase().includes(searchLower) ||
            pedido.cliente.toLowerCase().includes(searchLower)
          )
        })
    : []

  const totalPages = Math.ceil(filteredPedidos.length / itemsPerPage)
  const currentPedidos = filteredPedidos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (isLoading) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-b from-white to-blue-50">
        <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 p-6 mb-8 shadow-md">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <ShoppingCart className="mr-2 h-6 w-6" />
            Gestión de Pedidos
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
          <p className="text-blue-800 text-lg font-medium">Cargando pedidos...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-b from-white to-blue-50">
        <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 p-6 mb-8 shadow-md">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <ShoppingCart className="mr-2 h-6 w-6" />
            Gestión de Pedidos
          </h1>
        </div>
        <Card className="border-red-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 p-3 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-red-700 mb-2">Error al cargar los pedidos</h2>
              <p className="text-gray-600 mb-4">
                No se pudieron cargar los datos. Por favor, intenta nuevamente más tarde.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => window.location.reload()}>
                Reintentar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 p-6 mb-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <ShoppingCart className="mr-2 h-6 w-6" />
            Gestión de Pedidos
          </h1>
          <p className="text-blue-100">
            Total: <span className="font-bold">{filteredPedidos.length}</span> pedidos
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-blue-500" />
          </div>
          <Input
            type="text"
            placeholder="Buscar pedido..."
            className="pl-10 border-blue-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
          />
          {searchTerm && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setSearchTerm("")
                  setCurrentPage(1)
                }}
              >
                ×
              </Button>
            </div>
          )}
        </div>
        <Button
          className="bg-blue-700 text-white hover:bg-blue-800 transition-colors rounded-lg shadow-sm flex items-center space-x-2 px-4"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="material-icons">add_circle</span>
          <span> Agregar Pedido</span>
        </Button>
      </div>

      <Card className="border-blue-100 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-700">
                <TableHead className="text-white font-medium">Cliente</TableHead>
                <TableHead className="text-white font-medium">Correo</TableHead>
                <TableHead className="text-white font-medium">Teléfono</TableHead>
                <TableHead className="text-white font-medium">Dirección</TableHead>
                <TableHead className="text-white font-medium">Fecha</TableHead>
                <TableHead className="text-white font-medium">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPedidos.length > 0 ? (
                currentPedidos.map((pedido) => (
                  <TableRow key={pedido.id} className="hover:bg-blue-50 transition-colors">
                    <TableCell className="font-medium text-blue-900">{pedido.cliente}</TableCell>
                    <TableCell className="text-gray-600">{pedido.correo}</TableCell>
                    <TableCell className="text-gray-600">{pedido.telefono}</TableCell>
                    <TableCell className="text-gray-600">{pedido.direccionPedido || "N/A"}</TableCell>
                    <TableCell className="text-gray-600">{new Date(pedido.fechaPedido).toLocaleDateString()}</TableCell>
                    <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                              onClick={() => abrirModalDetalle(pedido)}
                            >
                              <Eye className="h-5 w-5" />
                              <span className="sr-only">Ver Detalles</span>
                            </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    {searchTerm ? (
                      <div className="flex flex-col items-center">
                        <Search className="h-8 w-8 text-gray-400 mb-2" />
                        <p>
                          No se encontraron pedidos que coincidan con "<span className="font-medium">{searchTerm}</span>
                          "
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <ShoppingCart className="h-8 w-8 text-gray-400 mb-2" />
                        <p>No hay pedidos disponibles</p>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {filteredPedidos.length > 0 && (
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-blue-700 mb-4 md:mb-0">
            Mostrando{" "}
            <span className="font-medium">
              {Math.min(filteredPedidos.length, (currentPage - 1) * itemsPerPage + 1)}-
              {Math.min(filteredPedidos.length, currentPage * itemsPerPage)}
            </span>{" "}
            de <span className="font-medium">{filteredPedidos.length}</span> pedidos
          </p>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-blue-50 hover:text-blue-700"} border border-blue-200`}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageToShow
                if (totalPages <= 5) {
                  pageToShow = i + 1
                } else if (currentPage <= 3) {
                  pageToShow = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageToShow = totalPages - 4 + i
                } else {
                  pageToShow = currentPage - 2 + i
                }

                if (pageToShow > 0 && pageToShow <= totalPages) {
                  return (
                    <PaginationItem key={pageToShow}>
                      <Button
                        variant={currentPage === pageToShow ? "default" : "outline"}
                        size="icon"
                        className={`w-9 h-9 ${
                          currentPage === pageToShow
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "text-blue-700 border-blue-200 hover:bg-blue-50"
                        }`}
                        onClick={() => setCurrentPage(pageToShow)}
                      >
                        {pageToShow}
                      </Button>
                    </PaginationItem>
                  )
                }
                return null
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-blue-50 hover:text-blue-700"} border border-blue-200`}
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <DetallePedidoModal
            isOpen={pedidoSeleccionado !== null}
            onClose={() => setPedidoSeleccionado(null)}
            pedido={pedidoSeleccionado}
          />
        </div>
      )}
      <CreatePedidoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

