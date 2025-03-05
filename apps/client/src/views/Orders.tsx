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
import { getPedidos } from "@/services/pedidos.service"; // Importar servicio de pedidos
import { Pedido } from "@/services/pedidos.service"; // Importar interfaz Pedido

export default function Pedidos() {
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const itemsPerPage = 5; // Número de elementos por página

  // Usar TanStack Query para obtener los pedidos
  const { data: pedidos, isLoading, isError } = useQuery({
    queryKey: ["pedidos"], // Clave única para la consulta
    queryFn: getPedidos, // Función que obtiene los datos
  });

  // Filtrar pedidos en función del término de búsqueda
  const filteredPedidos = pedidos
    ? pedidos.filter((pedido) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          pedido.fechaPedido.toLowerCase().includes(searchLower) ||
          pedido.direccionPedido.toLowerCase().includes(searchLower)
        );
      })
    : [];

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredPedidos.length / itemsPerPage);

  // Obtener los pedidos de la página actual
  const currentPedidos = filteredPedidos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (isLoading) {
    return (
      <div className="p-6 bg-white text-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <span className="material-icons text-blue-900 mr-2">shopping_cart</span>
          Gestión de Pedidos
        </h1>
        <p>Cargando pedidos...</p>
      </div>
    );
  }

  // Mostrar un mensaje de error si la consulta falla
  if (isError) {
    return (
      <div className="p-6 bg-white text-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <span className="material-icons text-blue-900 mr-2">shopping_cart</span>
          Gestión de Pedidos
        </h1>
        <p className="text-red-500">Error al cargar los pedidos.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white text-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 flex items-center text-blue-900">
        <span className="material-icons text-blue-900 mr-2">shopping_cart</span>
        Gestión de Pedidos
      </h1>

      {/* Buscador y botón de agregar */}
      <div className="flex justify-between items-center mb-6">
        {/* Contenedor del buscador con borde azul y ícono */}
        <div className="relative w-1/2">
          <Input
            type="text"
            placeholder="Buscar pedido..."
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
        <Button variant="default" className="bg-blue-800 text-white hover:bg-blue-600">
          Agregar Pedido
        </Button>
      </div>

      {/* Tabla de pedidos */}
      <div className="rounded-lg shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-800 hover:bg-gray-900">
              <TableHead className="text-white">Dirección</TableHead>
              <TableHead className="text-white">Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPedidos.map((pedido: Pedido) => (
              <TableRow key={pedido.id} className="hover:bg-gray-100">
                <TableCell>{pedido.direccionPedido}</TableCell>
                <TableCell>{new Date(pedido.fechaPedido).toLocaleDateString()}</TableCell>
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
