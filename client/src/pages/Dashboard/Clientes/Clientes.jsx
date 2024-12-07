import React, { useState } from "react";
import { useClientes } from "../../../context/clientesContext";

const Clientes = () => {
  const { clientes, createCliente, deleteCliente, updateCliente } = useClientes();
  const [newClient, setNewClient] = useState({
    nombre: "",
    contacto: "",
    clasificacion: "Nuevo",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newClient.nombre && newClient.contacto) {
      await createCliente(newClient);
      setNewClient({ nombre: "", contacto: "", clasificacion: "Nuevo" });
    }
  };

  const handleEdit = (cliente) => {
    setNewClient({
      id: cliente._id,
      nombre: cliente.nombre,
      contacto: cliente.contacto,
      clasificacion: cliente.clasificacion,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (newClient.id) {
      await updateCliente(newClient.id, newClient);
      setNewClient({ nombre: "", contacto: "", clasificacion: "Nuevo" });
    }
  };

  const handleDelete = async (id) => {
    await deleteCliente(id);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      {/* Título */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-800">Gestión de Clientes</h1>
        <p className="text-lg text-gray-600 mt-2">
          Administra y registra la información de tus clientes de manera eficiente.
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-blue-600">
          {newClient.id ? "Actualizar Cliente" : "Registrar Nuevo Cliente"}
        </h2>
        <form onSubmit={newClient.id ? handleUpdate : handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={newClient.nombre}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Nombre completo del cliente"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600">Contacto</label>
              <input
                type="text"
                name="contacto"
                value={newClient.contacto}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Número de teléfono o email"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600">Clasificación</label>
              <select
                name="clasificacion"
                value={newClient.clasificacion}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="Nuevo">Nuevo</option>
                <option value="Frecuente">Frecuente</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 shadow-lg"
          >
            {newClient.id ? "Actualizar Cliente" : "Registrar Cliente"}
          </button>
        </form>
      </div>

      {/* Tabla */}
      <div className="bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Clientes Registrados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="px-6 py-4 text-sm font-bold text-gray-700">Nombre</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700">Contacto</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700">Clasificación</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente._id} className="border-t border-gray-200">
                  <td className="px-6 py-4 text-black">{cliente.nombre}</td>
                  <td className="px-6 py-4 text-black">{cliente.contacto}</td>
                  <td className="px-6 py-4 text-black">{cliente.clasificacion}</td>
                  <td className="px-6 py-4 space-x-4">
                    <button
                      onClick={() => handleEdit(cliente)}
                      className="bg-yellow-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-500"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(cliente._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600"
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

export default Clientes;
