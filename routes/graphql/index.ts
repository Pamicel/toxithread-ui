import { GraphQLHTTP } from "https://deno.land/x/gql@1.1.2/mod.ts";
import { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts";
import { Handlers } from "$fresh/server.ts";
import { Config, ConfigBase } from "../../modules/sceneConfig/types.ts";
import * as ConfigService from "../../modules/sceneConfig/service.ts";
import { typeDefs } from "../../modules/sceneConfig/typeDefs.ts";
import {
  ConfigInput,
  Mutation,
  Query,
} from "../../modules/sceneConfig/gqlTypes.ts";

type NamedConfig = { name: string } & Config;

const resolvers: { Query: Query; Mutation: Mutation } = {
  Query: {
    async config(
      _: never,
      { name }: { name: string },
    ) {
      console.log("Query.config", name);
      const config = await ConfigService.getConfig(name);
      return { name, ...config };
    },
  },
  Mutation: {
    async createConfig(
      _: never,
      args: { name: string; config: ConfigInput },
    ) {
      const { name, config } = args;
      console.log("Mutation.createConfig", name, config);
      const newConfig = await ConfigService.createConfig(name, config);
      return { name, ...newConfig };
    },
  },
};

const graphql = async (req: Request) => {
  return await GraphQLHTTP<Request>({
    schema: makeExecutableSchema({ resolvers, typeDefs }),
    graphiql: true,
  })(req);
};

export const handler: Handlers = {
  POST: graphql,
  GET: graphql,
};
