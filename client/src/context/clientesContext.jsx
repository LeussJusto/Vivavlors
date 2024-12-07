import { createContext, useContext, useState, useEffect } from "react";
import {
  getClientesRequest,
  createClienteRequest,
  updateClienteRequest,
  deleteClienteRequest,
} from "../api/clientes";

const ClienteContext = createContext();

export const useClientes = () => {
  const context = useContext(ClienteContext);
  if (!context) throw new Error("useClientes debe usarse dentro de un ClienteProvider");
  return context;
};

export const ClienteProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      const res = await getClientesRequest();
      setClientes(res.data);
    };
    fetchClientes();
  }, []);

  const createCliente = async (cliente) => {
    const res = await createClienteRequest(cliente);
    setClientes([...clientes, res.data]);
  };

  const updateCliente = async (id, cliente) => {
    const res = await updateClienteRequest(id, cliente);
    setClientes(clientes.map((c) => (c._id === id ? res.data : c)));
  };

  const deleteCliente = async (id) => {
    await deleteClienteRequest(id);
    setClientes(clientes.filter((c) => c._id !== id));
  };

  return (
    <ClienteContext.Provider value={{ clientes, createCliente, updateCliente, deleteCliente }}>
      {children}
    </ClienteContext.Provider>
  );
};
