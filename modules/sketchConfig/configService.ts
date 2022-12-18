import { Config } from "./configTypes.ts";

import { ConfigModel, TrailModel } from "./configModel.ts";
import * as CanvasConfigService from "./canvasConfig/canvasConfigService.ts";
import * as TrailAspectService from "./trailAspect/trailAspectService.ts";
import * as TrajectoryService from "./trajectory/trajectoryService.ts";
import {
  APICanvasConfig,
  APICanvasConfigCreateInput,
} from "./canvasConfig/canvasConfigTypes.ts";
import { APITrailAspectCreateInput } from "./trailAspect/trailAspectTypes.ts";
import { APITrajectoryCreateInput } from "./trajectory/trajectoryTypes.ts";

export async function getConfig(
  args: { _id: string } | { name: string },
): Promise<Config | undefined> {
  console.log("Config service - getConfig", JSON.stringify(args));
  const result = await ConfigModel
    .findOne(args)
    .populate("canvas")
    .populate({
      path: "trails",
      populate: [
        { path: "aspect", model: "TrailAspect" },
        { path: "trajectory", model: "Trajectory" },
      ],
    })
    .exec();
  return result?.toObject<Config>();
}

export async function createConfig(
  args: {
    name: string;
    config?: Omit<Config, "_id" | "name" | "canvas">;
    canvas?: Omit<APICanvasConfig, "_id">;
  },
): Promise<Config | undefined> {
  const { name, config, canvas } = args;
  console.log(
    `Config service - createConfig ${name}, ${JSON.stringify(config)}`,
  );
  const newConfig = await ConfigModel.create({
    name,
    ...config,
  });
  if (canvas) {
    await addCanvasToConfig({ configId: newConfig._id.toString(), canvas });
  }
  return getConfig({ _id: newConfig._id.toString() });
}

export async function updateConfig(
  { name, updates }: {
    name: string;
    updates: Partial<Config>;
  },
): Promise<Config | undefined> {
  console.log(
    `Config service - updateConfig ${name}, ${JSON.stringify(updates)}`,
  );
  const config = await getConfig({ name });
  if (!config) {
    throw new Error("config not found");
  }
  const configId = config._id;
  const result = await ConfigModel.updateOne({ _id: configId }, updates);
  if (result.acknowledged && result.modifiedCount === 0) {
    throw new Error("Config not updated");
  }
  return getConfig({ _id: configId.toString() });
}

export async function addCanvasToConfig(
  { configId, canvas }: {
    configId: string;
    canvas: APICanvasConfigCreateInput;
  },
): Promise<Config | undefined> {
  console.log(
    `Config service - addCanvasToConfig ${configId}, ${JSON.stringify(canvas)}`,
  );
  // Find config
  const config = await getConfig({ _id: configId });
  // if config has canvas, throw
  if (config?.canvas) {
    throw new Error("Config already has canvas");
  }
  const newCanvas = await CanvasConfigService.createCanvasConfig(canvas);
  const updateResult = await ConfigModel.updateOne({ _id: configId }, {
    canvas: newCanvas?._id,
  });
  if (updateResult.acknowledged && updateResult.modifiedCount === 0) {
    throw new Error("Config service - Canvas not added to config");
  }
  return getConfig({ _id: configId });
}

export async function addTrailToConfig(
  {
    configId,
    trailAspect,
    trajectory,
  }: {
    configId: string;
    trailAspect: APITrailAspectCreateInput;
    trajectory: APITrajectoryCreateInput;
  },
): Promise<Config | undefined> {
  console.log(
    `Config service - addTrailToConfig ${configId}, ${
      JSON.stringify(trailAspect)
    }`,
  );
  // Create trail aspect
  const newTrailAspect = await TrailAspectService.createTrailAspect(
    trailAspect,
  );
  // Create Trajectory
  const newTrajectory = await TrajectoryService.createTrajectory(
    trajectory,
  );
  // Create trail
  const newTrail = await TrailModel.create({
    aspect: newTrailAspect?._id,
    trajectory: newTrajectory?._id,
  });

  // Add trail to config
  const result = await ConfigModel.updateOne(
    { _id: configId },
    { $push: { trails: newTrail } },
  );

  if (result.acknowledged && result.modifiedCount === 0) {
    throw new Error("Config service - Trail not added to config");
  }

  return getConfig({ _id: configId });
}
