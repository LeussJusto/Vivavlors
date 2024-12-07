import React, { useEffect, useState } from "react";
import { useClientes } from "../../../context/clientesContext";
import { useProductos } from "../../../context/productoContext";
import { useServicios } from "../../../context/serviciosContext";

const Reporte = () => {
  const { clientes } = useClientes();
  const { productos } = useProductos();
  const { servicios } = useServicios();

  const [reporte, setReporte] = useState({
    totalClientes: 0,
    totalProductos: 0,
    totalServicios: 0,
    productosPorCategoria: {},
  });

  useEffect(() => {
    const generarReporte = () => {
      setReporte((prevState) => ({
        ...prevState,
        totalClientes: clientes.length,
        totalProductos: productos.length,
        totalServicios: servicios.length,
        productosPorCategoria: productos.reduce((acc, producto) => {
          acc[producto.category] = (acc[producto.category] || 0) + 1;
          return acc;
        }, {}),
      }));
    };

    generarReporte();
  }, [clientes, productos, servicios]);

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      {/* Título general */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Reporte General</h1>
        <p className="text-lg text-gray-600 mt-2">
          Visualiza las estadísticas clave de clientes, productos y servicios.
        </p>
      </div>

      {/* Contenedor de reportes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reporte de Clientes */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800">Clientes</h2>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-lg text-gray-700">Total de Clientes:</p>
              <p className="text-2xl font-bold text-blue-600">{reporte.totalClientes}</p>
            </div>
          </div>
        </div>

        {/* Reporte de Productos */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800">Productos</h2>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-lg text-gray-700">Total de Productos:</p>
              <p className="text-2xl font-bold text-blue-600">{reporte.totalProductos}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Productos por Categoría:</h3>
              <ul className="mt-2 space-y-2">
                {Object.entries(reporte.productosPorCategoria).map(([categoria, cantidad]) => (
                  <li key={categoria} className="flex justify-between text-gray-700 border-b pb-2">
                    <span>{categoria}</span>
                    <span className="font-medium">{cantidad} productos</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reporte de Servicios */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800">Servicios</h2>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-lg text-gray-700">Total de Servicios:</p>
              <p className="text-2xl font-bold text-blue-600">{reporte.totalServicios}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detalles de Clientes */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-10">
        <h3 className="text-2xl font-bold text-gray-800">Detalles de Clientes</h3>
        <table className="mt-4 w-full text-left border-t border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-sm font-medium text-gray-800">Nombre</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-800">Contacto</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-800">Clasificación</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente._id} className="border-t">
                <td className="px-4 py-2 text-sm text-gray-700">{cliente.nombre}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{cliente.contacto}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{cliente.clasificacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detalles de Productos */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-10">
        <h3 className="text-2xl font-bold text-gray-800">Detalles de Productos</h3>
        <table className="mt-4 w-full text-left border-t border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-sm font-medium text-gray-800">Nombre</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-800">Categoría</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-800">Precio</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-800">Stock</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto._id} className="border-t">
                <td className="px-4 py-2 text-sm text-gray-700">{producto.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{producto.category}</td>
                <td className="px-4 py-2 text-sm text-gray-700">${producto.price}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{producto.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detalles de Servicios */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-10">
        <h3 className="text-2xl font-bold text-gray-800">Detalles de Servicios</h3>
        <table className="mt-4 w-full text-left border-t border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-sm font-medium text-gray-800">Vehículo</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-800">Color</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-800">Cliente</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-800">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio) => (
              <tr key={servicio._id} className="border-t">
                <td className="px-4 py-2 text-sm text-gray-700">{servicio.vehicle}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{servicio.color}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{servicio.customer}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{new Date(servicio.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reporte;
