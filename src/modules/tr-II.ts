import returnMatrix from "./helpers/returnMatrix";
import returnSeed from "./helpers/returnSeed";
import seededShuffle from "seededshuffle";

// (222 * 9301 + 49297) % 233280;

const bkg = "#04b27a";
const clrone = "#bbc5b4";
const clrtwo = "#80948f";

const BLANK = "BLANK"; // void
const NW = "NW"; // north west
const NE = "NE"; // north east
const SE = "SE"; // south east
const SW = "SW"; // south west
const SIZE = {
  HEIGHT: 25,
  WIDTH: 25
};
const grid = { horizontal: 20, vertical: 20 };
const colors: shapeColorType[] = [clrone, clrtwo];
type shapeType = "BLANK" | "NW" | "NE" | "SE" | "SW";
type clroneType = "#bbc5b4";
type clrtwoType = "#80948f";
type shapeColorType = clroneType | clrtwoType;
type shapeObjType = {
  type: shapeType;
  color?: shapeColorType;
};
type matrixType = shapeObjType[][];

const rank = {
  up: 0,
  down: 0,
  blank: 0
};

const drawShape = (
  ctx: CanvasRenderingContext2D
): ((x: number, y: number, shape: shapeObjType) => void) => (
  x: number,
  y: number,
  shape
) => {
  ctx.beginPath();

  switch (shape.type) {
    case NW:
      ctx.moveTo(x, y);
      ctx.lineTo(x + SIZE.WIDTH, y);
      ctx.lineTo(x, y + SIZE.WIDTH);
      break;
    case NE:
      ctx.moveTo(x, y);
      ctx.lineTo(x + SIZE.WIDTH, y);
      ctx.lineTo(x + SIZE.WIDTH, y + SIZE.HEIGHT);
      break;
    case SE:
      ctx.moveTo(x, y + SIZE.HEIGHT);
      ctx.lineTo(x + SIZE.WIDTH, y + SIZE.HEIGHT);
      ctx.lineTo(x + SIZE.WIDTH, y);
      break;
    case SW:
      ctx.moveTo(x, y + SIZE.HEIGHT);
      ctx.lineTo(x + SIZE.HEIGHT, y + SIZE.HEIGHT);
      ctx.lineTo(x, y);
      break;
    case BLANK:
    default:
      break;
  }
  ctx.fillStyle = shape.color;

  ctx.fill();
  ctx.closePath();
};

const intFromSeed = (
  seed: number, // float 0-1
  x: number, // int
  y: number,
  maximum: number
) => {
  // this basically tries to make a predictable Math.random()
  const prng1 = ((parseInt(`${x + 3}${y + 8}`) * seed) % 100) / 100;
  const prng2 = ((parseInt(`${x + 2}${y + 5}`) * seed) % 100) / 100;
  return Math.floor(((prng1 + prng2) / 2) * maximum);
};

const neighbourShapes = (matrix, horizontalIndex, verticalIndex) => {
  const previousShape: shapeObjType | null =
    horizontalIndex > 0 ? matrix[verticalIndex][horizontalIndex - 1] : null;
  const aboveNextShape: shapeObjType | null =
    horizontalIndex + 1 < grid.horizontal && verticalIndex > 0
      ? matrix[verticalIndex - 1][horizontalIndex + 1]
      : null;
  const aboveShape: shapeObjType | null =
    verticalIndex > 0 ? matrix[verticalIndex - 1][horizontalIndex] : null;
  const belowShape: shapeObjType | null =
    verticalIndex + 1 < grid.vertical
      ? matrix[verticalIndex + 1][horizontalIndex]
      : null;
  const belowNextShape: shapeObjType | null =
    verticalIndex + 1 < grid.vertical && horizontalIndex + 1 < grid.horizontal
      ? matrix[verticalIndex + 1][horizontalIndex + 1]
      : null;
  const nextShape: shapeObjType | null =
    horizontalIndex + 1 < grid.horizontal
      ? matrix[verticalIndex][horizontalIndex + 1]
      : null;
  return {
    previousShape,
    aboveNextShape,
    aboveShape,
    belowShape,
    belowNextShape,
    nextShape
  };
};

