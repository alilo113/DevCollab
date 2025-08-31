import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  text: String,
  name: String
});

const Code = mongoose.model("Code", codeSchema);
export default Code;