// src/views/Admin.tsx
"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Admin() {
  // Datos de ejemplo para la tabla
  const admins = [
    { id: 1, usuario: "admin1", licencia: "123456", tipoTransporte: "Automóvil", nacionalidad: "Mexicana" },
    { id: 2, usuario: "admin2", licencia: "654321", tipoTransporte: "Motocicleta", nacionalidad: "Colombiana" },
    { id: 3, usuario: "admin3", licencia: "987654", tipoTransporte: "Bicicleta", nacionalidad: "Argentina" },
  ];

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
        <Button className="bg-blue-800 text-white hover:bg-blue-900">
          <span className="material-icons mr-2">add</span>
          Agregar
        </Button>
      </div>

      {/* Tabla de administradores */}
      <div className="rounded-lg shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800">
              <TableHead className="text-white">Usuario</TableHead>
              <TableHead className="text-white">Licencia de conducción</TableHead>
              <TableHead className="text-white">Tipo de transporte</TableHead>
              <TableHead className="text-white">Nacionalidad</TableHead>
              <TableHead className="text-white">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id} className="hover:bg-gray-100">
                <TableCell>{admin.usuario}</TableCell>
                <TableCell>{admin.licencia}</TableCell>
                <TableCell>{admin.tipoTransporte}</TableCell>
                <TableCell>{admin.nacionalidad}</TableCell>
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