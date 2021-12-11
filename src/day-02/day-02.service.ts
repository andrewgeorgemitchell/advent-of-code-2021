export enum DirectionEnum {
  Forward = "forward",
  Backward = "backward",
  Up = "up",
  Down = "down",
}

export const convertFileStringToArray = (
  fileString: string
): Array<{
  direction: DirectionEnum;
  magnitude: number;
}> => {
  return fileString.split("\n").map((line: string) => {
    const [direction, numStr] = line.split(" ");
    return {
      direction: direction as DirectionEnum,
      magnitude: parseInt(numStr),
    };
  });
};

export const calculatePosition = (
  array: Array<{
    direction: DirectionEnum;
    magnitude: number;
  }>
): { x: number; y: number } => {
  let x = 0;
  let y = 0;
  for (const { direction, magnitude } of array) {
    switch (direction) {
      case DirectionEnum.Forward:
        x += magnitude;
        break;
      case DirectionEnum.Backward:
        x -= magnitude;
        break;
      case DirectionEnum.Up:
        y -= magnitude;
        break;
      case DirectionEnum.Down:
        y += magnitude;
        break;
    }
  }
  return { x, y };
};

export const calculatePositionWithAngle = (
  array: Array<{
    direction: DirectionEnum;
    magnitude: number;
  }>
): { x: number; y: number } => {
  let x = 0;
  let y = 0;
  let angle = 0;
  for (const { direction, magnitude } of array) {
    switch (direction) {
      case DirectionEnum.Forward:
        x += magnitude;
        y += magnitude * angle
        break;
      case DirectionEnum.Backward:
        x -= magnitude;
        y -= magnitude * angle
        break;
      case DirectionEnum.Up:
        angle -= magnitude;
        break;
      case DirectionEnum.Down:
        angle += magnitude;
        break;
    }
  }
  return { x, y };
};

