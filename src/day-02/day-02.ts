import fs from "fs";
import {
  calculatePosition,
  calculatePositionWithAngle,
  convertFileStringToArray,
} from "./day-02.service";

const main = () => {
  const fileString = fs.readFileSync(__dirname + "/day-02.data.txt", "utf8");

  const { x, y } = calculatePosition(convertFileStringToArray(fileString));
  console.log("Part 1:");
  console.log("x:", x);
  console.log("y:", y);
  console.log("product:", x * y);

  const { x: x2, y: y2 } = calculatePositionWithAngle(
    convertFileStringToArray(fileString)
  );
  console.log("Part 2:");
  console.log("x:", x2);
  console.log("y:", y2);
  console.log("product:", x2 * y2);
};

export default main;
