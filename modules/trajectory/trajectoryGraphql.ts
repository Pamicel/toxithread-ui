// import { db } from "../../data/index.ts";
import { Trajectory, TrajectoryCreateInput } from "./trajectoryTypes.ts";

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

// const collection = db.collection<Trajectory>("TrajectoryConfig");

// export const getTrajectoryConfig = async (
//   _id: string,
// ): Promise<Trajectory | undefined> => {
//   const trajectoryConfig = await collection.findOne({ _id });
//   return trajectoryConfig;
// };

// export const createTrajectoryConfig = async (
//   config: TrajectoryCreateInput,
// ): Promise<Trajectory | undefined> => {
//   const newConfigId = await collection.insertOne({ ...config });
//   const newConfig = await collection.findOne({ _id: newConfigId });
//   return newConfig;
// };
