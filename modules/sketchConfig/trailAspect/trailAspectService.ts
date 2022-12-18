import { TrailAspectModel } from "./trailAspectModel.ts";
import { APITrailAspectCreateInput, TrailAspect } from "./trailAspectTypes.ts";

export async function createTrailAspect(
  trailAspect: APITrailAspectCreateInput,
): Promise<TrailAspect | undefined> {
  console.log(
    `TrailAspect service - createTrailAspect ${JSON.stringify(trailAspect)}`,
  );
  const newTrailAspect = await TrailAspectModel.create(trailAspect);
  return newTrailAspect.toObject<TrailAspect>();
}
