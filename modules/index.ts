import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";
import { typeDefs as configTypeDefs } from "./sketchConfig/configGraphql.ts";
import { typeDefs as trajectoryTypeDefs } from "./sketchConfig/trajectory/trajectoryGraphql.ts";
import { typeDefs as canvasConfigTypeDefs } from "./sketchConfig/canvasConfig/canvasConfigGraphql.ts";
import { typeDefs as trailAspectTypeDefs } from "./sketchConfig/trailAspect/trailAspectGraphql.ts";
import {
  APIConfig,
  APIConfigCreateInput,
  APIConfigUpdateInput,
  Config,
} from "./sketchConfig/configTypes.ts";
import * as ConfigService from "./sketchConfig/configService.ts";
import { APICanvasConfigCreateInput } from "./sketchConfig/canvasConfig/canvasConfigTypes.ts";

const sharedTypeDefs = `#graphql
  type Color {
    r: Int!
    g: Int!
    b: Int!
    alpha: Float
  }

  input ColorInput { r: Int!, g: Int!, b: Int!, alpha: Float }

  type Query {
    config(_id: String, name: String): Config
  }

  type Mutation {
    createConfig(name: String, elements: ConfigCreateInput): Config
    updateConfig(name: String, updates: ConfigUpdateInput): Config
    # updateCanvasConfig(id: ID, updates: CanvasConfigUpdateInput): CanvasConfig

    # Add canvas to config
    # Add trail to config

    # Create Trajectory
    # Create TrailAspect
    # Create CanvasConfig
  }
`;

export const typeDefs = gql([
  sharedTypeDefs,
  configTypeDefs,
  trajectoryTypeDefs,
  canvasConfigTypeDefs,
  trailAspectTypeDefs,
].join("\n"));

const configToAPIConfig = (config: Config): APIConfig => {
  return {
    __typename: "Config",
    ...config,
    _id: config._id.toString(),
  };
};

export const resolvers = {
  Query: {
    async config(
      _: never,
      args: { _id?: string; name?: string },
    ): Promise<APIConfig> {
      console.log(`Query.config ${JSON.stringify(args)}`);
      const config = await ConfigService.getConfig(args);
      if (!config) {
        throw new Error("Config not found");
      }
      return configToAPIConfig(config);
    },
  },
  Mutation: {
    async createConfig(
      _: never,
      { name, mainValues, canvas }: {
        name: string;
        mainValues: APIConfigCreateInput;
        canvas: APICanvasConfigCreateInput;
      },
    ): Promise<APIConfig | undefined> {
      console.log(
        `Mutation.createConfig ${name}, ${JSON.stringify(mainValues)}, ${
          JSON.stringify(canvas)
        }`,
      );
      const config = await ConfigService.createConfig({
        name,
        mainValues,
        canvas,
      });

      if (!config) {
        throw new Error("Config not created");
      }

      try {
        const apiConfig = configToAPIConfig(config);
        return apiConfig;
      } catch (error) {
        console.error("Error converting config to APIConfig", error);
        throw new Error("Error converting config to APIConfig");
      }
    },
    async updateConfig(
      _: never,
      { name, updates }: { name: string; updates: APIConfigUpdateInput },
    ): Promise<APIConfig | undefined> {
      console.log(`Mutation.updateConfig ${name} ${JSON.stringify(updates)}`);
      const newConfig = await ConfigService.updateConfig({
        name,
        updates,
      });
      if (!newConfig) {
        throw new Error("Config not updated");
      }
      try {
        const apiConfig = configToAPIConfig(newConfig);
        return apiConfig;
      } catch (error) {
        console.error("Error converting config to APIConfig", error);
        throw new Error("Error converting config to APIConfig");
      }
    },
  },
};
