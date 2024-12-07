import React, { useState } from "react";
import { useServicios } from "../../../context/serviciosContext";

const Servicios = () => {
  const { servicios, createServicio, updateServicio, deleteServicio } = useServicios();
  const [newService, setNewService] = useState({
    vehicle: "",
    color: "",
    customer: "",
    date: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateServicio(currentServiceId, newService);
    } else {
      await createServicio(newService);
    }
    setNewService({ vehicle: "", color: "", customer: "", date: "" });
    setEditMode(false);
    setCurrentServiceId(null);
  };

  const handleEdit = (service) => {
    setNewService({
      vehicle: service.vehicle,
      color: service.color,
      customer: service.customer,
      date: service.date.split("T")[0],
    });
    setEditMode(true);
    setCurrentServiceId(service._id);
  };

  const handleDelete = async (id) => {
    await deleteServicio(id);
  };

  return (
    <div className="p-6 space-y-10">
      {/* Título */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">Gestión de Servicios</h1>
        <p className="text-lg text-gray-500 mt-2">
          Administra y registra servicios de pintura fácilmente
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          {editMode ? "Editar Servicio" : "Registrar Nuevo Servicio"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-black">Vehículo</label>
              <input
                type="text"
                name="vehicle"
                value={newService.vehicle}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-black"
                placeholder="Marca y Modelo"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-black">Color</label>
              <input
                type="text"
                name="color"
                value={newService.color}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-black"
                placeholder="Color de la pintura"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-black">Cliente</label>
              <input
                type="text"
                name="customer"
                value={newService.customer}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-black"
                placeholder="Nombre del cliente"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-black">Fecha</label>
              <input
                type="date"
                name="date"
                value={newService.date}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-black"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          >
            {editMode ? "Actualizar Servicio" : "Registrar Servicio"}
          </button>
        </form>
      </div>

      {/* Historial */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-black">Historial de Servicios</h2>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-medium text-black">Vehículo</th>
                <th className="px-6 py-4 text-sm font-medium text-black">Color</th>
                <th className="px-6 py-4 text-sm font-medium text-black">Cliente</th>
                <th className="px-6 py-4 text-sm font-medium text-black">Fecha</th>
                <th className="px-6 py-4 text-sm font-medium text-black">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((service) => (
                <tr
                  key={service._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm text-black">{service.vehicle}</td>
                  <td className="px-6 py-4 text-sm text-black">{service.color}</td>
                  <td className="px-6 py-4 text-sm text-black">{service.customer}</td>
                  <td className="px-6 py-4 text-sm text-black">
                    {new Date(service.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEdit(service)}
                      className="bg-yellow-500 text-white px-4 py-2 text-sm rounded-md hover:bg-yellow-600 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="bg-red-500 text-white px-4 py-2 text-sm rounded-md hover:bg-red-600"
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

export default Servicios;
