import fs from "fs";
import _ from "lodash";
import {
  LanternFishSchool,
  PerformantLanternFishSchool,
  SuperPerformantLanternFishSchool,
} from "./day-06.service";

const main = () => {
  const fileString = fs
    .readFileSync(__dirname + "/day-06.data.txt", "utf8")
    .toString();
  const initialFishPop = fileString.split(",").map(Number);

  // Part 1 Non Performant
  const part1Start = Date.now();
  const fishSchool = new LanternFishSchool({
    schoolInitial: initialFishPop,
  });
  _.times(80, () => {
    fishSchool.incrementDay();
  });
  console.log(
    "Part 1 (non-performant-simulation):",
    fishSchool.getLanternFishCount()
  );
  console.log(
    "Part 1 (non-performant-simulation) Duration: ",
    Date.now() - part1Start,
    "ms"
  );

  // Part 1 Performant
  const part1FastStart = Date.now();
  const fishSchoolPerformant = new PerformantLanternFishSchool({
    schoolInitial: initialFishPop,
  });
  _.times(80, () => {
    fishSchoolPerformant.incrementDay();
  });
  console.log(
    "Part 1 (performant):",
    fishSchoolPerformant.getLanternFishCount()
  );
  console.log(
    "Part 1 (performant) Duration: ",
    Date.now() - part1FastStart,
    "ms"
  );

  // Part 1 Super Performant
  const part1SuperFastStart = Date.now();
  const fishSchoolSuperPerformant = new SuperPerformantLanternFishSchool({
    schoolInitial: initialFishPop,
  });
  _.times(80, () => {
    fishSchoolSuperPerformant.incrementDay();
  });
  console.log(
    "Part 1 (Super Performant):",
    fishSchoolSuperPerformant.getLanternFishCount()
  );
  console.log(
    "Part 1 (Super Performant) Duration: ",
    Date.now() - part1SuperFastStart,
    "ms"
  );

  // Part 2 Non Performant
  console.log(
    "Part 2 (non-performant-simulation):",
    "cannot run, will take too long"
  );
  console.log("Part 2 (non-performant-simulation) Duration: ", "N/A");

  // Part 2 Performant
  console.log(
    "Part 2 (performant):",
    "cannot run, will take too long"
  );
  console.log("Part 2 (performant) Duration: ", "N/A");

  // Part 2 Performant
  const part2Start = Date.now();
  const fishSchoolSuperPerformant2 = new SuperPerformantLanternFishSchool({
    schoolInitial: initialFishPop,
  });
  _.times(256, () => {
    fishSchoolSuperPerformant2.incrementDay();
  });
  console.log(
    "Part 2 (performant):",
    fishSchoolSuperPerformant2.getLanternFishCount()
  );
  console.log("Part 2 (performant) Duration: ", Date.now() - part2Start, "ms");
};

export default main;
