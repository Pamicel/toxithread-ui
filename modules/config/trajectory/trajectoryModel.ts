import { Schema } from "npm:mongoose@6.7";
import { ResampleOption } from "./trajectoryTypes.ts";

const trajectoryResampleSchema = new Schema({
  resampleType: {
    type: String,
    required: true,
    enum: Object.values(ResampleOption),
  },
  length: {
    type: Number,
    required: true,
  },
});

export const trajectorySchema = new Schema({
  resample: {
    type: trajectoryResampleSchema,
    required: false,
  },
  minSpeedFactor: {
    type: Number,
    default: 1,
  },
  maxSpeedFactor: {
    type: Number,
    default: 1,
  },
});
