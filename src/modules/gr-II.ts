import returnSeed from "./helpers/returnSeed";
/**
 * Rules
 * 1. should form chevrons
 * 2. point up, down, left, right
 * 3. broken into 4 quarters, colours are opposite in adjacent sectors
 * 4. can't use same chevron in neighbor square
 * 5. each square alternates between either up/down or left/right
 */
// types
type shapeType = "N" | "E" | "S" | "W";
type shapeObjType = {
  type: shapeType;
  color?: string;
};
type matrixType = shapeType[][];
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
  size: [50, 50], // width, height
  grid: [16, 16], // horizontal, vertical
};

const intFromSeed = (
  x: number, // int
  y: number,
  maximum: number,
  seed: number
) => {
  // this basically tries to make a predictable Math.random()
  const prng1 = ((parseInt(`${x * 33}${y * 84}`) * seed) % 100) / 100;
  const prng2 = ((parseInt(`${x * 29}${y * 51}`) * seed) % 100) / 100;
  return Math.floor(((prng1 + prng2) / 2) * maximum);
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
    default:
      break;
  }
  ctx.fillStyle = shape.color;

  ctx.fill();
  ctx.closePath();
};

const shapeType = (
  horizontalIndex: number,
  verticalIndex: number,
  currentGrid: shapeType[][],
  seed: number
) => {
  let availableShapes: shapeType[] = [N, E, S, W];
  const verts: shapeType[] = [N, S];
  const horiz: shapeType[] = [W, E];
  const previousShape =
    horizontalIndex > 0
      ? currentGrid[verticalIndex][horizontalIndex - 1]
      : null;
  const aboveShape =
    verticalIndex > 0 ? currentGrid[verticalIndex - 1][horizontalIndex] : null;
  if (previousShape != null) {
    availableShapes = verts.includes(previousShape) ? horiz : verts;
  } else if (aboveShape != null) {
    availableShapes = verts.includes(aboveShape) ? horiz : verts;
  }
  return availableShapes[
    intFromSeed(horizontalIndex, verticalIndex, availableShapes.length, seed)
  ];
};

const returnColourFromCoords = (x: number, y: number) => {
  if (
    (x >= settings.grid[0] / 2 && y < settings.grid[1] / 2) ||
    (x < settings.grid[0] / 2 && y >= settings.grid[1] / 2)
  ) {
    return settings.blue;
  }
  return settings.red;
};

const draw = (
  matrix: matrixType,
  drawShapeWithCtx: (x: number, y: number, obj: shapeObjType) => void
) => {
  matrix.forEach((rows, verticalIndex) => {
    rows.forEach((shape, horizontalIndex) => {
      const x = horizontalIndex * settings.size[0];
      const y = verticalIndex * settings.size[1];
      // draw the shape on canvas
      drawShapeWithCtx(x, y, {
        type: shape,
        color: returnColourFromCoords(horizontalIndex, verticalIndex),
      });
    });
  });
};

const init = (seedString: string) => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.width = 800;
  canvas.height = 800;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const seed = returnSeed(seedString);
  const drawShapeWithCtx = drawChevrons(
    ctx,
    settings.size[0],
    settings.size[1]
  );

  const matrix: matrixType = Array(settings.grid[1])
    .fill(null)
    .reduce((rows, _, verticalIndex) => {
      return [
        ...rows,
        Array(settings.grid[0])
          .fill(null)
          .reduce((cells, _, horizontalIndex) => {
            const shape = shapeType(
              horizontalIndex,
              verticalIndex,
              [...rows, cells],
              seed
            );
            return [...cells, shape];
          }, []),
      ];
    }, []);

  draw(matrix, drawShapeWithCtx);
};

export default init;
