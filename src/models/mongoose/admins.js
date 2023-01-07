//Require Mongoose
import mongoose from "mongoose";

//Define a schema
const Schema = mongoose.Schema;

const adminModelSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, min: 3, max: 65, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);

export default mongoose.model("admins", adminModelSchema);
