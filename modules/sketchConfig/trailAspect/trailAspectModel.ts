import { model, Schema } from "npm:mongoose@6.7";
import { colorSchema } from "../canvasConfig/canvasConfigModel.ts";
import { ShapeFunction, TrailRenderingOption } from "./trailAspectTypes.ts";

export const trailAspectSchema = new Schema({
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
    validate: (value: string[]) =>
      value.every((element) =>
        Object.keys(TrailRenderingOption).includes(element)
      ),
  },
  widthFunction: {
    type: String,
    enum: Object.values(ShapeFunction),
    default: ShapeFunction.CONSTANT,
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

export const TrailAspectModel = model(
  "TrailAspect",
  trailAspectSchema,
);
