"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react"

const Login: React.FC = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de autenticación aquí...
    router.push("/main/dashboard") // Redirige al dashboard
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 font-poppins p-4">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-500 to-blue-700 rounded-b-[30%] opacity-10 z-0"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-10 z-0"></div>

      <Card className="w-full max-w-md border border-blue-100 shadow-xl bg-white/80 backdrop-blur-sm z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>

        <CardHeader className="space-y-6 pt-8">
          {/* Logo y título */}
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-blue-50 p-4 rounded-2xl shadow-md border border-blue-100 transform transition-transform hover:scale-105 duration-300">
              <Image src="/logo.avif" alt="Logo del sistema" width={80} height={80} className="rounded-lg" />
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-blue-900">Bienvenido a ITR-TeeManager</CardTitle>
              <CardDescription className="text-blue-700">
                Ingresa tus credenciales para acceder al sistema.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Campo de correo electrónico */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-blue-800">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo electrónico"
                  className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-blue-50/50"
                  required
                />
              </div>
            </div>

            {/* Campo de contraseña */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-blue-800">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="pl-10 pr-10 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-blue-50/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="flex justify-end">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            {/* Botón de Iniciar Sesión */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 mt-6 h-11"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-blue-100 mt-6 pt-6 pb-8">
          <div className="text-center">
            <p className="text-sm text-blue-700">© 2025 ITR-TeeManager. Todos los derechos reservados.</p>
            <div className="mt-4">
              <Image
                src="/logoRicalAzul.avif"
                alt="Logo de la empresa"
                width={100}
                height={40}
                className="rounded-lg mx-auto"
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login

