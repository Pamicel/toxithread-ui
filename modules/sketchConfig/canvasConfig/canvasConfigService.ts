import { canvasConfigModel } from "./canvasConfigModel.ts";
import { CanvasConfig } from "./canvasConfigTypes.ts";
import { APICanvasConfigCreateInput } from "./canvasConfigTypes.ts";

export async function createCanvasConfig(
  canvasConfig: APICanvasConfigCreateInput,
): Promise<CanvasConfig | undefined> {
  console.log("Canvas config service - createCanvasConfig", canvasConfig);
  const newCanvasConfig = await canvasConfigModel.create(canvasConfig);
  return newCanvasConfig.toObject<CanvasConfig>();
}

export async function getCanvasConfigById(
  _id: string,
): Promise<CanvasConfig | undefined> {
  console.log("Canvas config service - getCanvasConfigById", _id);
  const result = await canvasConfigModel
    .findOne({ _id })
    .exec();
  return result?.toObject<CanvasConfig>();
}

export async function updateCanvasConfig({ _id, updates }: {
  _id: string;
  updates: APICanvasConfigCreateInput;
}): Promise<CanvasConfig | undefined> {
  console.log("Canvas config service - updateCanvasConfig", _id, updates);
  const result = await canvasConfigModel.updateOne({ _id }, updates);
  if (result.acknowledged && result.modifiedCount === 0) {
    throw new Error("Canvas config service - Config not updated");
  }

  return getCanvasConfigById(_id);
}
