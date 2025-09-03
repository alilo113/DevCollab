import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    uesername: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: Number, require: true}
})

export default mongoose.model("users", usersSchema)