import { createContext, useContext, useState, useEffect } from "react";
import {
  getServiciosRequest,
  createServicioRequest,
  updateServicioRequest,
  deleteServicioRequest,
} from "../api/servicios";

const ServicioContext = createContext();

export const useServicios = () => {
  const context = useContext(ServicioContext);
  if (!context) throw new Error("useServicios must be used within a ServicioProvider");
  return context;
};

export const ServicioProvider = ({ children }) => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchServicios = async () => {
      const res = await getServiciosRequest();
      setServicios(res.data); // Suponiendo que el backend devuelve `res.data` como la lista de servicios
    };
    fetchServicios();
  }, []);

  const createServicio = async (servicio) => {
    const res = await createServicioRequest(servicio);
    setServicios([...servicios, res.data]);
  };

  const updateServicio = async (id, servicio) => {
    const res = await updateServicioRequest(id, servicio);
    setServicios(servicios.map((s) => (s._id === id ? res.data : s)));
  };

  const deleteServicio = async (id) => {
    await deleteServicioRequest(id);
    setServicios(servicios.filter((s) => s._id !== id));
  };

  return (
    <ServicioContext.Provider
      value={{ servicios, createServicio, updateServicio, deleteServicio }}
    >
      {children}
    </ServicioContext.Provider>
  );
};
