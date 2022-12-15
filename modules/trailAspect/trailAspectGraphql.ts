export const typeDefs = `#graphql
  enum TrailRenderingOptions {
    beads
    beadsWithoutExtremities
    beadsOneInTwo
    beadsStraight
    skeleton
    displayPoints
  }

  enum ShapeFunction {
    CONSTANT
    FROM_SMALL
    TO_SMALL
  }

  type TrailAspect {
    _id: ID!
    trailColor: Color!
    particleDiamFactor: Float!
    nLinks: Int!
    strength: Float!
    renderingPipeline: [TrailRenderingOptions!]!

    widthFunction: ShapeFunction!
    minRadiusFactor: Float!
    maxRadiusFactor: Float!
    angleVariability: Float!
  }

  input TrailAspectCreateInput {
    trailColor: ColorInput!
    particleDiamFactor: Float!
    nLinks: Int!
    strength: Float!
    renderingPipeline: [TrailRenderingOptions!]!

    widthFunction: ShapeFunction!
    minRadiusFactor: Float!
    maxRadiusFactor: Float!
    angleVariability: Float!
  }
`;
