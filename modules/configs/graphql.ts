import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";
import { Config, ConfigInput } from "./types.ts";
import * as Controller from "./controller.ts";

export const typeDefs = gql`
  type Color {
    r: Int!
    g: Int!
    b: Int!
    alpha: Float
  }

  input ColorInput {
    r: Int!
    g: Int!
    b: Int!
    alpha: Float = 1
  }

  type BackgroundImageConfig {
    enabled: Boolean!
    url: String
  }

  input BackgroundImageConfigInput {
    enabled: Boolean = false
    url: String
  }

  type CanvasConfig {
    backgroundImage: BackgroundImageConfig!
    backgroundColor: Color!
  }

  input CanvasConfigInput {
    backgroundImage: BackgroundImageConfigInput = { enabled: false }
    backgroundColor: ColorInput = { r: 0, g: 0, b: 0, alpha: 1 }
  }

  type TrailTrajectoryResample {
    enabled: Boolean!
    regular: Boolean!
    length: Int!
  }

  input TrailTrajectoryResampleInput {
    enabled: Boolean = false
    regular: Boolean = false
    length: Int = 100
  }

  type TrailTrajectoryBehaviour {
    minSpeedFactor: Float!
    maxSpeedFactor: Float!
  }

  input TrailTrajectoryBehaviourInput {
    minSpeedFactor: Float!
    maxSpeedFactor: Float!
  }

  enum ShapeFunction {
    CONSTANT
    FROM_SMALL
    TO_SMALL
  }

  type TrailShape {
    widthFunction: ShapeFunction!
    minRadiusFactor: Float!
    maxRadiusFactor: Float!
    angleVariability: Float!
  }

  input TrailShapeInput {
    widthFunction: ShapeFunction = CONSTANT
    minRadiusFactor: Float = 1
    maxRadiusFactor: Float = 1
    angleVariability: Float = 0
  }

  enum TrailRenderingOptions {
    beads
    beadsWithoutExtremities
    beadsOneInTwo
    beadsStraight
    skeleton
    displayPoints
  }

  type TrailAspect {
    shape: TrailShape
    trailColor: Color!
    particleDiamFactor: Float!
    nLinks: Int!
    strength: Float!
    renderingPipeline: [TrailRenderingOptions!]!
  }

  input TrailAspectInput {
    shape: TrailShapeInput
    trailColor: ColorInput
    particleDiamFactor: Float = 1
    nLinks: Int = 10
    strength: Float = 0.1
    renderingPipeline: [TrailRenderingOptions!] = [beads]
  }

  type TrailTrajectory {
    name: String!
    resample: TrailTrajectoryResample!
    behaviour: TrailTrajectoryBehaviour!
  }

  input TrailTrajectoryInput {
    name: String!
    resample: TrailTrajectoryResampleInput!
    behaviour: TrailTrajectoryBehaviourInput!
  }

  type TrailConfig {
    trajectory: TrailTrajectory
    aspect: TrailAspect
  }

  input TrailConfigInput {
    trajectory: TrailTrajectoryInput
    aspect: TrailAspectInput
  }

  type Config {
    name: String!
    seed: Int!
    updatesPerFrame: Int
    canvas: CanvasConfig!
    trails: [TrailConfig]!
  }

  input ConfigInput {
    seed: Int = 0
    updatesPerFrame: Int = 30
    canvas: CanvasConfigInput
    trails: [TrailConfigInput]
  }

  type Query {
    config(name: String): Config
  }

  type Mutation {
    createConfig(name: String, config: ConfigInput): Config
    updateConfig(name: String, config: ConfigInput): Config
  }
`;

export const resolvers = {
  Query: {
    config(
      _: never,
      { name }: { name: string },
    ): Promise<Config> {
      console.log("Query.config", name);
      return Controller.getConfig(name);
    },
  },
  Mutation: {
    async createConfig(
      _: never,
      args: { name: string; config: ConfigInput },
    ): Promise<Config> {
      const { name, config } = args;
      console.log("Mutation.createConfig", name, config);
      const newConfig = await Controller.createConfig(name, config);
      return newConfig;
    },
    async updateConfig(
      _: never,
      args: { name: string; config: ConfigInput },
    ): Promise<Config> {
      const { name, config } = args;
      console.log("Mutation.updateConfig", name, config);
      const newConfig = await Controller.updateConfig(name, config);
      return newConfig;
    },
  },
};
