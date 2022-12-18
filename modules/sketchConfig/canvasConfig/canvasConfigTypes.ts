import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { Color, ColorInput, Maybe, Scalars } from "../../types.ts";

export type CanvasConfig = {
  _id: ObjectId;
  backgroundImageUrl?: string;
  backgroundColor?: Color;
};

export type APICanvasConfig = {
  __typename?: "CanvasConfig";
  _id: Scalars["ID"];
  backgroundImageUrl?: Maybe<Scalars["String"]>;
  backgroundColor?: Maybe<Color>;
};

export type APICanvasConfigCreateInput = {
  backgroundImageUrl?: Maybe<Scalars["String"]>;
  backgroundColor?: Maybe<ColorInput>;
};

export type APICanvasConfigUpdateInput = {
  backgroundImageUrl?: Maybe<Scalars["String"]>;
  backgroundColor?: Maybe<ColorInput>;
};
