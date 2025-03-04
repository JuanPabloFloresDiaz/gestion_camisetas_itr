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
} from "@/components/ui/pagination"; // Importar componentes de Pagination
import { getClientees } from "@/services/clientes.service"; // Importar servicio de clientes
import { Cliente } from "@/services/clientes.service"; // Importar interfaz Clientes
import CreateClienteModal from "@/components/Modals/Cliente/CreateCliente"; // Modal para crear cliente
import UpdateClienteModal from "@/components/Modals/Cliente/UpdateCliente"; // Modal para actualizar cliente
import DeleteClienteModal from "@/components/Modals/Cliente/DeleteCliente"; // Modal para eliminar cliente

export default function Clientes() {
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const itemsPerPage = 5; // Número de elementos por página

  // Usar TanStack Query para obtener los clientes
  const { data: clientes, isLoading, isError } = useQuery({
    queryKey: ["clientes"], // Clave única para la consulta
    queryFn: getClientees, // Función que obtiene los datos
  });

  // Filtrar clientes en función del término de búsqueda
  const filteredClientes = clientes
    ? clientes.filter((cliente) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          cliente.nombre.toLowerCase().includes(searchLower) ||
          cliente.apellido.toLowerCase().includes(searchLower) ||
          cliente.correo.toLowerCase().includes(searchLower) ||
          cliente.telefono.toLowerCase().includes(searchLower)
        );
      })
    : [];

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredClientes.length / itemsPerPage);

  // Obtener los clientes de la página actual
  const currentClientes = filteredClientes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteClick = (clienteId: string) => {
    setClienteToDelete(clienteId);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setClienteToDelete(null);
  };

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (isLoading) {
    return (
      <div className="p-6 bg-white text-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <span className="material-icons text-blue-900 mr-2">people</span>
          Gestión de Clientes
        </h1>
        <p>Cargando clientes...</p>
      </div>
    );
  }

  // Mostrar un mensaje de error si la consulta falla
  if (isError) {
    return (
      <div className="p-6 bg-white text-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <span className="material-icons text-blue-900 mr-2">people</span>
          Gestión de Clientes
        </h1>
        <p className="text-red-500">Error al cargar los clientes.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white text-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 flex items-center text-blue-900">
        <span className="material-icons text-blue-900 mr-2">people</span>
        Gestión de Clientes
      </h1>

      {/* Buscador y botón de agregar */}
      <div className="flex justify-between items-center mb-6">
        {/* Contenedor del buscador con borde azul y ícono */}
        <div className="relative w-1/2">
          <Input
            type="text"
            placeholder="Buscar cliente..."
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
        <CreateClienteModal />
      </div>

      {/* Tabla de clientes */}
      <div className="rounded-lg shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-800 hover:bg-gray-900">
              <TableHead className="text-white">Nombre</TableHead>
              <TableHead className="text-white">Apellido</TableHead>
              <TableHead className="text-white">Correo</TableHead>
              <TableHead className="text-white">Teléfono</TableHead>
              <TableHead className="text-white">DUI</TableHead>
              <TableHead className="text-white">Dirección</TableHead>
              <TableHead className="text-white">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentClientes.map((cliente: Cliente) => ( // Usar currentClientes en lugar de clientes
              <TableRow key={cliente.id} className="hover:bg-gray-100">
                <TableCell>{cliente.nombre}</TableCell>
                <TableCell>{cliente.apellido}</TableCell>
                <TableCell>{cliente.correo}</TableCell>
                <TableCell>{cliente.telefono}</TableCell>
                <TableCell>{cliente.dui}</TableCell>
                <TableCell>{cliente.direccion}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <UpdateClienteModal cliente={cliente} />
                    <Button
                      variant="ghost"
                      className="text-red-400 hover:bg-red-400 hover:text-white"
                      onClick={() => handleDeleteClick(cliente.id)}
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
      {deleteModalOpen && clienteToDelete && (
        <DeleteClienteModal clienteId={clienteToDelete} onClose={handleCloseDeleteModal} />
      )}
    </div>
  );
}