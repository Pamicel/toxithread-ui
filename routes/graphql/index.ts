import { GraphQLHTTP } from "https://deno.land/x/gql@1.1.2/mod.ts";
import { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts";
import { Handlers } from "$fresh/server.ts";
import { resolvers, typeDefs } from "../../modules/sceneConfig/index.ts";

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
