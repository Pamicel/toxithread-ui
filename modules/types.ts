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
