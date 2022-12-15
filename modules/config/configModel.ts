import { model, Schema } from "npm:mongoose@6.7";
import { canvasConfigSchema } from "./canvasConfig/canvasConfigModel.ts";
import { trailAspectSchema } from "./trailAspect/trailAspectModel.ts";
import { trajectorySchema } from "./trajectory/trajectoryModel.ts";

const trailSchema = new Schema({
  aspect: trailAspectSchema,
  trajectory: trajectorySchema,
});

export const configSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  seed: {
    type: Number,
    required: false,
    default: 0,
  },
  updatesPerFrame: {
    type: Number,
    required: false,
    default: 30,
  },
  canvas: canvasConfigSchema,
  trails: [trailSchema],
});

export default model("Config", configSchema);
