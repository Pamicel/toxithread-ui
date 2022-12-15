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
