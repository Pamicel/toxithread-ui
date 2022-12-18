import { Config } from "./configTypes.ts";

import ConfigModel from "./configModel.ts";
import * as CanvasConfigService from "./canvasConfig/canvasConfigService.ts";
import {
  APICanvasConfig,
  APICanvasConfigCreateInput,
} from "./canvasConfig/canvasConfigTypes.ts";

export async function getConfigById(
  { _id }: { _id: string },
): Promise<Config | undefined> {
  console.log("Config service - getConfigById", _id);
  const result = await ConfigModel
    .findOne({ _id })
    .populate("canvas")
    .populate("trails")
    .exec();
  return result?.toObject<Config>();
}

export async function getConfigByName(
  { name }: { name: string },
): Promise<Config | undefined> {
  console.log("Config service - getConfigByName", name);
  const result = await ConfigModel
    .findOne({ name })
    .populate("canvas")
    .populate("trails")
    .exec();
  return result?.toObject<Config>();
}

export async function getConfig(
  { _id, name }: { _id?: string; name?: string },
): Promise<Config | undefined> {
  console.log("Config service - getConfig", _id, name);
  if (_id) {
    return getConfigById({ _id });
  } else if (name) {
    return getConfigByName({ name });
  }
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
  return getConfigById({ _id: newConfig._id.toString() });
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
  const config = await getConfigByName({ name });
  if (!config) {
    throw new Error("config not found");
  }
  const configId = config._id;
  const result = await ConfigModel.updateOne({ _id: configId }, updates);
  if (result.acknowledged && result.modifiedCount === 0) {
    throw new Error("Config not updated");
  }
  return getConfigById({ _id: configId.toString() });
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
  const config = await getConfigById({ _id: configId });
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
  return getConfigById({ _id: configId });
}
