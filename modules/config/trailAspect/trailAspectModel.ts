import { Schema } from "npm:mongoose@6.7";
import { colorSchema } from "../canvasConfig/canvasConfigModel.ts";
import { ShapeFunction, TrailRenderingOption } from "./trailAspectTypes.ts";

export const trailAspectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  trailColor: {
    type: colorSchema,
    default: { r: 255, g: 255, b: 255, a: 1 },
  },
  particleDiamFactor: {
    type: Number,
    required: true,
  },
  nLinks: {
    type: Number,
    required: true,
  },
  strength: {
    type: Number,
    required: true,
  },
  renderingPipeline: {
    type: [String],
    required: true,
    validate: (value: string[]): boolean => {
      return value.every((element) => element in TrailRenderingOption);
    },
  },
  widthFunction: {
    type: String,
    enum: Object.values(ShapeFunction),
    default: ShapeFunction.Constant,
  },
  minRadiusFactor: {
    type: Number,
    default: 1,
  },
  maxRadiusFactor: {
    type: Number,
    default: 1,
  },
  angleVariability: {
    type: Number,
    default: 0,
  },
});
