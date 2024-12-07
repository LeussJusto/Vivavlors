import { Router } from "express";
import {
  getServicios,
  createServicio,
  updateServicio,
  deleteServicio,
} from "../controllers/servicio.controllers.js";
import { auth } from "../middlewares/auth.middleware.js"; // Middleware de autenticación
import { validateSchema } from "../middlewares/validator.middleware.js"; // Middleware de validación
import {
  createServicioSchema,
  updateServicioSchema,
  deleteServicioSchema,
} from "../schemas/servicio.schema.js";

const router = Router();

// Rutas para gestionar servicios
router
  .route("/servicios")
  .get(auth, getServicios) // Mostrar todos los servicios
  .post(createServicio); // Crear un nuevo servicio

router
  .route("/servicios/:id")
  .put(updateServicio) // Actualizar un servicio
  .delete(deleteServicio); // Eliminar un servicio

export default router;
