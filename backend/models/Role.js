import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  description: {
    type: String,
    unique: false
  },
  links: [{ type: Schema.Types.ObjectId, ref: "Link" }]
});

const Role = mongoose.model("Role", RoleSchema);

export default Role;
