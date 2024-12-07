import React, { useEffect, useState } from "react";
import { useClientes } from "../../../context/clientesContext";
import { useProductos } from "../../../context/productoContext";
import { useServicios } from "../../../context/serviciosContext";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // Importa el contexto de autenticación

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const { clientes } = useClientes();
  const { productos } = useProductos();
  const { servicios } = useServicios();
  const navigate = useNavigate();
  const { logout } = useAuth(); // Obtén la función logout desde el contexto de autenticación

  const [ultimoCliente, setUltimoCliente] = useState(null);
  const [ultimoProducto, setUltimoProducto] = useState(null);
  const [ultimoServicio, setUltimoServicio] = useState(null);

  const [clientesClasificacion, setClientesClasificacion] = useState({
    nuevo: 0,
    frecuente: 0,
    inactivo: 0,
  });

  const [serviciosPorMes, setServiciosPorMes] = useState({
    enero: 0,
    febrero: 0,
    marzo: 0,
    abril: 0,
    mayo: 0,
    junio: 0,
    julio: 0,
    agosto: 0,
    septiembre: 0,
    octubre: 0,
    noviembre: 0,
    diciembre: 0,
  });

  useEffect(() => {
    // Lógica para manejar clientes, productos y servicios
    if (clientes.length > 0) setUltimoCliente(clientes[clientes.length - 1]);
    if (productos.length > 0) setUltimoProducto(productos[productos.length - 1]);
    if (servicios.length > 0) setUltimoServicio(servicios[servicios.length - 1]);

    const clasificacion = { nuevo: 0, frecuente: 0, inactivo: 0 };
    clientes.forEach((cliente) => {
      if (cliente.clasificacion === "Nuevo") clasificacion.nuevo++;
      if (cliente.clasificacion === "Frecuente") clasificacion.frecuente++;
      if (cliente.clasificacion === "Inactivo") clasificacion.inactivo++;
    });
    setClientesClasificacion(clasificacion);

    const serviciosMeses = {
      enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0,
      junio: 0, julio: 0, agosto: 0, septiembre: 0,
      octubre: 0, noviembre: 0, diciembre: 0,
    };
    servicios.forEach((servicio) => {
      const mes = new Date(servicio.date).toLocaleString("default", { month: "long" }).toLowerCase();
      if (serviciosMeses[mes] !== undefined) serviciosMeses[mes]++;
    });
    setServiciosPorMes(serviciosMeses);
  }, [clientes, productos, servicios]);

  const handleLogout = () => {
    logout(); // Llama al método logout para cerrar sesión
    navigate("/"); // Redirige al login
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-[#1a1a1a] text-white px-5 py-3 flex justify-between items-center shadow-md fixed top-0 w-[81%] left-60 z-50 rounded-lg">
        <div className="text-xl font-bold">VivaColors Dashboard</div>
        <div className="flex items-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md"
            onClick={handleLogout} // Usa la función handleLogout
          >
            Salir
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="p-6 space-y-10 mt-20">
        {/* Título general */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-lg text-gray-600 mt-2">
            Visualiza las estadísticas de clientes, productos y servicios más recientes.
          </p>
        </div>

        {/* Contenedor de información */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Último Cliente */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800">Último Cliente</h2>
            {ultimoCliente ? (
              <div className="mt-4 space-y-4">
                <p className="text-lg text-gray-700">Nombre: {ultimoCliente.nombre}</p>
                <p className="text-lg text-gray-700">Contacto: {ultimoCliente.contacto}</p>
                <p className="text-lg text-gray-700">Clasificación: {ultimoCliente.clasificacion}</p>
              </div>
            ) : (
              <p className="text-gray-500">No hay clientes registrados aún.</p>
            )}
          </div>

          {/* Último Producto */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800">Último Producto</h2>
            {ultimoProducto ? (
              <div className="mt-4 space-y-4">
                <p className="text-lg text-gray-700">Nombre: {ultimoProducto.name}</p>
                <p className="text-lg text-gray-700">Categoría: {ultimoProducto.category}</p>
                <p className="text-lg text-gray-700">Precio: ${ultimoProducto.price}</p>
                <p className="text-lg text-gray-700">Stock: {ultimoProducto.stock}</p>
              </div>
            ) : (
              <p className="text-gray-500">No hay productos registrados aún.</p>
            )}
          </div>

          {/* Último Servicio */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800">Último Servicio</h2>
            {ultimoServicio ? (
              <div className="mt-4 space-y-4">
                <p className="text-lg text-gray-700">Vehículo: {ultimoServicio.vehicle}</p>
                <p className="text-lg text-gray-700">Color: {ultimoServicio.color}</p>
                <p className="text-lg text-gray-700">Cliente: {ultimoServicio.customer}</p>
                <p className="text-lg text-gray-700">Fecha: {new Date(ultimoServicio.date).toLocaleDateString()}</p>
              </div>
            ) : (
              <p className="text-gray-500">No hay servicios registrados aún.</p>
            )}
          </div>
        </div>

        {/* Gráficos */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-center text-gray-800">Estadísticas Generales</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {/* Gráfico de Servicios */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800">Servicios por Mes</h3>
              <div style={{ height: "300px" }}>
                <Bar
                  data={{
                    labels: Object.keys(serviciosPorMes),
                    datasets: [
                      {
                        label: "Servicios por Mes",
                        data: Object.values(serviciosPorMes),
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: "Servicios Registrados por Mes",
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Gráfico de Clasificación de Clientes */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800">Clasificación de Clientes</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "300px", // Tamaño total del contenedor
                }}
              >

                <div style={{ width: "280px", height: "280px" }}>
                  <Pie
                    data={{
                      labels: ["Nuevo", "Frecuente", "Inactivo"],
                      datasets: [
                        {
                          label: "Clasificación de Clientes",
                          data: [
                            clientesClasificacion.nuevo,
                            clientesClasificacion.frecuente,
                            clientesClasificacion.inactivo,
                          ],
                          backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"],
                          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        title: {
                          display: true,
                          text: "Clasificación de Clientes",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;