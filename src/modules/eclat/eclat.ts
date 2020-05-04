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
  isBlocked: boolean;
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
  if (
    shape === NW &&
    (neighbour.north?.type === SW || neighbour.west?.type === NE)
  ) {
    return true;
  }
  if (
    shape === NE &&
    (neighbour.north?.type === SE || neighbour.east?.type === NW)
  ) {
    return true;
  }
  if (
    shape === SE &&
    (neighbour.south?.type === NE || neighbour.east?.type === SW)
  ) {
    return true;
  }
  if (
    shape === SW &&
    (neighbour.south?.type === NW || neighbour.east?.type === SE)
  ) {
    return true;
  }
  return false;
};

const getEligibleShapes = (
  shape: shapeType,
  neighbour: neighbourType,
  force?: boolean
) => {
  const { NW, NE, SE, SW } = settings.shapes;
  let allowedShapes = [] as shapeType[];
  let disallowedShapes = [] as shapeType[];
  if (neighbour.north?.type === SW || neighbour.east?.type === SW) {
    allowedShapes.push(NE);
    if (
      !force &&
      (neighbour.west?.type !== SE || neighbour.south?.type !== NW)
    ) {
      allowedShapes.push(SW);
    }
    disallowedShapes.push(NW, SE);
  }
  if (neighbour.north?.type === SE || neighbour.west?.type === SE) {
    allowedShapes.push(NW);
    if (
      !force &&
      (neighbour.east?.type !== SW || neighbour.south?.type !== NE)
    ) {
      allowedShapes.push(SE);
    }
    disallowedShapes.push(NE, SW);
  }
  if (neighbour.south?.type === NW || neighbour.east?.type === NW) {
    allowedShapes.push(SE);
    if (
      !force &&
      (neighbour.north?.type !== SW || neighbour.west?.type !== NE)
    ) {
      allowedShapes.push(NW);
    }
    disallowedShapes.push(SW, NE);
  }
  if (neighbour.south?.type === NE || neighbour.west?.type === NE) {
    allowedShapes.push(SW);
    if (
      !force &&
      (neighbour.north?.type !== SE || neighbour.east?.type !== NW)
    ) {
      allowedShapes.push(NE);
    }
    disallowedShapes.push(SE, NW);
  }
  return allowedShapes.filter(
    (allowedShape) => !disallowedShapes.includes(allowedShape)
  );
};

/**
 * try and find a matching shape
 */
const marry = (seed: number) => (
  matrix: matrixType,
  force?: boolean
): matrixType => {
  const { NW, NE, SE, SW } = settings.shapes;
  const shapes = [] as shapeType[];
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
      // check is married and not in conflict, if OK leave alone
      // if not married try and find not conflicted marriage
      // if married by conflicted, try and find alternative
      const isMarried = getIsMarried(shape.type, neighbour);
      const isInConflict = getIsInConflict(shape.type, neighbour);
      // if (horizontalIndex === 0 && verticalIndex === 1) {
      //   console.log(
      //     isMarried,
      //     isInConflict,
      //     neighbour,
      //     getEligibleShapes(shape.type, neighbour, force)
      //   );
      //   mutatableMatrix[verticalIndex][horizontalIndex].color = "red";
      // }
      if (!isMarried || (isMarried && isInConflict)) {
        eligibleShapes = getEligibleShapes(shape.type, neighbour, force);
      }
      if (isInConflict && eligibleShapes.length < 1) {
        mutatableMatrix[verticalIndex][horizontalIndex].isBlocked = true;
      }
      if (eligibleShapes.length > 0) {
        mutatableMatrix[verticalIndex][horizontalIndex].type =
          eligibleShapes[
            prng(horizontalIndex, verticalIndex, eligibleShapes.length, seed)
          ];
        mutatableMatrix[verticalIndex][horizontalIndex].isBlocked = false;
      } else {
        // mutatableMatrix[verticalIndex][horizontalIndex].color = "red";
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
                isBlocked: false,
              },
            ];
          }, []),
      ];
    }, []);
  const marryMatrix = marry(seed);
  marryMatrix(marryMatrix(marryMatrix(marryMatrix(matrix))), true).forEach(
    (rows, verticalIndex) => {
      rows.forEach((shape, horizontalIndex) => {
        const x = horizontalIndex * settings.size[0];
        const y = verticalIndex * settings.size[1];
        log.add(shape);
        // draw the shape on canvas
        drawShapeWithCtx(x, y, shape);
      });
    }
  );
  log.show();
};