export default function() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.style.backgroundColor = bkg;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const seed = returnSeed();
  const drawShapeWithCtx = drawShape(ctx);
  rank.up = 0;
  rank.down = 0;
  rank.blank = 0;

  const generateShapePool = (): shapeType[] => {
    // get maximum number of cells (width * height)
    const maximumSize = grid.horizontal * grid.vertical;
    const multiplier = 0.22; // too low
    const blanksSize = intFromSeed(seed, 5, 8, maximumSize * multiplier) + 4;
    // add random number of blanks - 4-11%
    const maxiumSizeAfterBlanks = maximumSize - blanksSize;
    const shapePool = Array(maximumSize)
      .fill(null)
      .map((_, i) => {
        if (i <= maxiumSizeAfterBlanks / 2) {
          return NE;
        }
        if (i <= maxiumSizeAfterBlanks) {
          return SE;
        }
        return BLANK;
      });
    return seededShuffle.shuffle(shapePool, seed);
  };

  const shapePool = generateShapePool();
  const returnShape = (
    horizontalIndex: number,
    verticalIndex: number,
    currentGrid
  ): shapeObjType => {
    // rules?
    // 1. a triangle is never broken up, not start or end
    // 2. An up or down triangle can be either colour
    // 3. a diamond can never be formed
    // the width of a triangle must be "two", a gap can be "one"
    // how?
    // 1. get an array of all available shapes
    // 2. check conditions, if not allowed remove from list
    //    or, just return the only available option
    // 3. whatever is use seed to get random shape
    // create a new row
    const previousShape: shapeObjType | null =
      horizontalIndex > 0
        ? currentGrid[verticalIndex][horizontalIndex - 1]
        : null;
    const aboveShape: shapeObjType | null =
      verticalIndex > 0
        ? currentGrid[verticalIndex - 1][horizontalIndex]
        : null;
    // the shape to the ne of the current position
    const aboveNextShape: shapeObjType | null =
      horizontalIndex < grid.horizontal - 1 && verticalIndex > 0
        ? currentGrid[verticalIndex - 1][horizontalIndex + 1]
        : null;
    // double NE & SE so they appear more frequently
    let shapesPoolClone: shapeType[] = shapePool;
    // are there any shapes to the left
    if (previousShape != null) {
      // must form triangles
      // shape to the left is NE or SE, next must be NW or SW
      if (previousShape.type === NE) {
        ++rank.down;
        return {
          type: NW,
          color: previousShape.color
        };
      } else if (previousShape.type === SE) {
        ++rank.up;
        return {
          type: SW,
          color: previousShape.color
        };
      }
    }

    // if last in row, stop incomplete triangles
    if (horizontalIndex === grid.horizontal - 1) {
      shapesPoolClone = shapesPoolClone.filter(
        shape => shape !== NE && shape !== SE
      );
    }
    const index = horizontalIndex + verticalIndex * grid.horizontal;
    const difference = shapePool.length - shapesPoolClone.length;
    return {
      type: shapesPoolClone[Math.abs(index - difference)],
      color:
        colors[intFromSeed(seed, horizontalIndex, verticalIndex, colors.length)]
    };
  };

  const smooth = (matrix: matrixType): matrixType => {
    const mutatableMatrix = matrix;
    mutatableMatrix.forEach((row, verticalIndex) => {
      mutatableMatrix[verticalIndex].forEach((shape, horizontalIndex) => {
        const {
          previousShape,
          aboveShape,
          belowShape,
          belowNextShape,
          nextShape,
          aboveNextShape
        } = neighbourShapes(mutatableMatrix, horizontalIndex, verticalIndex);
        if (aboveShape != null) {
          // a diamond
          if (aboveShape.type === SE && shape.type === NE) {
            mutatableMatrix[verticalIndex][horizontalIndex] = {
              type: BLANK
            };
            return;
          }
          // is kissing starter
          if (aboveShape.type === SW && shape.type === NE) {
            mutatableMatrix[verticalIndex][horizontalIndex] = {
              type: BLANK
            };
            return;
          }
          // is kissing ender
          if (aboveShape.type === SE && shape.type === NW) {
            mutatableMatrix[verticalIndex][horizontalIndex] = {
              type: BLANK
            };
            mutatableMatrix[verticalIndex][horizontalIndex - 1] = {
              type: BLANK
            };
            return;
          }
        }
        if (previousShape != null) {
          // must form triangles
          // shape to the left is NE or SE, next must be NW or SW
          if (previousShape.type === NE) {
            mutatableMatrix[verticalIndex][horizontalIndex] = {
              type: NW,
              color: previousShape.color
            };
            return;
          }
          if (previousShape.type === SE) {
            mutatableMatrix[verticalIndex][horizontalIndex] = {
              type: SW,
              color: previousShape.color
            };
            return;
          }
          // stop leaving random right angles
          if (
            previousShape.type === BLANK &&
            (shape.type === NW || shape.type === SW)
          ) {
            mutatableMatrix[verticalIndex][horizontalIndex] = {
              type: BLANK
            };
            return;
          }
        }
        // 2 squares is blank, try and fill
        if (shape.type === BLANK && nextShape?.type === BLANK) {
          if (
            belowShape?.type !== NE &&
            belowShape?.type !== NW &&
            belowNextShape?.type !== NE
          ) {
            mutatableMatrix[verticalIndex][horizontalIndex] = {
              type: SE,
              color: shape.color
            };
            return;
          }
          if (
            aboveShape?.type !== SE &&
            aboveShape?.type !== SW &&
            aboveNextShape?.type !== SE
          ) {
            mutatableMatrix[verticalIndex][horizontalIndex] = {
              type: NE,
              color: shape.color
            };
            return;
          }
        }
      });
    });
    return mutatableMatrix;
  };

  const draw = (matrix: matrixType) => {
    matrix.forEach((rows, verticalIndex) => {
      rows.forEach((shape, horizontalIndex) => {
        const x = horizontalIndex * SIZE.WIDTH;
        const y = verticalIndex * SIZE.HEIGHT;
        // draw the shape on canvas
        drawShapeWithCtx(x, y, shape);
      });
    });
  };

  // this creates the 2d array containing the shapes
  const matrix: matrixType = Array(grid.vertical)
    .fill(null)
    .reduce((rows, _, verticalIndex) => {
      return [
        ...rows,
        Array(grid.horizontal)
          .fill(null)
          .reduce((cells, _, horizontalIndex) => {
            const shape = returnShape(horizontalIndex, verticalIndex, [
              ...rows,
              cells
            ]);
            return [...cells, shape];
          }, [])
      ];
    }, []);

  draw(smooth(smooth(matrix)));
  console.log(rank);
}
