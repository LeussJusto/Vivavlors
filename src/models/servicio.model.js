import mongoose from "mongoose";

const { Schema, model } = mongoose;

const servicioSchema = new Schema({
  vehicle: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});
export default mongoose.model("Servicio", servicioSchema);

