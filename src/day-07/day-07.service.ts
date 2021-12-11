export const findFuelCostForPosition = ({
  endPosition,
  currentPositions,
  exponentialFuelCost,
}: {
  endPosition: number;
  currentPositions: number[];
  exponentialFuelCost?: boolean;
}) => {
  return currentPositions.reduce((acc, currentPosition) => {
    const diff = Math.abs(currentPosition - endPosition);
    let fuelCost = diff;
    if (exponentialFuelCost) {
      fuelCost = (diff * (diff + 1)) / 2;
    }
    return acc + fuelCost;
  }, 0);
};

export const findShortestMiddleGroundPosition = (
  currentPositions: number[],
  exponentialFuelCost?: boolean
): number => {
  let currentLowestPosition;
  const highestPosition = Math.max(...currentPositions);
  for (let i = 0; i < highestPosition; i++) {
    const currentPosition = i;
    const fuelCost = findFuelCostForPosition({
      endPosition: currentPosition,
      currentPositions,
      exponentialFuelCost,
    });
    if (!currentLowestPosition || fuelCost < currentLowestPosition) {
      currentLowestPosition = fuelCost;
    }
  }
  return currentLowestPosition;
};
