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
import neighbours, { neighbourType } from "../helpers/neighbours";

type NW = "NW";
type NE = "NE";
type SE = "SE";
type SW = "SW";
type shapeType = NW | NE | SE | SW;
type shapeObjType = {
  type: shapeType;
  color?: string;
};
type matrixType = shapeObjType[][];
type settings = {
  size: number[];
  grid: number[];
  shapes: {
    NE: shapeType;
    NW: shapeType;
    SE: shapeType;
    SW: shapeType;
  };
};

const settings: settings = {
  size: [25, 25], // width, height
  grid: [32, 26], // horizontal, vertical,
  shapes: {
    NE: "NE",
    NW: "NW",
    SE: "SE",
    SW: "SW",
  },
};

const getIsMarried = (shape: shapeType, neighbour: neighbourType) => {
  /**
   * Check if the shape is alone
   */
  const { NW, NE, SE, SW } = settings.shapes;
  if (
    shape === NE &&
    neighbour.north?.type === SW &&
    neighbour.east?.type === SW
  ) {
    return true;
  }
  if (
    shape === NW &&
    neighbour.north?.type === SE &&
    neighbour.west?.type === SE
  ) {
    return true;
  }
  if (
    shape === SE &&
    neighbour.east?.type === NW &&
    neighbour.south?.type === NW
  ) {
    return true;
  }
  if (
    shape === SW &&
    neighbour.west?.type === NE &&
    neighbour.south?.type === NE
  ) {
    return true;
  }
  return false;
};

const getIsInConflict = (shape: shapeType, neighbour: neighbourType) => {
  const { NW, NE, SE, SW } = settings.shapes;
  if (shape === NW && neighbour.north?.type === SE) {
    return true;
  }
};

const getEligibleShapes = (shape: shapeType, neighbour: neighbourType) => {
  const { NW, NE, SE, SW } = settings.shapes;
  let allowedShapes = [] as shapeType[];
  let disallowedShapes = [] as shapeType[];
  if (neighbour.north?.type === SW || neighbour.east?.type === SW) {
    allowedShapes.push(NE);
    // disallowedShapes.push(NW, SE);
  }
  if (neighbour.north?.type === SE || neighbour.west?.type === SE) {
    allowedShapes.push(NW);
    // disallowedShapes.push(NE, SW);
  }
  if (neighbour.south?.type === NW || neighbour.east?.type === NW) {
    allowedShapes.push(SE);
    // disallowedShapes.push(NE, SW);
  }
  if (neighbour.south?.type === NE || neighbour.west?.type === NE) {
    allowedShapes.push(SW);
    // disallowedShapes.push(NE, SW);
  }
  return allowedShapes.filter((shape) => !disallowedShapes.includes(shape));
};

/**
 * try and find a matching shape
 */
const marry = (seed: number) => (matrix: matrixType): matrixType => {
  const { NW, NE, SE, SW } = settings.shapes;
  const shapes = [NW, NE, SE, SW] as shapeType[];
  const mutatableMatrix = matrix;
  const getNeighbour = neighbours(settings.grid[0], settings.grid[1]);
  matrix.forEach((row, verticalIndex) => {
    row.forEach((shape: shapeObjType, horizontalIndex: number) => {
      let eligibleShapes = shapes;
      const neighbour = getNeighbour(
        mutatableMatrix,
        horizontalIndex,
        verticalIndex
      );
      const isMarried = getIsMarried(shape.type, neighbour);
      eligibleShapes = [...shapes, ...getEligibleShapes(shape.type, neighbour)];

      if (eligibleShapes.length > 0) {
        mutatableMatrix[verticalIndex][horizontalIndex].type =
          eligibleShapes[
            prng(horizontalIndex, verticalIndex, eligibleShapes.length, seed)
          ];
      } else {
        // mutatableMatrix[verticalIndex][horizontalIndex].color = "red";
      }
    });
  });
  return mutatableMatrix;
};

const smooth = (seed: number) => (matrix: matrixType): matrixType => {
  /**
   * Using mutation here is much mre simple and readable than using reduce etc
   * When using the neighbours function we need the latest version of the matrix,
   * and the only way functionally would be to splice
   */
  const { NW, NE, SE, SW } = settings.shapes;
  const shapes = [NW, NE, SE, SW] as shapeType[];
  const mutatableMatrix = matrix;
  const getNeighbour = neighbours(settings.grid[0], settings.grid[1]);
  matrix.forEach((row, verticalIndex) => {
    row.forEach((shape: shapeObjType, horizontalIndex: number) => {
      let availableShapes = shapes;
      const neighbour = getNeighbour(
        mutatableMatrix,
        horizontalIndex,
        verticalIndex
      );
      /**
       * North
       */
      if (neighbour.north?.type === SE) {
        availableShapes = availableShapes.filter((shape) => shape !== NE);
      }
      if (neighbour.north?.type === SW) {
        availableShapes = availableShapes.filter((shape) => shape !== NW);
      }
      /**
       * East
       */
      if (neighbour.east?.type === NW) {
        availableShapes = availableShapes.filter((shape) => shape !== NE);
      }
      if (neighbour.east?.type === SW) {
        availableShapes = availableShapes.filter((shape) => shape !== SE);
      }
      if (neighbour.east?.type === NE) {
        availableShapes = availableShapes.filter((shape) => shape !== NW);
      }
      /**
       * South
       */
      if (neighbour.south?.type === NW) {
        availableShapes = availableShapes.filter((shape) => shape !== SW);
      }
      if (neighbour.south?.type === NE) {
        availableShapes = availableShapes.filter((shape) => shape !== NE);
      }
      /**
       * West
       */
      if (availableShapes.length < 4) {
        mutatableMatrix[verticalIndex][horizontalIndex].type =
          availableShapes[
            prng(horizontalIndex, verticalIndex, availableShapes.length, seed)
          ];
      }
      if (availableShapes.length === 0) {
        console.log("no shapes");
      }
    });
  });
  return mutatableMatrix;
};

const setLog = () => {
  let counter = {
    NW: 0,
    NE: 0,
    SE: 0,
    SW: 0,
  };
  return {
    add: (shape: shapeObjType) => {
      counter[shape.type]++;
    },
    show: () => {
      console.log(counter);
    },
    reset: () => {
      counter = {
        NW: 0,
        NE: 0,
        SE: 0,
        SW: 0,
      };
    },
  };
};

const log = setLog();

export default (seedString: string) => {
  log.reset();
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
  const marryMatrix = marry(seed);
  const smoothMatrix = smooth(seed);
  const newMatrix = marryMatrix(matrix);
  marryMatrix(matrix).forEach((rows, verticalIndex) => {
    rows.forEach((shape, horizontalIndex) => {
      const x = horizontalIndex * settings.size[0];
      const y = verticalIndex * settings.size[1];
      log.add(shape);
      // draw the shape on canvas
      drawShapeWithCtx(x, y, shape);
    });
  });
  log.show();
};
