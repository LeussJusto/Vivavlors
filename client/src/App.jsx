import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext'; // Asegúrate de que el AuthProvider esté importado
import { ProductoProvider } from './context/productoContext';
import { ServicioProvider } from './context/serviciosContext';
import { ClienteProvider } from './context/clientesContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './pages/Dashboard/DashboardLayout';



function App() {
  return (
    <AuthProvider>
      <ProductoProvider>
        <ServicioProvider>
          <ClienteProvider>
        <BrowserRouter>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Rutas protegidas dentro del layout del Dashboard */}
            <Route path="/app/*" element={<DashboardLayout />} />

            {/* Redirige al login si no encuentra la ruta */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
        </ClienteProvider>
        </ServicioProvider>
      </ProductoProvider>
    </AuthProvider>
  );
}

export default App;
