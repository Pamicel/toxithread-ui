import { Config } from "./configTypes.ts";

import ConfigModel from "./configModel.ts";
import { canvasConfigModel } from "./canvasConfig/canvasConfigModel.ts";
import { APICanvasConfig } from "./canvasConfig/canvasConfigTypes.ts";

export async function getConfigById(
  { _id }: { _id: string },
): Promise<Config | undefined> {
  console.log("config service - getConfigById", _id);
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
  console.log("config service - getConfigByName", name);
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
  console.log("config service - getConfig", _id, name);
  if (_id) {
    return getConfigById({ _id });
  } else if (name) {
    return getConfigByName({ name });
  }
}

export async function createConfig(
  args: {
    name: string;
    mainValues?: Omit<Config, "_id" | "name" | "canvas">;
    canvas?: Omit<APICanvasConfig, "_id">;
  },
): Promise<Config | undefined> {
  const { name, mainValues, canvas } = args;
  console.log(
    `config service - createConfig ${name}, ${JSON.stringify(mainValues)}`,
  );
  let newCanvas: APICanvasConfig | undefined = undefined;
  if (canvas) {
    newCanvas = await (await canvasConfigModel.create(canvas)).toObject();
  }
  const config = await ConfigModel.create({
    name,
    ...mainValues,
    canvas: newCanvas?._id,
  });
  return getConfigById({ _id: config._id.toString() });
}

export async function updateConfig(
  { name, updates }: {
    name: string;
    updates: Partial<Config>;
  },
): Promise<Config | undefined> {
  console.log(
    `config service - updateConfig ${name}, ${JSON.stringify(updates)}`,
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
