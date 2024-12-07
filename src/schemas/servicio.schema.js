import { z } from "zod";

// Esquema para crear un servicio
export const createServicioSchema = z.object({
  vehicle: z.string({
    required_error: "El vehículo es requerido",
  }),
  color: z.string({
    required_error: "El color es requerido",
  }),
  customer: z.string({
    required_error: "El cliente es requerido",
  }),
  date: z.string({
    required_error: "La fecha es requerida",
  }).refine(
    (value) => !isNaN(Date.parse(value)),
    "La fecha debe ser válida"
  ),
});

// Esquema para actualizar un servicio
export const updateServicioSchema = z.object({
  id: z.string({
    required_error: "El ID del servicio es requerido",
  }),
  vehicle: z.string().optional(),
  color: z.string().optional(),
  customer: z.string().optional(),
  date: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), "La fecha debe ser válida")
    .optional(),
});

// Esquema para eliminar un servicio
export const deleteServicioSchema = z.object({
  id: z.string({
    required_error: "El ID del servicio es requerido",
  }),
});
