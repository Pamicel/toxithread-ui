import {
  CanvasConfig,
  CanvasConfigCreateInput,
} from "../canvasConfig/canvasConfigTypes.ts";
import { Maybe, Scalars } from "../types.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { Trajectory } from "../trajectory/trajectoryTypes.ts";
import { TrailAspect } from "../trailAspect/trailAspectTypes.ts";

export type TrailConfig = {
  trajectory: Trajectory;
  aspect: TrailAspect;
};

export type Config = {
  _id: ObjectId;
  name: string;
  seed?: number;
  updatesPerFrame?: number;
  canvas?: CanvasConfig;
  trails?: TrailConfig[];
};

export type APIConfig = {
  __typename?: Maybe<"Config">;
  _id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  seed?: Maybe<Scalars["Int"]>;
  updatesPerFrame?: Maybe<Scalars["Int"]>;
  canvas?: Maybe<CanvasConfig>;
  trails?: Maybe<Array<TrailConfig>>;
};

export type APIConfigCreateInput = {
  seed?: Scalars["Int"];
  updatesPerFrame?: Scalars["Int"];
  canvas?: CanvasConfigCreateInput;
};

export type APIConfigUpdateInput = {
  name?: Scalars["String"];
  seed?: Scalars["Int"];
  updatesPerFrame?: Scalars["Int"];
};
