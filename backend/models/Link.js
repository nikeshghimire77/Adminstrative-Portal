import mongoose from "mongoose";
const LinkSchema = new mongoose.Schema(
  { 
    url: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: false
    },
    roleid: { type: String, unique: false }
  },
  { timestamps: true }
);

const Link = mongoose.model("Link", LinkSchema);

export default Link;
