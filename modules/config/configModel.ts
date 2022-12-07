import { model, Schema } from "npm:mongoose@6.7";

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
});

export default model("Config", configSchema);
