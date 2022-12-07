// import { CanvasConfig, CanvasConfigCreateInput } from "./canvasConfigTypes.ts";

export const typeDefs = `#graphql
  type CanvasConfig {
    _id: String!
    backgroundImageUrl: String
    backgroundColor: Color
  }

  input CanvasConfigCreateInput {
    backgroundImageUrl: String
    backgroundColor: ColorInput
  }
`;

// const collection = db.collection<CanvasConfig>("canvasConfigs");

// export const getCanvasConfig = async (
//   _id: string,
// ): Promise<CanvasConfig | undefined> => {
//   const canvasConfig = await collection.findOne({ _id });
//   return canvasConfig;
// };

// export const createCanvasConfig = async (
//   config: CanvasConfigCreateInput,
// ): Promise<CanvasConfig | undefined> => {
//   const newConfigId = await collection.insertOne({ ...config });
//   const newConfig = await collection.findOne({ _id: newConfigId });
//   return newConfig;
// };
