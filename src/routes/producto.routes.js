// producto.routes.js
import { Router } from "express";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../controllers/producto.controllers.js";
import { auth } from "../middlewares/auth.middleware.js"; // Si tienes autenticación
import { validateSchema } from "../middlewares/validator.middleware.js"; // Si tienes validaciones
import { createProductoSchema } from "../schemas/producto.schema.js"; // Validación para la creación de producto
import { updateProductoSchema } from "../schemas/producto.schema.js"; // Validación para la actualización de producto
import { deleteProductoSchema } from "../schemas/producto.schema.js"; // Validación para la eliminación de producto

const router = Router();

// Ruta para gestionar productos (GET, POST) todo en '/productos'
router.route("/productos")
  .get(auth, getProductos) // Mostrar todos los productos
  .post(createProducto); // Crear un nuevo producto

// Ruta para actualizar y eliminar productos usando '/productos/:id'
router.route("/productos/:id")
  .put(auth, validateSchema(updateProductoSchema), updateProducto) // Actualizar un producto
  .delete(deleteProducto); // Eliminar un producto

export default router;
