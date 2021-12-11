import { v4 as uuid } from "uuid";

export const convertFileInputToArrayOfPopulationStats = (
  fileString: string
): Array<number[]> => {
  const lines = fileString.split("\n");
  return lines.map((line) => line.split(":")[1].trim().split(",").map(Number));
};

type FishId = string;

type FishParents = {
  father: FishId | null;
  mother: FishId | null;
};

enum FishGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface ILanternFish {
  id: string;
  age: number;
  ancestors: FishId[];
  parents: FishParents;
  gender: FishGender;

  incrementDay(): LanternFish | null;
  getInternalTimer(): number;
}

export class LanternFish implements ILanternFish {
  id: FishId;
  private internalTimer: number = 8;
  age: number = 0;
  private breedingPeriod = 7;
  ancestors: FishId[];
  parents: FishParents;
  gender: FishGender;

  constructor({
    ancestors,
    parents,
    internalTimer,
  }: {
    ancestors: FishId[];
    parents: FishParents;
    internalTimer?: number;
  }) {
    this.id = uuid();
    this.ancestors = ancestors;
    this.gender = Math.random() > 0.5 ? FishGender.MALE : FishGender.FEMALE;
    this.parents = parents;
    if (internalTimer) {
      this.internalTimer = internalTimer;
      this.age = 8 - (internalTimer % 8);
    }
  }

  private breed(): LanternFish | null {
    if (this.internalTimer === 0) {
      this.internalTimer = this.breedingPeriod - 1;
      return new LanternFish({
        ancestors: [...this.ancestors, this.id],
        parents: {
          ...(this.gender === FishGender.MALE
            ? { father: this.id }
            : { father: null }),
          ...(this.gender === FishGender.FEMALE
            ? { mother: this.id }
            : { mother: null }),
        },
      });
    }
    return null;
  }

  getInternalTimer(): number {
    return this.internalTimer;
  }

  incrementDay(): LanternFish | null {
    if (this.internalTimer === 0) {
      const newFish = this.breed();
      if (newFish !== null) {
        return newFish;
      }
    }
    this.internalTimer--;
    this.age++;
    return null;
  }
}

export interface ILanternFishSchool {
  school: Record<string, LanternFish>;
  schoolOrder: FishId[];

  incrementDay(): void;
  getLanternFishCount(): number;
  getLanternFishArray(): LanternFish[];
  findFishByParentId(parentId: FishId): LanternFish | null;
  getSchoolTimesByOrder(): number[];
}

export class LanternFishSchool implements ILanternFishSchool {
  school: Record<string, LanternFish> = {};
  schoolOrder: FishId[] = [];

  constructor({ schoolInitial }: { schoolInitial: number[] }) {
    for (let i = 0; i < schoolInitial.length; i++) {
      const fish = new LanternFish({
        ancestors: [],
        parents: {
          father: null,
          mother: null,
        },
        internalTimer: schoolInitial[i],
      });
      this.school[fish.id] = fish;
      this.schoolOrder.push(fish.id);
    }
  }

  incrementDay(): void {
    const fishKeys = Object.keys(this.school);
    fishKeys.forEach((fishKey) => {
      const possibleNewFish = this.school[fishKey].incrementDay();
      if (possibleNewFish !== null) {
        this.school[possibleNewFish.id] = possibleNewFish;
        this.schoolOrder.push(possibleNewFish.id);
      }
    });
  }

  getLanternFishCount(): number {
    return this.schoolOrder.length;
  }

  getLanternFishArray(): LanternFish[] {
    return this.schoolOrder.map((fishId) => this.school[fishId]);
  }

  findFishByParentId(parentId: FishId): LanternFish | null {
    const fishKeys = Object.keys(this.school);
    for (const fishKey of fishKeys) {
      const fish = this.school[fishKey];
      if (
        fish.parents.father === parentId ||
        fish.parents.mother === parentId
      ) {
        return fish;
      }
    }
    return null;
  }

  getSchoolTimesByOrder(): number[] {
    return this.schoolOrder.map((fishId) =>
      this.school[fishId].getInternalTimer()
    );
  }
}

type LanternFishLifecycleTimer = number;

interface IPerformantLanternFishSchool {
  schoolOrder: LanternFishLifecycleTimer[];

  incrementDay(): void;
  getSchoolTimesByOrder(): LanternFishLifecycleTimer[];
  getLanternFishCount(): number;
}

export class PerformantLanternFishSchool
  implements IPerformantLanternFishSchool
{
  schoolOrder: LanternFishLifecycleTimer[] = [];

  constructor({
    schoolInitial,
  }: {
    schoolInitial: LanternFishLifecycleTimer[];
  }) {
    this.schoolOrder = schoolInitial;
  }
  getLanternFishCount(): number {
    return this.schoolOrder.length;
  }

  incrementDay(): void {
    const newFish: LanternFishLifecycleTimer[] = [];
    this.schoolOrder = this.schoolOrder.map((fishLifecycleTimer) => {
      if (fishLifecycleTimer === 0) {
        newFish.push(8);
        return 6;
      }
      return fishLifecycleTimer - 1;
    });
    this.schoolOrder = [...this.schoolOrder, ...newFish];
  }

  getSchoolTimesByOrder(): LanternFishLifecycleTimer[] {
    return this.schoolOrder;
  }
}

type SimpleLanternFishSchool = {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
};

interface ISuperPerformantLanternFishSchool {
  schoolSize: SimpleLanternFishSchool;

  incrementDay(): void;
  getLanternFishCount(): number;
}

export class SuperPerformantLanternFishSchool
  implements ISuperPerformantLanternFishSchool
{
  schoolSize: SimpleLanternFishSchool;

  constructor({
    schoolInitial,
  }: {
    schoolInitial: LanternFishLifecycleTimer[];
  }) {
    this.schoolSize = schoolInitial.reduce(
      (acc, currentFish) => {
        acc[currentFish]++;
        return acc;
      },
      { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
    );
  }

  incrementDay(): void {
    const newFishSchool = {
      0: this.schoolSize[1],
      1: this.schoolSize[2],
      2: this.schoolSize[3],
      3: this.schoolSize[4],
      4: this.schoolSize[5],
      5: this.schoolSize[6],
      6: this.schoolSize[7] + this.schoolSize[0],
      7: this.schoolSize[8],
      8: this.schoolSize[0],
    }
    this.schoolSize = newFishSchool;
  }

  getLanternFishCount(): number {
    return Object.values(this.schoolSize).reduce((acc, currentValue) => {
      return acc + currentValue;
    }, 0);
  }
}
