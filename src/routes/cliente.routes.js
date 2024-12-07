import { Router } from "express";
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../controllers/cliente.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  createClienteSchema,
  updateClienteSchema,
  deleteClienteSchema,
} from "../schemas/cliente.schema.js";

const router = Router();

router
  .route("/clientes")
  .get(auth, getClientes) // Obtener todos los clientes
  .post(validateSchema(createClienteSchema), createCliente); // Crear cliente

router
  .route("/clientes/:id")
  .put(validateSchema(updateClienteSchema), updateCliente) // Actualizar cliente
  .delete(deleteCliente); // Eliminar cliente

export default router;
