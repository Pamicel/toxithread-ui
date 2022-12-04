export type Color = {
  r: number;
  g: number;
  b: number;
  alpha?: number;
};

export type ConfigBase = {
  seed: number;
  updatesPerFrame: number;
};

/**
  "canvas": {
    "backgroundImage": {
      "enabled": false,
      "pathName": "image2"
    },
    "backgroundColor": { "r": 0, "g": 0, "b": 0, "alpha": 1 }
  },
 */
export type CanvasConfig = {
  backgroundImage: {
    enabled: boolean;
    pathName: string;
  };
  backgroundColor: Color;
};

export type TrailTrajectory = {
  name: string;
  /*
    "resample": {
      "enabled": true,
      "regular": false,
      "length": 122
    },
  */
  resample: {
    enabled: boolean;
    regular: boolean;
    length: number;
  };
  /*
    "behaviour": {
      "minSpeedFactor": 10,
      "maxSpeedFactor": 10
    }
  */
  behaviour: {
    minSpeedFactor: number;
    maxSpeedFactor: number;
  };
};

export type TrailRenderingOptions =
  | "beads"
  | "beadsWithoutExtremities"
  | "beadsOneInTwo"
  | "beadsStraight"
  | "skeleton"
  | "displayPoints";

/**
  "shape": {
    "witdhFunction": "CONSTANT",
    "minRadiusFactor": 1,
    "maxRadiusFactor": 1,
    "angleVariability": 0
  },
  // color
  "trailColor": { "r": 255, "g": 255, "b": 255, "alpha": 1 },
  // "amount of ink" (kinda)
  "particleDiamFactor": 1,
  // number of horizontal springs
  "nLinks": 100,
  // springs strength
  "strength": 0.1,

  // multiple "layers" printed
  "renderingPipeline": [
    "beads"
    "beadsWithoutExtremities"
    "beadsOneInTwo"
    "beadsStraight"
    "skeleton"
    "displayPoints"
  ]
*/
export type TrailAspect = {
  shape: {
    widthFunction: "CONSTANT" | "FROM_SMALL" | "TO_SMALL";
    minRadiusFactor: number;
    maxRadiusFactor: number;
    angleVariability: number;
  };
  trailColor: Color;
  particleDiamFactor: number;
  nLinks: number;
  strength: number;
  renderingPipeline: TrailRenderingOptions[];
};

export type TrailConfig = {
  trajectory: TrailTrajectory;
  aspect: TrailAspect;
};

export type Config = ConfigBase & {
  trails: TrailConfig[];
  canvas: CanvasConfig;
};
