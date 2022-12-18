import { Maybe, Scalars } from "../../types.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

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
  _id: ObjectId;
  resample?: Maybe<TrajectoryResampleConfig>;
  minSpeedFactor: Scalars["Float"];
  maxSpeedFactor: Scalars["Float"];
};

export type APITrajectory = {
  __typename?: "Trajectory";
  _id: Scalars["ID"];
  resample?: Maybe<TrajectoryResampleConfig>;
  minSpeedFactor: Scalars["Float"];
  maxSpeedFactor: Scalars["Float"];
};

export type APITrajectoryResampleConfigInput = {
  resampleType: ResampleOption;
  length: Scalars["Int"];
};

export type APITrajectoryCreateInput = {
  resample?: Maybe<APITrajectoryResampleConfigInput>;
  minSpeedFactor: Scalars["Float"];
  maxSpeedFactor: Scalars["Float"];
};
