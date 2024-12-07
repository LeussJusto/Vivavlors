import axios from "./axios";

export const getProductsRequest = async () => axios.get("/productos");
export const createProductRequest = async (producto) => axios.post("/productos", producto);
export const updateProductRequest = async (id, producto) => axios.put(`/productos/${id}`, producto);
export const deleteProductRequest = async (id) => axios.delete(`/productos/${id}`);
