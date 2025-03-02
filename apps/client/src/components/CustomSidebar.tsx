// src/components/CustomSidebar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export function CustomSidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-4">
      {/* Logo y nombre del sistema */}
      <div className="flex items-center space-x-2 mb-6 ms-3">
        <h2 className="text-lg font-semibold me-6 text-blue-900">ITR-TeeManager</h2>
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
          <div className="flex items-center p-2 rounded-md hover:bg-blue-100 transition-colors text-blue-900">
            <span className="material-icons mr-2">home</span>
            <span>Inicio</span>
          </div>
        </Link>
        <Link href="/main/admin">
          <div className="flex items-center p-2 rounded-md hover:bg-blue-100 transition-colors text-blue-900">
            <span className="material-icons mr-2">people</span>
            <span>Administradores</span>
          </div>
        </Link>
        <Link href="/main/client">
          <div className="flex items-center p-2 rounded-md hover:bg-blue-100 transition-colors text-blue-900">
            <span className="material-icons mr-2">person</span>
            <span>Clientes</span>
          </div>
        </Link>
        <Link href="/main/order">
          <div className="flex items-center p-2 rounded-md hover:bg-blue-100 transition-colors text-blue-900">
            <span className="material-icons mr-2">shopping_cart</span>
            <span>Pedidos</span>
          </div>
        </Link>
        <Link href="/main/report">
          <div className="flex items-center p-2 rounded-md hover:bg-blue-100 transition-colors text-blue-900">
            <span className="material-icons mr-2">bar_chart</span>
            <span>Reportes</span>
          </div>
        </Link>
        <Link href="/main/shirt">
          <div className="flex items-center p-2 rounded-md hover:bg-blue-100 transition-colors text-blue-900">
            <span className="material-icons mr-2">checkroom</span>
            <span>Camisas</span>
          </div>
        </Link>
        <Link href="/main/size">
          <div className="flex items-center p-2 rounded-md hover:bg-blue-100 transition-colors text-blue-900">
            <span className="material-icons mr-2">straighten</span>
            <span>Tallas</span>
          </div>
        </Link>
        <Link href="/main/typeshirt">
          <div className="flex items-center p-2 rounded-md hover:bg-blue-100 transition-colors text-blue-900">
            <span className="material-icons mr-2">category</span>
            <span>Tipos de camisas</span>
          </div>
        </Link>
        <Link href="/">
          <div className="flex items-center p-2 rounded-md hover:bg-red-100 transition-colors text-red-600">
            <span className="material-icons mr-2">logout</span>
            <span>Cerrar sesión</span>
          </div>
        </Link>
      </nav>

      {/* Logo de la empresa en la parte inferior */}
      <div className="flex justify-start mt-auto mt-6 pt-6">
        <Image
          src="/logoRicalAzul.avif" // Ruta del logo en la carpeta public
          alt="Logo de la empresa"
          width={100}
          height={100}
          className="rounded-lg"
        />
      </div>
    </aside>
  );
}