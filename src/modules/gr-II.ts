import returnSeed from "./helpers/returnSeed";
/**
 * Rules
 * 1. should form chevrons
 * 2. point up, down, left, right
 * 3. broken into 4 quarters, colours are opposite in adjacent sectors
 * 4. can't use same chevron in neighbor square
 */
// types
type shapeType = "BLANK" | "N" | "E" | "S" | "W";
type shapeObjType = {
  type: shapeType;
  color?: string;
};
// consts
const BLANK = "BLANK";
const N = "N";
const E = "E";
const S = "S";
const W = "W";
// settings
const settings = {
  red: "#9b3b1b",
  blue: "#2b4990",
  width: [50, 50], // width, height
  grid: [10, 10] // horizontal, vertical
};

const drawChevrons = (
  ctx: CanvasRenderingContext2D,
  WIDTH: number,
  HEIGHT: number
): ((x: number, y: number, shape: shapeObjType) => void) => (
  x: number,
  y: number,
  shape
) => {
  ctx.beginPath();

  ctx.fillStyle = shape.color === "#9b3b1b" ? "#2b4990" : "#9b3b1b";
  ctx.fillRect(x, y, WIDTH, HEIGHT);
  switch (shape.type) {
    case N:
      ctx.moveTo(x, y + WIDTH / 2);
      ctx.lineTo(x + WIDTH / 2, y);
      ctx.lineTo(x + WIDTH, y + WIDTH / 2);
      ctx.lineTo(x + WIDTH, y + WIDTH);
      ctx.lineTo(x + WIDTH / 2, y + WIDTH / 2);
      ctx.lineTo(x, y + WIDTH);
      break;
    case E:
      ctx.moveTo(x, y);
      ctx.lineTo(x + WIDTH / 2, y);
      ctx.lineTo(x + WIDTH, y + HEIGHT / 2);
      ctx.lineTo(x + WIDTH / 2, y + HEIGHT);
      ctx.lineTo(x, y + HEIGHT);
      ctx.lineTo(x + WIDTH / 2, y + HEIGHT / 2);
      break;
    case S:
      ctx.moveTo(x, y);
      ctx.lineTo(x + WIDTH / 2, y + WIDTH / 2);
      ctx.lineTo(x + WIDTH, y);
      ctx.lineTo(x + WIDTH, y + WIDTH / 2);
      ctx.lineTo(x + WIDTH / 2, y + WIDTH);
      ctx.lineTo(x, y + WIDTH / 2);
      break;
    case W:
      ctx.moveTo(x, y + HEIGHT / 2);
      ctx.lineTo(x + HEIGHT / 2, y);
      ctx.lineTo(x + HEIGHT, y);
      ctx.lineTo(x + HEIGHT / 2, y + HEIGHT / 2);
      ctx.lineTo(x + HEIGHT, y + HEIGHT);
      ctx.lineTo(x + HEIGHT / 2, y + HEIGHT);
      break;
    case BLANK:
    default:
      break;
  }
  ctx.fillStyle = shape.color;

  ctx.fill();
  ctx.closePath();
};

const init = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const drawShapeWithCtx = drawChevrons(
    ctx,
    settings.width[0],
    settings.width[1]
  );
  const x = 0 * settings.width[0];
  const y = 0 * settings.width[1];
  // draw the shape on canvas
  drawShapeWithCtx(x, y, {
    type: "N",
    color: settings.blue
  });
  drawShapeWithCtx(1 * settings.width[0], 0 * settings.width[1], {
    type: "E",
    color: settings.blue
  });
  drawShapeWithCtx(2 * settings.width[0], 0 * settings.width[1], {
    type: "S",
    color: settings.red
  });
  drawShapeWithCtx(3 * settings.width[0], 0 * settings.width[1], {
    type: "W",
    color: settings.red
  });
};

export default init;
