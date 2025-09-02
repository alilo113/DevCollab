import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Code", codeSchema);