import {
  CanvasConfig,
  CanvasConfigInput,
  Config,
  ConfigInput,
  Maybe,
} from "./types.ts";
import * as Service from "./service.ts";

export function getConfig(name: string): Promise<Config> {
  return Service.getConfig(name);
}

const canvasInputToCanvas = (
  canvasInput?: Maybe<CanvasConfigInput>,
): CanvasConfig => {
  const defaultCanvasConfig: CanvasConfig = {
    backgroundImage: {
      enabled: false,
    },
    backgroundColor: { r: 0, g: 0, b: 0, alpha: 1 },
  };
  if (!canvasInput) {
    return defaultCanvasConfig;
  }
  return {
    backgroundImage: {
      enabled: canvasInput.backgroundImage?.enabled || false,
      url: canvasInput.backgroundImage?.url,
    },
    backgroundColor: canvasInput.backgroundColor ||
      defaultCanvasConfig.backgroundColor,
  };
};

const configInputToConfig = (
  name: string,
  configInput: ConfigInput,
): Config => {
  return {
    name,
    seed: configInput?.seed || 0,
    updatesPerFrame: configInput?.updatesPerFrame || 30,
    canvas: canvasInputToCanvas(configInput?.canvas),
    trails: [],
  };
};

export async function createConfig(
  name: string,
  config: ConfigInput,
): Promise<Config> {
  if (await Service.configExists(name)) {
    throw new Error(`Config with name ${name} already exists`);
  }
  return Service.writeConfig(name, configInputToConfig(name, config));
}

export function updateConfig(
  name: string,
  config: ConfigInput,
): Promise<Config> {
  return Service.writeConfig(name, configInputToConfig(name, config));
}
