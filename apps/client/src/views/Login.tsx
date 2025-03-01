// src/views/Login.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";

const Login: React.FC = () => {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de autenticación aquí...
    router.push("/main/dashboard"); // Redirige al dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-poppins">
      <Card className="w-full max-w-md">
        <CardHeader>
          {/* Logo y título */}
          <div className="flex flex-col items-center space-y-4">
            <Image
              src="/logo.avif" // Ruta del logo en la carpeta public
              alt="Logo del sistema"
              width={80} // Tamaño del logo
              height={80}
              className="rounded-lg" // Estilo del logo
            />
            <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
          </div>
          <CardDescription className="text-center">
            Ingresa tus credenciales para acceder al sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Campo de correo electrónico */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <div className="relative mt-1">
                <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  email
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  className="pl-10" // Añade padding a la izquierda para el ícono
                />
              </div>
            </div>

            {/* Campo de contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative mt-1">
                <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  lock
                </span>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  className="pl-10" // Añade padding a la izquierda para el ícono
                />
              </div>
            </div>

            {/* Botón de Iniciar Sesión */}
            <Button type="submit" className="w-full bg-blue-800">
              <span className="material-icons mr-2">login</span>
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;