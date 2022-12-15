export const typeDefs = `#graphql
  enum ResampleOption {
    NONE
    UNIFORM
    SIMPLE
  }

  type TrajectoryResampleConfig {
    resampleType: ResampleOption!
    length: Int!
  }

  type Trajectory {
    _id: ID!
    resample: TrajectoryResampleConfig
    minSpeedFactor: Float!
    maxSpeedFactor: Float!
  }

  input TrajectoryResampleConfigInput {
    resampleType: ResampleOption!
    length: Int!
  }

  input TrajectoryCreateInput {
    resample: TrajectoryResampleConfigInput
    minSpeedFactor: Float!
    maxSpeedFactor: Float!
  }
`;
