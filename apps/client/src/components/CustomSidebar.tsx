"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, Users, User, ShoppingCart, BarChart3, Shirt, Ruler, Tags, LogOut, ChevronRight } from "lucide-react"

export function CustomSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const menuItems = [
    { href: "/main/dashboard", icon: Home, label: "Inicio" },
    { href: "/main/admin", icon: Users, label: "Administradores" },
    { href: "/main/client", icon: User, label: "Clientes" },
    { href: "/main/order", icon: ShoppingCart, label: "Pedidos" },
    { href: "/main/report", icon: BarChart3, label: "Reportes" },
    { href: "/main/shirt", icon: Shirt, label: "Camisas" },
    { href: "/main/size", icon: Ruler, label: "Tallas" },
    { href: "/main/typeshirt", icon: Tags, label: "Tipos de camisas" },
  ]

  return (
    <aside className="w-64 h-screen flex flex-col bg-gradient-to-b from-white to-blue-50 border-r border-blue-100 shadow-lg">
      {/* Header con logo y nombre del sistema */}
      <div className="p-4 border-b border-blue-100">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-blue-900">ITR-TeeManager</h2>
          <div className="bg-blue-100 p-1 rounded-lg">
            <Image src="/logo.avif" alt="Logo del sistema" width={36} height={36} className="rounded-md" />
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-2"></div>
      </div>

      {/* Menú de navegación */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <div
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 group
                  ${isActive(item.href) ? "bg-blue-600 text-white shadow-md" : "text-blue-900 hover:bg-blue-100"}`}
              >
                <div className="flex items-center">
                  <item.icon
                    className={`mr-3 h-5 w-5 ${isActive(item.href) ? "text-white" : "text-blue-600 group-hover:text-blue-700"}`}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                {isActive(item.href) && <ChevronRight className="h-4 w-4 text-white" />}
              </div>
            </Link>
          ))}
        </div>

        {/* Separador */}
        <div className="my-4 px-3">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
        </div>

        {/* Botón de cerrar sesión */}
        <Link href="/" onClick={() => localStorage.removeItem("jwtToken")}>
          <div className="flex items-center justify-between p-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 mt-2 border border-red-100 mx-1">
            <div className="flex items-center">
              <LogOut className="mr-3 h-5 w-5 text-red-500" />
              <span className="font-medium">Cerrar sesión</span>
            </div>
          </div>
        </Link>
      </nav>

      {/* Logo de la empresa en la parte inferior */}
      <div className="p-4 border-t border-blue-100 bg-white">
        <div className="flex flex-col items-center">
          <p className="text-xs text-blue-600 mb-2 font-medium">Desarrollada por</p>
          <Image src="/logoRical.avif" alt="Logo de la empresa" width={100} height={40} className="rounded-lg" />
        </div>
      </div>
    </aside>
  )
}

