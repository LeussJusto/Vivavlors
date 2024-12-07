import { createContext, useContext, useState } from "react";
import {
  createProductRequest,
  deleteProductRequest,
  getProductsRequest,
  updateProductRequest,
} from "../api/producto";  // Asegúrate de tener estas funciones definidas en tu API

const productoContext = createContext();

export const useProductos = () => {
  const context = useContext(productoContext);
  if (!context) throw new Error("useProductos must be used within a ProductoProvider");
  return context;
};

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([]);

  // Obtener todos los productos
  const getProducts = async () => {
    const res = await getProductsRequest();
    setProductos(res.data);  // Asumiendo que 'res.data' contiene la lista de productos
  };

  // Eliminar un producto
  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      if (res.status === 204) {
        setProductos(productos.filter((producto) => producto.id !== id));  // Filtrar el producto eliminado
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Crear un nuevo producto
  const createProduct = async (producto) => {
    try {
      const res = await createProductRequest(producto);
      setProductos([...productos, res.data]);  // Agregar el nuevo producto a la lista
    } catch (error) {
      console.log(error);
    }
  };

  // Actualizar un producto
  const updateProduct = async (id, producto) => {
    try {
      await updateProductRequest(id, producto);
      setProductos(
        productos.map((prod) =>
          prod.id === id ? { ...prod, ...producto } : prod
        )
      );  // Actualizar el producto en la lista
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <productoContext.Provider
      value={{
        productos,
        getProducts,
        deleteProduct,
        createProduct,
        updateProduct,
      }}
    >
      {children}
    </productoContext.Provider>
  );
}
