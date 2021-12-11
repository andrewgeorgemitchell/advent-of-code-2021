import day01 from "./day-01/day-01";
import day02 from "./day-02/day-02";
import day03 from "./day-03/day-03";
import day04 from "./day-04/day-04";
import day05 from "./day-05/day-05";
import day06 from "./day-06/day-06";
// import day07 from './day-07/day-07';
// import day08 from './day-08/day-08';
// import day09 from './day-09/day-09';
// import day10 from './day-10/day-10';
// import day11 from './day-11/day-11';
// import day12 from './day-12/day-12';
// import day13 from './day-13/day-13';
// import day14 from './day-14/day-14';
// import day15 from './day-15/day-15';
// import day16 from './day-16/day-16';
// import day17 from './day-17/day-17';
// import day18 from './day-18/day-18';
// import day19 from './day-19/day-19';
// import day20 from './day-20/day-20';
// import day21 from './day-21/day-21';
// import day22 from './day-22/day-22';
// import day23 from './day-23/day-23';
// import day24 from './day-24/day-24';
// import day25 from './day-25/day-25';

const days = [
  day01,
  day02,
  day03,
  day04,
  day05,
  day06,
  // day07,
  // day08,
  // day09,
  // day10,
  // day11,
  // day12,
  // day13,
  // day14,
  // day15,
  // day16,
  // day17,
  // day18,
  // day19,
  // day20,
  // day21,
  // day22,
  // day23,
  // day24,
  // day25,
];

const args = process.argv.slice(2);
const numberToRunArg = Number(args[0]);

const main = () => {
  let filteredDays = days;
  if (numberToRunArg) {
    filteredDays = days.filter((_day, i) => i + 1 === +numberToRunArg);
  }
  for (let index = 0; index < filteredDays.length; index++) {
    const dayFunc = filteredDays[index];
    const dayNumber = numberToRunArg ? numberToRunArg : index + 1;
    console.log("===========================");
    console.log(`Day ${dayNumber}`);
    console.log("===========================");
    const dayStart = Date.now();
    dayFunc();
    const dayDuration = Date.now() - dayStart;
    console.log(`Day ${dayNumber} Duration: `, dayDuration, "ms");
  }
};

main();
