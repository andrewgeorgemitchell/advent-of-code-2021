import fs from "fs";
import {
  convertFileToLineSegments,
  convertLineSegmentsToPoints,
  findIntersectionPoints,
} from "./day-05.service";

const fileString = fs.readFileSync(__dirname + "/day-05.data.txt").toString();
const lineSegments = convertFileToLineSegments(fileString);

// Part 1
const part1Start = Date.now();
const pointsNoDiagonals = convertLineSegmentsToPoints({ lineSegments });
const totalDupesNoDiagonals = findIntersectionPoints(pointsNoDiagonals);
const part1Duration = Date.now() - part1Start;
console.log("Part 1:", totalDupesNoDiagonals);
console.log("Part 1 duration:", part1Duration, "ms");

// Part 2
const part2Start = Date.now();
const pointsWithDiagonals = convertLineSegmentsToPoints({
  lineSegments,
  checkDiagonal: true,
});
const totalDupesWithDiagonals = findIntersectionPoints(pointsWithDiagonals);
const part2Duration = Date.now() - part2Start;
console.log("Part 2:", totalDupesWithDiagonals);
console.log("Part 2 duration:", part2Duration, "ms");
