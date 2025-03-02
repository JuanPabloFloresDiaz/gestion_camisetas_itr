"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { createAdministrador } from "@/services/administradores.service";
import { Administrador } from "@/services/administradores.service";

export default function CreateAdminModal() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Administrador, "id">>();

  const onSubmit: SubmitHandler<Omit<Administrador, "id">> = async (data) => {
    try {
      await createAdministrador(data);
      console.log("Administrador creado:", data);
      setIsOpen(false);
      reset();
    } catch (error) {
      console.error("Error al crear administrador:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Crear Administrador</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Administrador</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              {...register("nombre", { required: "Este campo es obligatorio" })}
            />
            {errors.nombre && (
              <p className="text-sm text-red-500">{errors.nombre.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="apellido">Apellido</Label>
            <Input
              id="apellido"
              {...register("apellido", { required: "Este campo es obligatorio" })}
            />
            {errors.apellido && (
              <p className="text-sm text-red-500">{errors.apellido.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="correo">Correo electrónico</Label>
            <Input
              id="correo"
              type="email"
              {...register("correo", { required: "Este campo es obligatorio" })}
            />
            {errors.correo && (
              <p className="text-sm text-red-500">{errors.correo.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="clave">Contraseña</Label>
            <Input
              id="clave"
              type="password"
              {...register("clave", { required: "Este campo es obligatorio" })}
            />
            {errors.clave && (
              <p className="text-sm text-red-500">{errors.clave.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Crear</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}