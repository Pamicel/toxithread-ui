import { Color, ColorInput, Maybe, Scalars } from "../types.ts";

export type CanvasConfig = {
  __typename?: "CanvasConfig";
  _id: Scalars["String"];
  backgroundImageUrl?: Maybe<Scalars["String"]>;
  backgroundColor?: Maybe<Color>;
};

export type CanvasConfigCreateInput = {
  backgroundImageUrl?: Maybe<Scalars["String"]>;
  backgroundColor?: Maybe<ColorInput>;
};
