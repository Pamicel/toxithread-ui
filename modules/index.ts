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
import * as CanvasConfigService from "./sketchConfig/canvasConfig/canvasConfigService.ts";
import {
  APICanvasConfig,
  APICanvasConfigCreateInput,
  APICanvasConfigUpdateInput,
  CanvasConfig,
} from "./sketchConfig/canvasConfig/canvasConfigTypes.ts";

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
    createConfig(
      name: String,
      config: ConfigCreateInput,
      canvas: CanvasConfigCreateInput
    ): Config
    updateConfig(name: String, updates: ConfigUpdateInput): Config
    updateCanvasConfig(id: ID, updates: CanvasConfigUpdateInput): CanvasConfig

    # Add canvas to config
    addCanvasToConfig(id: ID, canvas: CanvasConfigCreateInput): Config
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

const canvasConfigToAPICanvasConfig = (
  canvasConfig: CanvasConfig,
): APICanvasConfig => {
  return {
    __typename: "CanvasConfig",
    ...canvasConfig,
    _id: canvasConfig._id.toString(),
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
      { name, config, canvas }: {
        name: string;
        config: APIConfigCreateInput;
        canvas: APICanvasConfigCreateInput;
      },
    ): Promise<APIConfig | undefined> {
      console.log(
        `Mutation.createConfig ${name}, ${JSON.stringify(config)}, ${
          JSON.stringify(canvas)
        }`,
      );
      const newConfig = await ConfigService.createConfig({
        name,
        config,
        canvas,
      });

      if (!newConfig) {
        throw new Error("Config not created");
      }

      try {
        const apiConfig = configToAPIConfig(newConfig);
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
    async updateCanvasConfig(
      _: never,
      { id, updates }: {
        id: string;
        updates: APICanvasConfigUpdateInput;
      },
    ): Promise<APICanvasConfig | undefined> {
      console.log(
        `Mutation.updateCanvasConfig ${id} ${JSON.stringify(updates)}`,
      );
      const newConfig = await CanvasConfigService.updateCanvasConfig({
        _id: id,
        updates,
      });
      if (!newConfig) {
        throw new Error(
          "Mutation.updateCanvasConfig - Canvas config not updated",
        );
      }
      return canvasConfigToAPICanvasConfig(newConfig);
    },
    async addCanvasToConfig(
      _: never,
      { id, canvas }: { id: string; canvas: APICanvasConfigCreateInput },
    ): Promise<APIConfig | undefined> {
      console.log(`Mutation.addCanvasToConfig ${id} ${JSON.stringify(canvas)}`);
      const newConfig = await ConfigService.addCanvasToConfig({
        configId: id,
        canvas,
      });
      if (!newConfig) {
        throw new Error("Mutation.addCanvasToConfig - Config not updated");
      }
      return configToAPIConfig(newConfig);
    },
  },
};
