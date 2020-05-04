
type shapeObjType = {
  type: string;
  color?: string;
};
type matrixType = shapeObjType[][];
export type neighbourType = {
  west: shapeObjType;
  northEast: shapeObjType;
  north: shapeObjType;
  south: shapeObjType;
  southEast: shapeObjType;
  east: shapeObjType;
}

const neighbours = (gridWidth: number, gridHeight: number) => (matrix: matrixType, horizontalIndex: number, verticalIndex: number) => {
  const west: shapeObjType | null =
    horizontalIndex > 0 ? matrix[verticalIndex][horizontalIndex - 1] : null;
  const northEast: shapeObjType | null =
    horizontalIndex + 1 < gridWidth && verticalIndex > 0
      ? matrix[verticalIndex - 1][horizontalIndex + 1]
      : null;
  const north: shapeObjType | null =
    verticalIndex > 0 ? matrix[verticalIndex - 1][horizontalIndex] : null;
  const south: shapeObjType | null =
    verticalIndex + 1 < gridHeight
      ? matrix[verticalIndex + 1][horizontalIndex]
      : null;
  const southEast: shapeObjType | null =
    verticalIndex + 1 < gridHeight && horizontalIndex + 1 < gridWidth
      ? matrix[verticalIndex + 1][horizontalIndex + 1]
      : null;
  const east: shapeObjType | null =
    horizontalIndex + 1 < gridWidth
      ? matrix[verticalIndex][horizontalIndex + 1]
      : null;
  return {
    west,
    northEast,
    north,
    south,
    southEast,
    east
  };
};

export default neighbours;