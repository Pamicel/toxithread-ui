import { Maybe, Scalars } from "../types.ts";

export enum ResampleOption {
  None = "NONE",
  Uniform = "UNIFORM",
  Simple = "SIMPLE",
}

export type TrajectoryResampleConfig = {
  resampleType: ResampleOption;
  length: Scalars["Int"];
};

export type Trajectory = {
  __typename?: "Trajectory";
  _id: Scalars["ID"];
  resample?: Maybe<TrajectoryResampleConfig>;
  minSpeedFactor: Scalars["Float"];
  maxSpeedFactor: Scalars["Float"];
};

export type TrajectoryResampleConfigInput = {
  resampleType: ResampleOption;
  length: Scalars["Int"];
};

export type TrajectoryCreateInput = {
  resample?: Maybe<TrajectoryResampleConfigInput>;
  minSpeedFactor: Scalars["Float"];
  maxSpeedFactor: Scalars["Float"];
};
