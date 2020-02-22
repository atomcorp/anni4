import returnMatrix from "./helpers/returnMatrix";
import returnSeed from "./helpers/returnSeed";

const bkg = "#04b27a";
const clrone = "#bbc5b4";
const clrtwo = "#80948f";

const BLANK = "BLANK"; // void
const NW = "NW"; // north west
const NE = "NE"; // north east
const SE = "SE"; // south east
const SW = "SW"; // south west
const SIZE = {
  HEIGHT: 50,
  WIDTH: 50
};
const grid = { horizontal: 10, vertical: 10 };
const colors: shapeColorType[] = [clrone, clrtwo];
type shapeType = "BLANK" | "NW" | "NE" | "SE" | "SW";
type clroneType = "#bbc5b4";
type clrtwoType = "#80948f";
type shapeColorType = clroneType | clrtwoType;
type shapeObjType = {
  type: shapeType;
  color: shapeColorType;
};

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
      ++rank.down;
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
      ++rank.up;
      break;
    case BLANK:
      ++rank.blank;
    default:
      break;
  }
  ctx.fillStyle = shape.color;
  ctx.fill();
  ctx.closePath();
};

const intFromSeed = (
  seed: number,
  x: number,
  y: number,
  shapesLength: number
) => {
  return (
    Math.round(
      seed /
        parseInt(`${x + 3}${y + 8}`) /
        (parseInt(`${x + 2}${y + 5}`) / seed)
    ) % shapesLength
  );
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

  // const matrix: [shapeType[]] = [[]];
  const returnShape = (
    horizontalIndex: number,
    verticalIndex: number,
    currentGrid
  ): shapeObjType => {
    // rules?
    // 1. a triangle is never broken up, not start or end
    // 2. the chance of a having a blank depends on the row
    //    some rows can have 1 blank, others can have 6
    //    therefore in each row there are a finite amount of blanks
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
    let shapesPool: shapeType[] = [BLANK, NE, SE, NE, SE];
    // are there any shapes to the left
    if (previousShape != null) {
      // must form triangles
      // shape to the left is NE or SE, next must be NW or SW
      if (previousShape.type === NE) {
        return {
          type: NW,
          color: previousShape.color
        };
      } else if (previousShape.type === SE) {
        return {
          type: SW,
          color: previousShape.color
        };
      }
    }
    // are there any shapes above that break the rules?
    if (aboveNextShape != null) {
      if (
        aboveNextShape.type === SE ||
        aboveNextShape.type === SW ||
        aboveShape.type === SE ||
        aboveShape.type === SW
      ) {
        shapesPool = shapesPool.filter(shape => shape !== NE);
      } else {
        // we remove a lot of NE, so lets inject some back in
        shapesPool = [NE, ...shapesPool, NE];
      }
    }
    // if last in row, stop incomplete triangles
    if (horizontalIndex === grid.horizontal - 1) {
      shapesPool = shapesPool.filter(shape => shape !== NE && shape !== SE);
    }
    return {
      type:
        shapesPool[
          intFromSeed(seed, horizontalIndex, verticalIndex, shapesPool.length)
        ],
      color:
        colors[intFromSeed(seed, horizontalIndex, verticalIndex, colors.length)]
    };
  };

  // this creates
  const matrix: [shapeType[]] = Array(grid.vertical)
    .fill(null)
    .reduce((rows, _, verticalIndex) => {
      return [
        ...rows,
        Array(grid.horizontal)
          .fill(null)
          .reduce((cells, _, horizontalIndex) => {
            const x = horizontalIndex * SIZE.WIDTH;
            const y = verticalIndex * SIZE.HEIGHT;
            const shape = returnShape(horizontalIndex, verticalIndex, [
              ...rows,
              cells
            ]);
            // draw the shape on canvas
            drawShapeWithCtx(x, y, shape);
            // keep logging the matrix
            return [...cells, shape];
          }, [])
      ];
    }, []);
  console.log(rank);
}
