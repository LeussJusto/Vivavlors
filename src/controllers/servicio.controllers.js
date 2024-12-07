import Servicio from "../models/Servicio.model.js";

// Obtener todos los servicios
export const getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo servicio
export const createServicio = async (req, res) => {
  try {
    const { vehicle, color, customer, date } = req.body;
    const newServicio = new Servicio({
      vehicle,
      color,
      customer,
      date,
    });
    await newServicio.save();
    res.json(newServicio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un servicio
export const updateServicio = async (req, res) => {
  try {
    const { id } = req.params; // El id viene de los parámetros de la URL
    const { vehicle, color, customer, date } = req.body; // Los demás datos vienen del cuerpo
    const servicioUpdated = await Servicio.findByIdAndUpdate(
      id,
      { vehicle, color, customer, date },
      { new: true }
    );
    if (!servicioUpdated) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    return res.json(servicioUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Eliminar un servicio
export const deleteServicio = async (req, res) => {
  try {
    // Priorizar el 'id' que viene en el cuerpo, si no se encuentra, tomarlo de la URL
    const { id } = req.body.id ? req.body : req.params;

    if (!id) {
      return res.status(400).json({ message: "El ID es necesario en el cuerpo o la URL" });
    }

    const deletedServicio = await Servicio.findByIdAndDelete(id);
    if (!deletedServicio) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    return res.sendStatus(204); // Código 204 para "sin contenido"
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
