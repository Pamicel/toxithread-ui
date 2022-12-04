export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> =
  & Omit<T, K>
  & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> =
  & Omit<T, K>
  & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Color = {
  __typename?: "Color";
  r: Scalars["Int"];
  g: Scalars["Int"];
  b: Scalars["Int"];
  alpha?: Maybe<Scalars["Float"]>;
};

export type ColorInput = {
  r: Scalars["Int"];
  g: Scalars["Int"];
  b: Scalars["Int"];
  alpha?: Maybe<Scalars["Float"]>;
};

export type BackgroundImageConfig = {
  __typename?: "BackgroundImageConfig";
  enabled: Scalars["Boolean"];
  url?: Maybe<Scalars["String"]>;
};

export type BackgroundImageConfigInput = {
  enabled?: Maybe<Scalars["Boolean"]>;
  url?: Maybe<Scalars["String"]>;
};

export type CanvasConfig = {
  __typename?: "CanvasConfig";
  backgroundImage: BackgroundImageConfig;
  backgroundColor: Color;
};

export type CanvasConfigInput = {
  backgroundImage: BackgroundImageConfigInput;
  backgroundColor?: Maybe<ColorInput>;
};

export type TrailTrajectoryResample = {
  __typename?: "TrailTrajectoryResample";
  enabled: Scalars["Boolean"];
  regular: Scalars["Boolean"];
  length: Scalars["Int"];
};

export type TrailTrajectoryResampleInput = {
  enabled?: Maybe<Scalars["Boolean"]>;
  regular?: Maybe<Scalars["Boolean"]>;
  length?: Maybe<Scalars["Int"]>;
};

export type TrailTrajectoryBehaviour = {
  __typename?: "TrailTrajectoryBehaviour";
  minSpeedFactor: Scalars["Float"];
  maxSpeedFactor: Scalars["Float"];
};

export type TrailTrajectoryBehaviourInput = {
  minSpeedFactor: Scalars["Float"];
  maxSpeedFactor: Scalars["Float"];
};

export enum ShapeFunction {
  Constant = "CONSTANT",
  FromSmall = "FROM_SMALL",
  ToSmall = "TO_SMALL",
}

export type TrailShape = {
  __typename?: "TrailShape";
  widthFunction: ShapeFunction;
  minRadiusFactor: Scalars["Float"];
  maxRadiusFactor: Scalars["Float"];
  angleVariability: Scalars["Float"];
};

export type TrailShapeInput = {
  widthFunction?: Maybe<ShapeFunction>;
  minRadiusFactor?: Maybe<Scalars["Float"]>;
  maxRadiusFactor?: Maybe<Scalars["Float"]>;
  angleVariability?: Maybe<Scalars["Float"]>;
};

export enum TrailRenderingOptions {
  Beads = "beads",
  BeadsWithoutExtremities = "beadsWithoutExtremities",
  BeadsOneInTwo = "beadsOneInTwo",
  BeadsStraight = "beadsStraight",
  Skeleton = "skeleton",
  DisplayPoints = "displayPoints",
}

export type TrailAspect = {
  __typename?: "TrailAspect";
  shape?: Maybe<TrailShape>;
  trailColor: Color;
  particleDiamFactor: Scalars["Float"];
  nLinks: Scalars["Int"];
  strength: Scalars["Float"];
  renderingPipeline: Array<TrailRenderingOptions>;
};

export type TrailAspectInput = {
  shape?: Maybe<TrailShapeInput>;
  trailColor?: Maybe<ColorInput>;
  particleDiamFactor?: Maybe<Scalars["Float"]>;
  nLinks?: Maybe<Scalars["Int"]>;
  strength?: Maybe<Scalars["Float"]>;
  renderingPipeline?: Maybe<Array<TrailRenderingOptions>>;
};

export type TrailTrajectory = {
  __typename?: "TrailTrajectory";
  name: Scalars["String"];
  resample: TrailTrajectoryResample;
  behaviour: TrailTrajectoryBehaviour;
};

export type TrailTrajectoryInput = {
  name: Scalars["String"];
  resample: TrailTrajectoryResampleInput;
  behaviour: TrailTrajectoryBehaviourInput;
};

export type TrailConfig = {
  __typename?: "TrailConfig";
  trajectory?: Maybe<TrailTrajectory>;
  aspect?: Maybe<TrailAspect>;
};

export type TrailConfigInput = {
  trajectory?: Maybe<TrailTrajectoryInput>;
  aspect?: Maybe<TrailAspectInput>;
};

export type Config = {
  __typename?: "Config";
  name: Scalars["String"];
  seed: Scalars["Int"];
  updatesPerFrame?: Maybe<Scalars["Int"]>;
  canvas: CanvasConfig;
  trails: Array<Maybe<TrailConfig>>;
};

export type ConfigInput = {
  seed?: Maybe<Scalars["Int"]>;
  updatesPerFrame?: Maybe<Scalars["Int"]>;
  canvas?: Maybe<CanvasConfigInput>;
  trails?: Maybe<Array<Maybe<TrailConfigInput>>>;
};
