import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard/Dashboard';
import Productos from './Productos/Productos';
import Pedidos from './Pedidos/Pedidos';
import Servicios from './Servicios/Servicios';
import Clientes from './Clientes/Clientes';
import Reportes from './Reportes/Reportes';
import Proveedores from './Proveedores/Proveedores';

function DashboardLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar fijo en el lado izquierdo */}
      <Sidebar />

      {/* Contenido principal */}
      <div
        style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto', // Para que el contenido sea desplazable si excede la pantalla
          backgroundColor: '#f5f5f5', // Fondo claro para el área principal
        }}
      >
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="productos" element={<Productos />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="reportes" element={<Reportes />} />
          {/* Redirige cualquier ruta no válida dentro del Dashboard al inicio */}
          <Route path="*" element={<Navigate to="dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardLayout;
