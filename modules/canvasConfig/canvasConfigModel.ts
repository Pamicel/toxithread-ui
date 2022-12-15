import { Schema } from "npm:mongoose@6.7";

export const colorSchema = new Schema({
  r: {
    type: Number,
    required: true,
  },
  g: {
    type: Number,
    required: true,
  },
  b: {
    type: Number,
    required: true,
  },
  a: {
    type: Number,
    default: 1,
  },
});

export const canvasConfigSchema = new Schema({
  backGroundImageUrl: {
    type: String,
    required: false,
  },
  backgroundColor: {
    type: colorSchema,
    default: { r: 0, g: 0, b: 0, a: 1 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
