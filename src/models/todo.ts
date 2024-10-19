import { model, Schema } from "mongoose";

const todoSchema = new Schema(
  {
    text: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("Todo", todoSchema);
