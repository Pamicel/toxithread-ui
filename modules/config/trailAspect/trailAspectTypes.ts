import { Color, ColorInput, Scalars } from "../../types.ts";

export enum TrailRenderingOption {
  Beads = "beads",
  BeadsWithoutExtremities = "beadsWithoutExtremities",
  BeadsOneInTwo = "beadsOneInTwo",
  BeadsStraight = "beadsStraight",
  Skeleton = "skeleton",
  DisplayPoints = "displayPoints",
}

export enum ShapeFunction {
  Constant = "CONSTANT",
  FromSmall = "FROM_SMALL",
  ToSmall = "TO_SMALL",
}

export type TrailAspect = {
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

export type TrailAspectCreateInput = {
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
