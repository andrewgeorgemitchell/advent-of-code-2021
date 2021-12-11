import _ from "lodash";
import { convertFileInputToArrayOfPopulationStats, LanternFish, LanternFishSchool, PerformantLanternFishSchool, SuperPerformantLanternFishSchool } from "./day-06.service";

const testInput = `Initial state: 3,4,3,1,2
After  1 day:  2,3,2,0,1
After  2 days: 1,2,1,6,0,8
After  3 days: 0,1,0,5,6,7,8
After  4 days: 6,0,6,4,5,6,7,8,8
After  5 days: 5,6,5,3,4,5,6,7,7,8
After  6 days: 4,5,4,2,3,4,5,6,6,7
After  7 days: 3,4,3,1,2,3,4,5,5,6
After  8 days: 2,3,2,0,1,2,3,4,4,5
After  9 days: 1,2,1,6,0,1,2,3,3,4,8
After 10 days: 0,1,0,5,6,0,1,2,2,3,7,8
After 11 days: 6,0,6,4,5,6,0,1,1,2,6,7,8,8,8
After 12 days: 5,6,5,3,4,5,6,0,0,1,5,6,7,7,7,8,8
After 13 days: 4,5,4,2,3,4,5,6,6,0,4,5,6,6,6,7,7,8,8
After 14 days: 3,4,3,1,2,3,4,5,5,6,3,4,5,5,5,6,6,7,7,8
After 15 days: 2,3,2,0,1,2,3,4,4,5,2,3,4,4,4,5,5,6,6,7
After 16 days: 1,2,1,6,0,1,2,3,3,4,1,2,3,3,3,4,4,5,5,6,8
After 17 days: 0,1,0,5,6,0,1,2,2,3,0,1,2,2,2,3,3,4,4,5,7,8
After 18 days: 6,0,6,4,5,6,0,1,1,2,6,0,1,1,1,2,2,3,3,4,6,7,8,8,8,8`

describe("Day 06", () => {
  test("Test file conversion", () => {
    const popStats = convertFileInputToArrayOfPopulationStats(testInput);
    expect(popStats.length).toBe(19);
  })

  test("Test lanternFishSchool internalTimer & breeding mechanics", () => {
    const lanternFishSchool = new LanternFishSchool({
      schoolInitial: [3]
    });
    const parentFishId = lanternFishSchool.getLanternFishArray()[0].id;
    expect(lanternFishSchool.school[parentFishId].getInternalTimer()).toBe(3);
    expect(lanternFishSchool.school[parentFishId].age).toBe(5);
    lanternFishSchool.incrementDay();
    expect(lanternFishSchool.school[parentFishId].getInternalTimer()).toBe(2);
    lanternFishSchool.incrementDay();
    expect(lanternFishSchool.school[parentFishId].getInternalTimer()).toBe(1);
    lanternFishSchool.incrementDay();
    expect(lanternFishSchool.school[parentFishId].getInternalTimer()).toBe(0);
    expect(lanternFishSchool.school[parentFishId].age).toBe(8);
    lanternFishSchool.incrementDay();
    expect(lanternFishSchool.getLanternFishCount()).toBe(2);
    expect(lanternFishSchool.school[parentFishId].getInternalTimer()).toBe(6);
    const childFishId = lanternFishSchool.findFishByParentId(parentFishId).id;
    expect(childFishId).toBeDefined();
    expect(lanternFishSchool.getSchoolTimesByOrder()).toEqual([6, 8]);
    lanternFishSchool.incrementDay();
    expect(lanternFishSchool.getSchoolTimesByOrder()).toEqual([5, 7]);
    expect(lanternFishSchool.schoolOrder).toEqual([parentFishId, childFishId]);
  });

  test('Test school population growth', () => {
    const popStats = convertFileInputToArrayOfPopulationStats(testInput);
    const initialPop = popStats[0];
    const lanternFishSchool = new LanternFishSchool({schoolInitial: initialPop});
    for (let i = 1; i < popStats.length; i++) {
      const currentExpectedPop = popStats[i];
      lanternFishSchool.incrementDay();
      expect(lanternFishSchool.getSchoolTimesByOrder()).toEqual(currentExpectedPop);
    }
  })

  test('Test large scale population growth (80 days)', () => {
    const popStats = convertFileInputToArrayOfPopulationStats(testInput);
    const initialPop = popStats[0];
    const lanternFishSchool = new LanternFishSchool({schoolInitial: initialPop});
    _.times(80, () => {
      lanternFishSchool.incrementDay();
    })
    expect(lanternFishSchool.getLanternFishCount()).toEqual(5934);
  })

  test('(PerformantLanternFishSchool) Test school population growth', () => {
    const popStats = convertFileInputToArrayOfPopulationStats(testInput);
    const initialPop = popStats[0];
    const lanternFishSchool = new PerformantLanternFishSchool({schoolInitial: initialPop});
    for (let i = 1; i < popStats.length; i++) {
      const currentExpectedPop = popStats[i];
      lanternFishSchool.incrementDay();
      console.log('lanternFishSchool.getSchoolTimesByOrder():', lanternFishSchool.getSchoolTimesByOrder())
      expect(lanternFishSchool.getSchoolTimesByOrder()).toEqual(currentExpectedPop);
    }
  })

  test('(PerformantLanternFishSchool) Test large scale population growth (80 days)', () => {
    const popStats = convertFileInputToArrayOfPopulationStats(testInput);
    const initialPop = popStats[0];
    const lanternFishSchool = new PerformantLanternFishSchool({schoolInitial: initialPop});
    _.times(80, () => {
      lanternFishSchool.incrementDay();
    })
    expect(lanternFishSchool.getLanternFishCount()).toEqual(5934);
  })

  test('(SuperPerformantLanternFishSchool) Test school population growth', () => {
    const popStats = convertFileInputToArrayOfPopulationStats(testInput);
    const initialPop = popStats[0];
    const lanternFishSchool = new SuperPerformantLanternFishSchool({schoolInitial: initialPop});
    _.times(80, () => {
      lanternFishSchool.incrementDay();
    })
    expect(lanternFishSchool.getLanternFishCount()).toEqual(5934);
  })
});
