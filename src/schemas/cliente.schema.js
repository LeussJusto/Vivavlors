import { z } from "zod";

export const createClienteSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es requerido",
  }),
  contacto: z.string({
    required_error: "El contacto es requerido",
  }),
  clasificacion: z.enum(["Nuevo", "Frecuente", "Inactivo"]).optional()
});

export const updateClienteSchema = z.object({
  id: z.string({
    required_error: "El ID es requerido",
  }),
  nombre: z.string().optional(),
  contacto: z.string().optional(),
  clasificacion: z.enum(["Nuevo", "Frecuente", "Inactivo"]).optional()
});

export const deleteClienteSchema = z.object({
  id: z.string({
    required_error: "El ID es requerido",
  }),
});
