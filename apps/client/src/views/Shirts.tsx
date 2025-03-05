"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { getCamisas } from "@/services/camisas.service"
import type { Camisa } from "@/services/camisas.service"
import CreateCamisaModal from "@/components/Modals/Camisas/CreateCamisa"
import UpdateCamisaModal from "@/components/Modals/Camisas/UpdateCamisa"
import DeleteCamisaModal from "@/components/Modals/Camisas/DeleteCamisa"
import DetalleCamisaModal from "@/components/Modals/Camisas/DetalleCamisa"
import { Shirt, Search, Edit, Trash2, Eye, Loader2 } from "lucide-react"

export default function Camisas() {
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [camisaToDelete, setCamisaToDelete] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const itemsPerPage = 5

  const {
    data: camisas,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["camisas"],
    queryFn: getCamisas,
  })

  const filteredCamisas = camisas
    ? camisas.filter((camisa) => {
        const searchLower = searchTerm.toLowerCase()
        return (
          camisa.nombre.toLowerCase().includes(searchLower) || camisa.descripcion.toLowerCase().includes(searchLower)
        )
      })
    : []

  const totalPages = Math.ceil(filteredCamisas.length / itemsPerPage)
  const currentCamisas = filteredCamisas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleDeleteClick = (camisaId: string) => {
    setCamisaToDelete(camisaId)
    setDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false)
    setCamisaToDelete(null)
  }

  // Componente para el estado de carga
  if (isLoading) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-b from-white to-blue-50">
        <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 p-6 mb-8 shadow-md">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Shirt className="mr-2 h-6 w-6" />
            Gestión de Camisas
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
          <p className="text-blue-800 text-lg font-medium">Cargando camisas...</p>
        </div>
      </div>
    )
  }

  // Componente para el estado de error
  if (isError) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-b from-white to-blue-50">
        <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 p-6 mb-8 shadow-md">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Shirt className="mr-2 h-6 w-6" />
            Gestión de Camisas
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
              <h2 className="text-xl font-bold text-red-700 mb-2">Error al cargar las camisas</h2>
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
      {/* Header con gradiente */}
      <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 p-6 mb-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Shirt className="mr-2 h-6 w-6" />
            Gestión de Camisas
          </h1>
          <p className="text-blue-100">
            Total: <span className="font-bold">{filteredCamisas.length}</span> camisas
          </p>
        </div>
      </div>

      {/* Buscador y botón de agregar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-blue-500" />
          </div>
          <Input
            type="text"
            placeholder="Buscar por nombre o descripción..."
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

        <div className="flex items-center gap-2">
          {searchTerm && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {filteredCamisas.length} resultados encontrados
            </Badge>
          )}
          <CreateCamisaModal />
        </div>
      </div>

      {/* Tabla de camisas */}
      <Card className="border-blue-100 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-700">
                <TableHead className="text-white font-medium">Nombre</TableHead>
                <TableHead className="text-white font-medium">Descripción</TableHead>
                <TableHead className="text-white font-medium">Precio</TableHead>
                <TableHead className="text-white font-medium">Estado</TableHead>
                <TableHead className="text-white font-medium">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCamisas.length > 0 ? (
                currentCamisas.map((camisa: Camisa) => (
                  <TableRow key={camisa.id} className="hover:bg-blue-50 transition-colors">
                    <TableCell className="font-medium text-blue-900">{camisa.nombre}</TableCell>
                    <TableCell className="text-gray-600">{camisa.descripcion}</TableCell>
                    <TableCell className="font-medium text-blue-800">${camisa.precio.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          camisa.estadoVenta
                            ? "bg-green-100 text-green-800 hover:bg-green-200 border-0"
                            : "bg-red-100 text-red-800 hover:bg-red-200 border-0"
                        }
                      >
                        {camisa.estadoVenta ? "Disponible" : "No disponible"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <UpdateCamisaModal camisa={camisa}/>
                        <DetalleCamisaModal camisa={camisa}/>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
                          onClick={() => handleDeleteClick(camisa.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    {searchTerm ? (
                      <div className="flex flex-col items-center">
                        <Search className="h-8 w-8 text-gray-400 mb-2" />
                        <p>
                          No se encontraron camisas que coincidan con "<span className="font-medium">{searchTerm}</span>
                          "
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Shirt className="h-8 w-8 text-gray-400 mb-2" />
                        <p>No hay camisas disponibles</p>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Paginación mejorada */}
      {filteredCamisas.length > 0 && (
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-blue-700 mb-4 md:mb-0">
            Mostrando{" "}
            <span className="font-medium">
              {Math.min(filteredCamisas.length, (currentPage - 1) * itemsPerPage + 1)}-
              {Math.min(filteredCamisas.length, currentPage * itemsPerPage)}
            </span>{" "}
            de <span className="font-medium">{filteredCamisas.length}</span> camisas
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

              {/* Números de página */}
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Lógica para mostrar las páginas cercanas a la actual
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
        </div>
      )}

      {deleteModalOpen && camisaToDelete && (
        <DeleteCamisaModal camisaId={camisaToDelete} onClose={handleCloseDeleteModal} />
      )}
    </div>
  )
}

