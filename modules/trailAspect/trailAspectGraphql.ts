// import { db } from "../../data/index.ts";
import { TrailAspect, TrailAspectCreateInput } from "./trailAspectTypes.ts";

export const typeDefs = `#graphql
  enum TrailRenderingOptions {
    beads
    beadsWithoutExtremities
    beadsOneInTwo
    beadsStraight
    skeleton
    displayPoints
  }

  enum ShapeFunction {
    CONSTANT
    FROM_SMALL
    TO_SMALL
  }

  type TrailAspect {
    _id: ID!
    trailColor: Color!
    particleDiamFactor: Float!
    nLinks: Int!
    strength: Float!
    renderingPipeline: [TrailRenderingOptions!]!

    widthFunction: ShapeFunction!
    minRadiusFactor: Float!
    maxRadiusFactor: Float!
    angleVariability: Float!
  }

  input TrailAspectCreateInput {
    trailColor: ColorInput!
    particleDiamFactor: Float!
    nLinks: Int!
    strength: Float!
    renderingPipeline: [TrailRenderingOptions!]!

    widthFunction: ShapeFunction!
    minRadiusFactor: Float!
    maxRadiusFactor: Float!
    angleVariability: Float!
  }
`;

// const collection = db.collection<TrailAspect>("TrailAspectConfigs");

// export const getAspectConfig = async (
//   _id: string,
// ): Promise<TrailAspect | undefined> => {
//   console.log(`TrailAspectConfigs - getAspectConfig _id ${_id}`);
//   const aspectConfig = await collection.findOne({ _id });
//   return aspectConfig;
// };

// export const createAspectConfig = async (
//   config: TrailAspectCreateInput,
// ): Promise<TrailAspect | undefined> => {
//   console.log("TrailAspectConfigs - createAspectConfig");
//   const newConfigId = await collection.insertOne({ ...config });
//   const newConfig = await collection.findOne({ _id: newConfigId });
//   return newConfig;
// };
