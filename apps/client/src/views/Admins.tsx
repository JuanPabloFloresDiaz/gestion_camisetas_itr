"use client";

import { useQuery } from "@tanstack/react-query";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAdministradores } from "@/services/administradores.service";
import { Administrador } from "@/services/administradores.service"; // Importa la interfaz Administrador

export default function Admin() {
  // Usar TanStack Query para obtener los administradores
  const { data: admins, isLoading, isError } = useQuery({
    queryKey: ["administradores"], // Clave única para la consulta
    queryFn: getAdministradores, // Función que obtiene los datos
  });

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (isLoading) {
    return (
      <div className="p-6 bg-white text-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Gestión de Administradores</h1>
        <p>Cargando administradores...</p>
      </div>
    );
  }

  // Mostrar un mensaje de error si la consulta falla
  if (isError) {
    return (
      <div className="p-6 bg-white text-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Gestión de Administradores</h1>
        <p className="text-red-500">Error al cargar los administradores.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white text-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Gestión de Administradores</h1>

      {/* Buscador y botón de agregar */}
      <div className="flex justify-between items-center mb-6">
        <Input
          type="text"
          placeholder="Buscar administrador..."
          className="w-1/2"
        />
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
            {admins?.map((admin: Administrador) => ( // Tipa explícitamente "admin"
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
    </div>
  );
}