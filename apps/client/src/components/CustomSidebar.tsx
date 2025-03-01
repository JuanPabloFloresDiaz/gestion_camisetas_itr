// src/components/CustomSidebar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export function CustomSidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-4">
      {/* Logo y nombre del sistema */}
      <div className="flex items-center space-x-2 mb-6 ms-3">
        <h2 className="text-lg font-semibold me-6">ITR-TeeManager</h2>
        <Image
          src="/logo.avif" // Ruta del logo en la carpeta public
          alt="Logo del sistema"
          width={40}
          height={40}
          className="rounded-lg"
        />
      </div>

      {/* Menú de navegación */}
      <nav className="space-y-1">
        <Link href="/main/dashboard">
          <div className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors">
            <span className="material-icons mr-2">home</span>
            <span>Inicio</span>
          </div>
        </Link>
        <Link href="/main/admin">
          <div className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors">
            <span className="material-icons mr-2">people</span>
            <span>Administradores</span>
          </div>
        </Link>
        <Link href="/main/client">
          <div className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors">
            <span className="material-icons mr-2">person</span>
            <span>Clientes</span>
          </div>
        </Link>
        <Link href="/main/order">
          <div className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors">
            <span className="material-icons mr-2">shopping_cart</span>
            <span>Pedidos</span>
          </div>
        </Link>
        <Link href="/main/report">
          <div className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors">
            <span className="material-icons mr-2">bar_chart</span>
            <span>Reportes</span>
          </div>
        </Link>
        <Link href="/main/shirt">
          <div className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors">
            <span className="material-icons mr-2">checkroom</span>
            <span>Camisas</span>
          </div>
        </Link>
        <Link href="/main/size">
          <div className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors">
            <span className="material-icons mr-2">straighten</span>
            <span>Tallas</span>
          </div>
        </Link>
        <Link href="/main/typeshirt">
          <div className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors">
            <span className="material-icons mr-2">category</span>
            <span>Tipos de camisas</span>
          </div>
        </Link>
      </nav>
    </aside>
  );
}