import { model, Schema } from "npm:mongoose@6.7";

const trailSchema = new Schema({
  aspect: { type: Schema.Types.ObjectId, ref: "TrailAspect" },
  trajectory: { type: Schema.Types.ObjectId, ref: "Trajectory" },
});

export const TrailModel = model("Trail", trailSchema);

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
  canvas: { type: Schema.Types.ObjectId, ref: "CanvasConfig" },
  trails: [{ type: Schema.Types.ObjectId, ref: "Trail" }],
});

export const ConfigModel = model("Config", configSchema);
