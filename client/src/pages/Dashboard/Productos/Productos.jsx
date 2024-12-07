import React, { useEffect, useState } from "react";
import { useProductos } from "../../../context/productoContext"; // Importar el contexto

const Productos = () => {
  const { productos, getProducts, deleteProduct, createProduct } = useProductos(); // Usar las funciones del contexto
  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario
  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: 0, stock: 0 }); // Estado para el nuevo producto
  const [editingProduct, setEditingProduct] = useState(null); // Estado para editar el producto

  useEffect(() => {
    getProducts(); // Cargar los productos al montar el componente
  }, [getProducts]);

  const handleDeleteProduct = (id) => {
    deleteProduct(id); // Eliminar producto
  };

  const handleAddProduct = () => {
    setShowForm(true); // Mostrar formulario para agregar un producto
    setNewProduct({ name: "", category: "", price: 0, stock: 0 }); // Resetear los valores del formulario
    setEditingProduct(null); // No estamos editando ningún producto
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      // Si estamos editando, guardar cambios
      // Aquí puedes hacer la lógica para editar el producto en la base de datos
    } else {
      createProduct(newProduct); // Crear un nuevo producto
    }
    setShowForm(false); // Cerrar el formulario
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-green-100 py-10">
      <div className="max-w-4xl w-full px-4 mx-auto">
        {/* Título */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Gestión de Inventario</h1>
          <p className="text-lg text-gray-500 mt-2">Administra tus productos y existencias de manera eficiente</p>
        </div>

        {/* Botón agregar producto */}
        <div className="text-center mb-6">
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white px-8 py-3 text-lg rounded-full shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Agregar Producto
          </button>
        </div>

        {/* Formulario para agregar o editar producto */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-xl mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
              {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Nombre del producto"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="category" className="text-sm font-medium text-gray-700">Categoría</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Categoría del producto"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="price" className="text-sm font-medium text-gray-700">Precio</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Precio del producto"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="stock" className="text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Stock disponible"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSaveProduct}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                {editingProduct ? 'Guardar Cambios' : 'Agregar Producto'}
              </button>
            </div>
          </div>
        )}

        {/* Tabla de productos */}
        <div className="overflow-hidden rounded-lg shadow-lg bg-white">
          <table className="w-full bg-white text-gray-800">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-6 py-4 text-sm font-medium">Producto</th>
                <th className="px-6 py-4 text-sm font-medium">Categoría</th>
                <th className="px-6 py-4 text-sm font-medium">Precio</th>
                <th className="px-6 py-4 text-sm font-medium">Stock</th>
                <th className="px-6 py-4 text-sm font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto._id} className="border-t hover:bg-gray-50 transition duration-300">
                  <td className="px-6 py-4 text-sm">{producto.name}</td>
                  <td className="px-6 py-4 text-sm">{producto.category}</td>
                  <td className="px-6 py-4 text-sm">${producto.price}</td>
                  <td className="px-6 py-4 text-sm">{producto.stock}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDeleteProduct(producto._id)} // Asegúrate de usar _id aquí
                      className="bg-red-500 text-white px-4 py-2 text-sm rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Productos;
