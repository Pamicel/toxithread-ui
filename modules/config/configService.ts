import { Config } from "./configTypes.ts";

import ConfigModel from "./configModel.ts";

export async function getConfigById(
  { _id }: { _id: string },
): Promise<Config | undefined> {
  console.log("config service - getConfigById", _id);
  const result = await ConfigModel.findOne({ _id });
  return result?.toObject<Config>();
}

export async function getConfigByName(
  { name }: { name: string },
): Promise<Config | undefined> {
  console.log("config service - getConfigByName", name);
  const result = await ConfigModel.findOne({ name });
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
    elements?: Omit<Config, "_id" | "name">;
  },
): Promise<Config | undefined> {
  const { name, elements } = args;
  console.log(
    `config service - createConfig ${name}, ${JSON.stringify(elements)}`,
  );
  const config = await ConfigModel.create({ name, ...elements });
  return config.toObject<Config>();
}

export async function updateConfig(
  { configId, updates }: {
    configId: string;
    updates: Partial<Config>;
  },
): Promise<Config | undefined> {
  console.log(`config service - updateConfig ${configId}, ${updates}`);
  const result = await ConfigModel.updateOne({ _id: configId }, updates);
  if (result.acknowledged && result.modifiedCount === 0) {
    throw new Error("Config not updated");
  }
  const newConfig = await ConfigModel.findOne({ _id: configId });
  return newConfig?.toObject<Config>();
}
