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
import { getAdministradores } from "@/services/administradores.service";
import { Administrador } from "@/services/administradores.service"; // Importa la interfaz Administrador

export default function Admin() {
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const itemsPerPage = 5; // Número de elementos por página

  // Usar TanStack Query para obtener los administradores
  const { data: admins, isLoading, isError } = useQuery({
    queryKey: ["administradores"], // Clave única para la consulta
    queryFn: getAdministradores, // Función que obtiene los datos
  });

  // Calcular el número total de páginas
  const totalPages = admins ? Math.ceil(admins.length / itemsPerPage) : 0;

  // Obtener los administradores de la página actual
  const currentAdmins = admins
    ? admins.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (isLoading) {
    return (
      <div className="p-6 bg-white text-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <span className="material-icons text-blue-900 mr-2">settings</span>
          Gestión de Administradores
        </h1>
        <p>Cargando administradores...</p>
      </div>
    );
  }

  // Mostrar un mensaje de error si la consulta falla
  if (isError) {
    return (
      <div className="p-6 bg-white text-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <span className="material-icons text-blue-900 mr-2">settings</span>
          Gestión de Administradores
        </h1>
        <p className="text-red-500">Error al cargar los administradores.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white text-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 flex items-center text-blue-900">
        <span className="material-icons text-blue-900 mr-2">settings</span>
        Gestión de Administradores
      </h1>

      {/* Buscador y botón de agregar */}
      <div className="flex justify-between items-center mb-6">
        {/* Contenedor del buscador con borde azul y ícono */}
        <div className="relative w-1/2">
          <Input
            type="text"
            placeholder="Buscar administrador..."
            className="pl-10 pr-4 py-2 w-full border-2 border-blue-800 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
          />
          {/* Ícono de búsqueda */}
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-800">
            <span className="material-icons">search</span>
          </span>
        </div>
        <Button className="bg-blue-800 text-white hover:bg-gray-900">
          <span className="material-icons mr-2">add</span>
          Agregar
        </Button>
      </div>

      {/* Tabla de administradores */}
      <div className="rounded-lg shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-800 hover:bg-gray-900">
              <TableHead className="text-white">Nombre</TableHead>
              <TableHead className="text-white">Apellido</TableHead>
              <TableHead className="text-white">Correo</TableHead>
              <TableHead className="text-white">Teléfono</TableHead>
              <TableHead className="text-white">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAdmins.map((admin: Administrador) => ( // Usar currentAdmins en lugar de admins
              <TableRow key={admin.id} className="hover:bg-gray-100">
                <TableCell>{admin.nombre}</TableCell>
                <TableCell>{admin.apellido}</TableCell>
                <TableCell>{admin.correo}</TableCell>
                <TableCell>{admin.telefono}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      className="text-yellow-400 hover:bg-yellow-400 hover:text-white"
                      onClick={() => console.log(`Actualizar admin ${admin.id}`)}
                    >
                      <span className="material-icons">edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-red-400 hover:bg-red-400 hover:text-white"
                      onClick={() => console.log(`Eliminar admin ${admin.id}`)}
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
    </div>
  );
}