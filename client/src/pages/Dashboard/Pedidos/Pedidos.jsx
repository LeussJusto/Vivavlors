import React, { useState } from 'react';
import { FaFileInvoice } from 'react-icons/fa';

const Pedidos = () => {
  const [orders, setOrders] = useState([
    { id: 1, customerName: 'Juan Pérez', date: '2024-11-20', status: 'Pendiente', total: 120.0 },
    { id: 2, customerName: 'Ana García', date: '2024-11-19', status: 'En Proceso', total: 50.0 },
    { id: 3, customerName: 'Carlos López', date: '2024-11-18', status: 'Completado', total: 200.0 },
    { id: 4, customerName: 'María Ruiz', date: '2024-11-17', status: 'Pendiente', total: 75.0 },
  ]);

  const handleGenerateInvoice = (orderId) => {
    console.log('Generar factura para el pedido con ID:', orderId);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-700';
      case 'En Proceso':
        return 'bg-blue-100 text-blue-700';
      case 'Completado':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Título estilizado */}
      <div className="text-center bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-white">Gestión de Pedidos</h1>
        <p className="text-lg text-gray-100 mt-2">
          Visualiza y gestiona los pedidos realizados por tus clientes
        </p>
      </div>

      {/* Tabla de pedidos */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Cliente</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Fecha</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estado</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4 text-sm text-gray-700">{order.customerName}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">${order.total}</td>
                <td className="px-6 py-4 text-sm text-gray-700 space-x-4">
                  <button
                    onClick={() => handleGenerateInvoice(order.id)}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 text-sm rounded-md hover:bg-green-600"
                  >
                    <FaFileInvoice /> Factura
                  </button>
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                    className="bg-gray-100 border border-gray-300 px-2 py-1 rounded-md text-sm"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Completado">Completado</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pedidos;
