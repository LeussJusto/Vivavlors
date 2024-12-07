// producto.controllers.js
import Producto from "../models/producto.model.js";

// Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo producto
export const createProducto = async (req, res) => {
  try {
    const { name, category, price, stock } = req.body;
    const newProducto = new Producto({
      name,
      category,
      price,
      stock,
    });
    await newProducto.save();
    res.json(newProducto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un producto
export const updateProducto = async (req, res) => {
  try {
    const { id, name, category, price, stock } = req.body; // Ahora el id viene en el cuerpo
    const productoUpdated = await Producto.findByIdAndUpdate(
      id,
      { name, category, price, stock },
      { new: true }
    );
    if (!productoUpdated) return res.status(404).json({ message: "Producto no encontrado" });
    return res.json(productoUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un producto
// Eliminar un producto
export const deleteProducto = async (req, res) => {
  try {
    // Priorizar el 'id' que viene en el cuerpo, si no se encuentra, tomarlo de la URL
    const { id } = req.body.id ? req.body : req.params; 

    if (!id) {
      return res.status(400).json({ message: "El ID es necesario en el cuerpo o la URL" });
    }

    const deletedProducto = await Producto.findByIdAndDelete(id);
    if (!deletedProducto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.sendStatus(204); // Código 204 para "sin contenido"
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
