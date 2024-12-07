import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://leonardojustojurado:Kr1N7QfeYN5AcXMR@cluster0.hev0u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log('Conexión exitosa prro');
    } catch (error) {
        console.log(error);
    }
}
