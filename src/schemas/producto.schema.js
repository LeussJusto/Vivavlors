// producto.schema.js
import { z } from "zod";

// Esquema para crear un producto
export const createProductoSchema = z.object({
  name: z.string({
    required_error: "El nombre del producto es requerido",
  }),
  category: z.string({
    required_error: "La categoría del producto es requerida",
  }),
  price: z.number({
    required_error: "El precio del producto es requerido",
  }).min(0, "El precio debe ser mayor a 0"),
  stock: z.number({
    required_error: "El stock del producto es requerido",
  }).int().min(0, "El stock no puede ser negativo"),
});

// Esquema para actualizar un producto
export const updateProductoSchema = z.object({
  id: z.string({
    required_error: "El ID del producto es requerido",
  }),
  name: z.string().optional(),
  category: z.string().optional(),
  price: z.number().min(0, "El precio debe ser mayor a 0").optional(),
  stock: z.number().int().min(0, "El stock no puede ser negativo").optional(),
});

// Esquema para eliminar un producto
export const deleteProductoSchema = z.object({
  id: z.string({
    required_error: "El ID del producto es requerido",
  }),
});
