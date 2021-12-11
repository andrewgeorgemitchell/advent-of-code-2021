import fs from 'fs';
import { findShortestMiddleGroundPosition } from './day-07.service';

const main = () => {
  const fileString = fs.readFileSync(__dirname + '/day-07.data.txt').toString();
  const positionArray = fileString.split(',').map(Number);
  
  // Part 1
  console.log('Part 1: ', findShortestMiddleGroundPosition(positionArray));

  // Part 2
  console.log('Part 2: ', findShortestMiddleGroundPosition(positionArray, true));
}

export default main;