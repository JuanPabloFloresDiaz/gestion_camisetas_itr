"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { getTipoCamisas } from "@/services/tipo_camisas.service"; // Importar servicio de tipos de camisas
import { TipoCamisa } from "@/services/tipo_camisas.service"; // Importar interfaz TipoCamisa
import CreateTipoCamisaModal from "@/components/Modals/TipoCamisas/CreateTipoCamisa"; // Modal para crear tipo de camisa
import UpdateTipoCamisaModal from "@/components/Modals/TipoCamisas/UpdateTipoCamisa"; // Modal para actualizar tipo de camisa
import DeleteTipoCamisaModal from "@/components/Modals/TipoCamisas/DeleteTipoCamisa"; // Modal para eliminar tipo de camisa

export default function TipoCamisas() {
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tipoCamisaToDelete, setTipoCamisaToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const itemsPerPage = 5; // Número de elementos por página

  // Usar TanStack Query para obtener los tipos de camisas
  const { data: tipoCamisas, isLoading, isError } = useQuery({
    queryKey: ["tipoCamisas"], // Clave única para la consulta
    queryFn: getTipoCamisas, // Función que obtiene los datos
  });

  // Filtrar tipos de camisas en función del término de búsqueda
  const filteredTipoCamisas = tipoCamisas
    ? tipoCamisas.filter((tipoCamisa) => {
        const searchLower = searchTerm.toLowerCase();
        return tipoCamisa.nombre.toLowerCase().includes(searchLower);
      })
    : [];

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredTipoCamisas.length / itemsPerPage);

  // Obtener los tipos de camisas de la página actual
  const currentTipoCamisas = filteredTipoCamisas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteClick = (tipoCamisaId: string) => {
    setTipoCamisaToDelete(tipoCamisaId);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setTipoCamisaToDelete(null);
  };

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (isLoading) {
    return (
      <div className="p-6 bg-white text-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <span className="material-icons text-blue-900 mr-2">checkroom</span>
          Gestión de Tipos de Camisas
        </h1>
        <p>Cargando tipos de camisas...</p>
      </div>
    );
  }

  // Mostrar un mensaje de error si la consulta falla
  if (isError) {
    return (
      <div className="p-6 bg-white text-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <span className="material-icons text-blue-900 mr-2">checkroom</span>
          Gestión de Tipos de Camisas
        </h1>
        <p className="text-red-500">Error al cargar los tipos de camisas.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white text-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 flex items-center text-blue-900">
        <span className="material-icons text-blue-900 mr-2">checkroom</span>
        Gestión de Tipos de Camisas
      </h1>

      {/* Buscador y botón de agregar */}
      <div className="flex justify-between items-center mb-6">
        {/* Contenedor del buscador con borde azul y ícono */}
        <div className="relative w-1/2">
          <Input
            type="text"
            placeholder="Buscar tipo de camisa..."
            className="pl-10 pr-4 py-2 w-full border-2 border-blue-800 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value); // Actualizar el término de búsqueda
              setCurrentPage(1); // Reiniciar la paginación al buscar
            }}
          />
          {/* Ícono de búsqueda */}
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-800">
            <span className="material-icons">search</span>
          </span>
        </div>
        <CreateTipoCamisaModal />
      </div>

      {/* Tabla de tipos de camisas */}
      <div className="rounded-lg shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-800 hover:bg-gray-900">
              <TableHead className="text-white">Nombre</TableHead>
              <TableHead className="text-white">Descripción</TableHead>
              <TableHead className="text-white">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTipoCamisas.map((tipoCamisa: TipoCamisa) => (
              <TableRow key={tipoCamisa.id} className="hover:bg-gray-100">
                <TableCell>{tipoCamisa.nombre}</TableCell>
                <TableCell>{tipoCamisa.descripcion}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <UpdateTipoCamisaModal tipoCamisa={tipoCamisa} />
                    <Button
                      variant="ghost"
                      className="text-red-400 hover:bg-red-400 hover:text-white"
                      onClick={() => handleDeleteClick(tipoCamisa.id)}
                    >
                      <span className="material-icons">delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginación con shadcn/ui */}
      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            {/* Botón "Anterior" */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>

            {/* Indicador de página actual */}
            <PaginationItem>
              <span className="px-4 py-2 text-sm font-medium">
                Página {currentPage} de {totalPages}
              </span>
            </PaginationItem>

            {/* Botón "Siguiente" */}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {deleteModalOpen && tipoCamisaToDelete && (
        <DeleteTipoCamisaModal tipoCamisaId={tipoCamisaToDelete} onClose={handleCloseDeleteModal} />
      )}
    </div>
  );
}
