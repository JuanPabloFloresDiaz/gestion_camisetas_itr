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
import { updateAdministrador } from "@/services/administradores.service";
import { Administrador } from "@/services/administradores.service";

interface UpdateAdminModalProps {
  admin: Administrador; // El administrador a actualizar
}

export default function UpdateAdminModal({ admin }: UpdateAdminModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<Administrador>>({
    defaultValues: admin, // Prellenar el formulario con los datos del administrador
  });

  const onSubmit: SubmitHandler<Partial<Administrador>> = async (data) => {
    try {
      await updateAdministrador(admin.id, data);
      console.log("Administrador actualizado:", data);
      setIsOpen(false);
      reset();
    } catch (error) {
      console.error("Error al actualizar administrador:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Actualizar Administrador</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actualizar Administrador</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              {...register("nombre")}
            />
          </div>
          <div>
            <Label htmlFor="apellido">Apellido</Label>
            <Input
              id="apellido"
              {...register("apellido")}
            />
          </div>
          <div>
            <Label htmlFor="correo">Correo electrónico</Label>
            <Input
              id="correo"
              type="email"
              {...register("correo")}
            />
          </div>
          <div>
            <Label htmlFor="clave">Nueva Contraseña</Label>
            <Input
              id="clave"
              type="password"
              {...register("clave")}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Actualizar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}