// src/components/CustomSidebar.tsx
"use client";

import Link from "next/link";

export function CustomSidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">ITR-TeeVista</h2>
      <nav className="space-y-2">
        <Link href="/main/dashboard">
          <div className="w-full p-2 rounded-md hover:bg-gray-100 transition-colors">
            Inicio
          </div>
        </Link>
        <Link href="/main/admin">
          <div className="w-full p-2 rounded-md hover:bg-gray-100 transition-colors">
            Administradores
          </div>
        </Link>
        <Link href="/main/client">
          <div className="w-full p-2 rounded-md hover:bg-gray-100 transition-colors">
            Clientes
          </div>
        </Link>
        <Link href="/main/order">
          <div className="w-full p-2 rounded-md hover:bg-gray-100 transition-colors">
            Pedidos
          </div>
        </Link>
        <Link href="/main/report">
          <div className="w-full p-2 rounded-md hover:bg-gray-100 transition-colors">
            Reportes
          </div>
        </Link>
        <Link href="/main/shirt">
          <div className="w-full p-2 rounded-md hover:bg-gray-100 transition-colors">
            Camisas
          </div>
        </Link>
        <Link href="/main/size">
          <div className="w-full p-2 rounded-md hover:bg-gray-100 transition-colors">
            Tallas
          </div>
        </Link>
        <Link href="/main/typeshirt">
          <div className="w-full p-2 rounded-md hover:bg-gray-100 transition-colors">
            Tipos de camisas
          </div>
        </Link>
      </nav>
    </aside>
  );
}