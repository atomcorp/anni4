/**
 * Eclat
 *
 * Rules
 * 1. no diamonds
 * 2. no 3/4 diamonds
 * 3. no half diamonds
 * 4. no kissing sides
 */

import returnSeed from "../helpers/returnSeed";
import drawShape from "../helpers/draw-shape";
import prng from "../helpers/prng";
import neighbours from "../helpers/neighbours";

type shapeType = "NW" | "NE" | "SE" | "SW";
type shapeObjType = {
  type: shapeType;
  color?: string;
};
type matrixType = shapeObjType[][];

const settings = {
  red: "#9b3b1b",
  blue: "#2b4990",
  size: [25, 25], // width, height
  grid: [32, 26], // horizontal, vertical,
  shapes: {
    NE: "NE",
    NW: "NW",
    SE: "SE",
    SW: "SW",
  },
};

const smooth = (matrix: matrixType, seed: number): matrixType => {
  /**
   * Using mutation here is much mre simple and readable than using reduce etc
   * When using the neighbours function we need the latest version of the matrix,
   * and the only way functionally would be to splice
   */
  const { NW, NE, SE, SW } = settings.shapes;
  let availableShapes = [NW, NE, SE, SW] as shapeType[];
  const mutatableMatrix = matrix;
  const getNeighbour = neighbours(settings.grid[0], settings.grid[1]);
  matrix.forEach((row, verticalIndex) => {
    row.forEach((shape: shapeObjType, horizontalIndex: number) => {
      const neighbour = getNeighbour(
        mutatableMatrix,
        horizontalIndex,
        verticalIndex
      );
      // stop ◀
      if (shape.type === NE && neighbour.north?.type === SE) {
        // availableShapes = availableShapes.filter((shape) => shape !== NE);
      }
      // stop ▼
      if (shape.type === NE && neighbour.east?.type === NW) {
        // availableShapes = availableShapes.filter((shape) => shape !== NE);
      }
      // stop ▲
      if (shape.type === SE && neighbour.east?.type === SW) {
        // availableShapes = availableShapes.filter((shape) => shape !== SE);
      }
      // stop ►
      if (shape.type === SW && neighbour.south?.type === NW) {
        // availableShapes = availableShapes.filter((shape) => shape !== SW);
      }
      if (availableShapes.length < 4) {
        mutatableMatrix[verticalIndex][horizontalIndex].type = availableShapes[
          prng(horizontalIndex, verticalIndex, availableShapes.length, seed)
        ];
      }
    });
  });
  return mutatableMatrix;
};

export default (seedString: string) => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.backgroundColor = "white";
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const seed = returnSeed(seedString);
  const drawShapeWithCtx = drawShape(ctx, settings);
  /**
   * Build the 2d array that says which shape is in which grid reference
   */
  const matrix: matrixType = Array(settings.grid[1])
    .fill(null)
    .reduce((rows, _, verticalIndex) => {
      return [
        ...rows,
        Array(settings.grid[0])
          .fill(null)
          .reduce((cells, _, horizontalIndex) => {
            const { NW, NE, SE, SW } = settings.shapes;
            const shapes = [NW, NE, SE, SW];
            const shape =
              shapes[prng(horizontalIndex, verticalIndex, shapes.length, seed)];
            return [
              ...cells,
              {
                type: shape,
                color: "rgb(243, 204, 9)",
              },
            ];
          }, []),
      ];
    }, []);
  smooth(matrix, seed).forEach((rows, verticalIndex) => {
    rows.forEach((shape, horizontalIndex) => {
      const x = horizontalIndex * settings.size[0];
      const y = verticalIndex * settings.size[1];
      // draw the shape on canvas
      drawShapeWithCtx(x, y, shape);
    });
  });
};
