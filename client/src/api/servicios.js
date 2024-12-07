import axios from "./axios";

export const getServiciosRequest = async () => axios.get("/servicios");
export const createServicioRequest = async (servicio) => axios.post("/servicios", servicio);
export const updateServicioRequest = async (id, servicio) => axios.put(`/servicios/${id}`, servicio);
export const deleteServicioRequest = async (id) => axios.delete(`/servicios/${id}`);
