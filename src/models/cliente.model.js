import mongoose from "mongoose";

const { Schema, model } = mongoose;

const clienteSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    contacto: {
      type: String,
      required: true,
    },
    clasificacion: {
      type: String,
      enum: ["Nuevo", "Frecuente", "Inactivo"],
      default: "Nuevo",
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cliente", clienteSchema);
