import { model, Schema } from "npm:mongoose@6.7";

const canvasConfigSchema = new Schema({
  backGroundImageUrl: {
    type: String,
    required: false,
  },
  backgroundColor: {
    type: String,
    required: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model("CanvasConfig", canvasConfigSchema);
