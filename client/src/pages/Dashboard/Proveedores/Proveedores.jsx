import React, { useState } from 'react';

const Proveedores = () => {
  // Datos estáticos para ilustración de proveedores y compras
  const [proveedores, setProveedores] = useState([
    { id: 1, nombre: 'Pinturas XYZ', tipo: 'Pinturas', contacto: '987654321', historial: [{ fecha: '2024-03-15', cantidad: 100, producto: 'Pintura Roja' }] },
    { id: 2, nombre: 'Lijas ABC', tipo: 'Lijas', contacto: '912345678', historial: [{ fecha: '2024-03-10', cantidad: 200, producto: 'Lijas de grano fino' }] },
    { id: 3, nombre: 'Barnices LMN', tipo: 'Barnices', contacto: '934567890', historial: [{ fecha: '2024-03-20', cantidad: 150, producto: 'Barniz Mate' }] },
  ]);

  // Datos estáticos para el registro de un nuevo proveedor
  const [nuevoProveedor, setNuevoProveedor] = useState({
    id: null,
    nombre: '',
    tipo: '',
    contacto: '',
  });

  // Función para manejar cambios en el formulario de proveedores
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProveedor({ ...nuevoProveedor, [name]: value });
  };

  // Función para agregar o editar un proveedor
  const handleAddOrUpdateProveedor = () => {
    if (nuevoProveedor.id) {
      // Si tiene un ID, estamos actualizando un proveedor existente
      setProveedores(proveedores.map((proveedor) =>
        proveedor.id === nuevoProveedor.id ? nuevoProveedor : proveedor
      ));
    } else {
      // Si no tiene ID, estamos agregando un nuevo proveedor
      setProveedores([...proveedores, { ...nuevoProveedor, id: proveedores.length + 1, historial: [] }]);
    }

    // Limpiar el formulario
    setNuevoProveedor({ id: null, nombre: '', tipo: '', contacto: '' });
  };

  // Función para eliminar un proveedor
  const handleDeleteProveedor = (id) => {
    setProveedores(proveedores.filter((proveedor) => proveedor.id !== id));
  };

  // Función para cargar los datos del proveedor a editar en el formulario
  const handleEditProveedor = (proveedor) => {
    setNuevoProveedor(proveedor);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-white">
      {/* Título de la sección de proveedores */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Proveedores</h1>
        <p className="text-lg text-gray-600 mt-2">Gestión de proveedores y compras realizadas</p>
      </div>

      {/* Registro de nuevo proveedor o edición */}
      <div className="bg-white p-6 shadow-lg rounded-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">{nuevoProveedor.id ? 'Editar Proveedor' : 'Registrar Nuevo Proveedor'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label htmlFor="nombre" className="text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nuevoProveedor.nombre}
              onChange={handleInputChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full text-gray-800"
              placeholder="Nombre del proveedor"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="tipo" className="text-sm font-medium text-gray-700">Tipo de Producto</label>
            <input
              type="text"
              id="tipo"
              name="tipo"
              value={nuevoProveedor.tipo}
              onChange={handleInputChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full text-gray-800"
              placeholder="Tipo de producto"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="contacto" className="text-sm font-medium text-gray-700">Contacto</label>
            <input
              type="text"
              id="contacto"
              name="contacto"
              value={nuevoProveedor.contacto}
              onChange={handleInputChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full text-gray-800"
              placeholder="Número de contacto"
            />
          </div>
        </div>
        <button
          onClick={handleAddOrUpdateProveedor}
          className="mt-6 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {nuevoProveedor.id ? 'Actualizar Proveedor' : 'Agregar Proveedor'}
        </button>
      </div>

      {/* Listado de proveedores */}
      <div className="bg-white p-6 shadow-lg rounded-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Lista de Proveedores</h2>
        <table className="min-w-full mt-4 table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-4 text-sm font-medium text-gray-800">Proveedor</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-800">Tipo de Producto</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-800">Contacto</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-800">Historial de Compras</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-800">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.id} className="border-t">
                <td className="px-6 py-4 text-sm text-gray-700">{proveedor.nombre}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{proveedor.tipo}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{proveedor.contacto}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <table className="min-w-full mt-2">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-4 py-2 text-sm font-medium text-gray-800">Fecha</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-800">Cantidad</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-800">Producto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proveedor.historial.map((compra, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2 text-sm text-gray-700">{compra.fecha}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{compra.cantidad}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{compra.producto}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <button
                    onClick={() => handleEditProveedor(proveedor)}
                    className="bg-yellow-500 text-white px-4 py-2 text-sm rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteProveedor(proveedor.id)}
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
  );
};

export default Proveedores;
