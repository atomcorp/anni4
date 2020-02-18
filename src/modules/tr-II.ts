import returnMatrix from "./helpers/returnMatrix";
import returnSeed from "./helpers/returnSeed";

const bkg = "#04b27a";
const clrone = "#bbc5b4";
const clrtwo = "#80948f";

const BLANK = "0000"; // void
const NW = "1000"; // north west
const NE = "0100"; // north east
const SE = "0010"; // south east
const SW = "0001"; // south west
const SIZE = {
  HEIGHT: 50,
  WIDTH: 50
};
const grid = { horizontal: 10, vertical: 10 };

type shapeType = "0000" | "1000" | "0100" | "0010" | "0001" | "0011" | "1100";

const drawShape = (
  ctx: CanvasRenderingContext2D
): ((x: number, y: number, shape: shapeType) => void) => (
  x: number,
  y: number,
  shape
) => {
  ctx.beginPath();
  switch (shape) {
    case NW:
      ctx.moveTo(x, y);
      ctx.lineTo(x + SIZE.WIDTH, y);
      ctx.lineTo(x, y + SIZE.WIDTH);
      ctx.fillStyle = clrone;
      break;
    case NE:
      ctx.moveTo(x, y);
      ctx.lineTo(x + SIZE.WIDTH, y);
      ctx.lineTo(x + SIZE.WIDTH, y + SIZE.HEIGHT);
      ctx.fillStyle = clrone;
      break;
    case SE:
      ctx.moveTo(x, y + SIZE.HEIGHT);
      ctx.lineTo(x + SIZE.WIDTH, y + SIZE.HEIGHT);
      ctx.lineTo(x + SIZE.WIDTH, y);
      ctx.fillStyle = clrtwo;
      break;
    case SW:
      ctx.moveTo(x, y + SIZE.HEIGHT);
      ctx.lineTo(x + SIZE.HEIGHT, y + SIZE.HEIGHT);
      ctx.lineTo(x, y);
      ctx.fillStyle = clrtwo;
      break;
    case BLANK:
    default:
      break;
  }
  ctx.fill();
  ctx.closePath();
};

const shapeFromSeed = (
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

const smooth = () => {};

export default function() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.style.backgroundColor = bkg;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const seed = returnSeed();
  const drawShapeWithCtx = drawShape(ctx);

  // const matrix: [shapeType[]] = [[]];
  const returnShape = (
    horizontalIndex: number,
    verticalIndex: number,
    previousShape: shapeType | null,
    aboveShape: shapeType | null
  ): shapeType => {
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
    let shapes: shapeType[] = [BLANK, NW, NE, SE, SW];
    // are there any shapes to the left
    if (previousShape != null) {
      // must form triangles
      // shape to the left is NE or SE, next must be NW or SW
      if (previousShape === NE) {
        return NW;
      } else if (previousShape === SE) {
        return SW;
      }
    }
    // are there any shapes above
    if (aboveShape != null) {
      // don't form triangles, remove any shapes that can form them
      if (aboveShape === SE) {
        shapes = shapes.filter(shape => shape !== NE);
      }
      if (aboveShape === SW) {
        shapes = shapes.filter(shape => shape !== NW);
      }
    }

    // if last in row, stop incomplete triangles
    return shapes[
      shapeFromSeed(seed, horizontalIndex, verticalIndex, shapes.length - 1)
    ];
  };

  // drawShapeWithCtx(x, y, shape);

  const matrix: [shapeType[]] = Array(grid.vertical)
    .fill(null)
    .reduce((rows, _, verticalIndex) => {
      return [
        ...rows,
        Array(grid.horizontal)
          .fill(null)
          .reduce((cells, _, horizontalIndex) => {
            const previousShape =
              horizontalIndex > 0 ? cells[horizontalIndex - 1] : null;
            const aboveShape =
              verticalIndex > 0 ? rows[verticalIndex - 1] : null;
            return [
              ...cells,
              returnShape(
                horizontalIndex,
                verticalIndex,
                previousShape,
                aboveShape
              )
            ];
          }, [])
      ];
    }, []);

  returnMatrix(
    grid.horizontal,
    grid.vertical,
    (verticalIndex, horizontalIndex) => {
      const x = horizontalIndex * SIZE.WIDTH;
      const y = verticalIndex * SIZE.HEIGHT;
      drawShapeWithCtx(x, y, matrix[verticalIndex][horizontalIndex]);
    }
  );
}
