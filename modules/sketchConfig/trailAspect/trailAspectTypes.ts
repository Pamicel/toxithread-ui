import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { Color, ColorInput, Scalars } from "../../types.ts";

export enum TrailRenderingOption {
  beads,
  beadsWithoutExtremities,
  beadsOneInTwo,
  beadsStraight,
  skeleton,
  displayPoints,
}

export enum ShapeFunction {
  CONSTANT,
  FROM_SMALL,
  TO_SMALL,
}

export type TrailAspect = {
  _id: ObjectId;
  trailColor: Color;
  particleDiamFactor: Scalars["Float"];
  nLinks: Scalars["Int"];
  strength: Scalars["Float"];
  renderingPipeline: Array<TrailRenderingOption>;
  widthFunction: ShapeFunction;
  minRadiusFactor: Scalars["Float"];
  maxRadiusFactor: Scalars["Float"];
  angleVariability: Scalars["Float"];
};

export type APITrailAspect = {
  __typename?: "TrailAspect";
  trailColor: Color;
  particleDiamFactor: Scalars["Float"];
  nLinks: Scalars["Int"];
  strength: Scalars["Float"];
  renderingPipeline: Array<TrailRenderingOption>;
  widthFunction: ShapeFunction;
  minRadiusFactor: Scalars["Float"];
  maxRadiusFactor: Scalars["Float"];
  angleVariability: Scalars["Float"];
};

export type APITrailAspectCreateInput = {
  trailColor: ColorInput;
  particleDiamFactor: Scalars["Float"];
  nLinks: Scalars["Int"];
  strength: Scalars["Float"];
  renderingPipeline: Array<TrailRenderingOption>;
  widthFunction: ShapeFunction;
  minRadiusFactor: Scalars["Float"];
  maxRadiusFactor: Scalars["Float"];
  angleVariability: Scalars["Float"];
};
