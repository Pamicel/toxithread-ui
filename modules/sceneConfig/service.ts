import * as path from "https://deno.land/std@0.167.0/path/mod.ts";
import { Config } from "./types.ts";

const dirname = new URL(".", import.meta.url).pathname;
const CONFIG_DIR = path.join(dirname, "configs/");
await Deno.mkdir(CONFIG_DIR, { recursive: true });

export const getConfig = async (name: string): Promise<Config> => {
  // Read from file CONFIG_DIR/name.json
  const filepath = path.join(CONFIG_DIR, `${name.toLowerCase()}.json`);
  try {
    const config = await Deno.readTextFile(filepath);
    // Return the config
    return JSON.parse(config);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      throw new Error("Config not found");
    }
    throw error;
  }
};

const configExists = async (name: string): Promise<boolean> => {
  const filepath = path.join(CONFIG_DIR, `${name.toLowerCase()}.json`);
  try {
    await Deno.stat(filepath);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    }
    throw error;
  }
};

export const createConfig = async (
  name: string,
  config: Config,
): Promise<Config> => {
  if (await configExists(name)) {
    throw new Error(`Config with name ${name} already exists`);
  }
  // Write to file CONFIG_DIR/name.json
  const filepath = path.join(CONFIG_DIR, `${name.toLowerCase()}.json`);
  await Deno.writeTextFile(filepath, JSON.stringify(config));
  // Return the config
  return config;
};
