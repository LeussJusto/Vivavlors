import Cliente from "../models/Cliente.model.js";

// Obtener todos los clientes
export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
  try {
    const { nombre, contacto, clasificacion } = req.body;
    const newCliente = new Cliente({
      nombre,
      contacto,
      clasificacion,
    });
    await newCliente.save();
    res.json(newCliente);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un cliente
export const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, contacto, clasificacion } = req.body;
    const clienteUpdated = await Cliente.findByIdAndUpdate(
      id,
      { nombre, contacto, clasificacion },
      { new: true }
    );
    if (!clienteUpdated) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    return res.json(clienteUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un cliente
export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCliente = await Cliente.findByIdAndDelete(id);
    if (!deletedCliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
