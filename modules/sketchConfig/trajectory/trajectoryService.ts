import { TrajectoryModel } from "./trajectoryModel.ts";
import { APITrajectoryCreateInput, Trajectory } from "./trajectoryTypes.ts";

export async function createTrajectory(
  trajectory: APITrajectoryCreateInput,
): Promise<Trajectory | undefined> {
  console.log(
    `Trajectory service - createTrajectory ${JSON.stringify(trajectory)}`,
  );
  const newTrajectory = await TrajectoryModel.create(trajectory);
  return newTrajectory.toObject<Trajectory>();
}
