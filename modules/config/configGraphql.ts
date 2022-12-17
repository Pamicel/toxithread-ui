export const typeDefs = `#graphql
  type TrailConfig {
    trajectory: Trajectory
    aspect: TrailAspect
  }

  type Config {
    _id: ID!
    name: String!
    seed: Int!
    updatesPerFrame: Int
    canvas: CanvasConfig
    # trails: [TrailConfig]!
  }

  input ConfigCreateInput {
    seed: Int
    updatesPerFrame: Int
  }

  input ConfigUpdateInput {
    name: String
    seed: Int
    updatesPerFrame: Int
  }

  # input ConfigUnsetInput {
  #   unsetCanvas: Boolean
  #   canvas: CanvasConfigUnsetInput
  # }
`;
