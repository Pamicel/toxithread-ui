import { Color, ColorInput, Maybe, Scalars } from "../../types.ts";

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
