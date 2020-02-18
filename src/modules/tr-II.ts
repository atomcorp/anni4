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
const ARROW_UP = "0011";
const ARROW_DN = "1100";
const SIZE = {
  HEIGHT: 50,
  WIDTH: 50
};
const grid = { horizontal: 10, vertical: 10 };

type shapeType = "0000" | "1000" | "0100" | "0010" | "0001" | "0011" | "1100";

const shapeLottery: shapeType[] = ["0000", "1000", "0100", "0010", "0001"];

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

const seedRemainder = (seed: number, x: number, y: number) => {
  return (
    Math.round(seed / parseInt(`${x}${y}`) / (parseInt(`${x}${y}`) / seed)) % 5
  );
};

const handleRowPlacement = () => {
  // rules
  // 1. a triangle is never broken up, not start or end
  // 2. the chance of a having a blank depends on the row
  //    some rows can have 1 blank, others can have 6
  //    therefore in each row there are a finite amount of blanks
  // 3. a diamond can never be formed
  // the width of a triangle must be "two", a gap can be "one"
};

export default function() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.style.backgroundColor = bkg;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const seed = returnSeed();
  const drawShapeWithCtx = drawShape(ctx);
  const drawUpTriangle = (x, y) => {
    // ctx.moveTo(x, y + SIZE.HEIGHT);
    // ctx.lineTo(x + SIZE.WIDTH, y + SIZE.HEIGHT);
    // ctx.lineTo(x + SIZE.WIDTH, y);
  };
  const drawDownTriangle = (x, y) => {
    ctx.moveTo(x, y);
    ctx.lineTo(x + SIZE.WIDTH, y);
    ctx.lineTo(x, y + SIZE.WIDTH);
  };
  const drawTriangle = (x: number, y: number) => {
    // ctx.beginPath();
    const shape = shapeLottery[seedRemainder(seed, x, y)];
    drawShapeWithCtx(x, y, shape);
    // isInvert ? ctx.lineTo(x, y + SIZE) : ctx.lineTo(x, y);
    // ctx.fill();
    // ctx.closePath();
  };

  ctx.beginPath();
  returnMatrix(
    grid.horizontal,
    grid.vertical,
    (verticalIndex, horizontalIndex) => {
      drawTriangle(horizontalIndex * SIZE.WIDTH, verticalIndex * SIZE.HEIGHT);
    }
  );
}
