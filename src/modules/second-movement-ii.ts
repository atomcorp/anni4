/**
 * 
 * Yellow Meander - 1970 // Eclat
 * 
 * Rules
 * 1. one line
 * 2. only ever 
 */

import returnSeed from "./helpers/returnSeed";

type shapeType = "BLANK" | "NW" | "NE" | "SE" | "SW";
type shapeColorType = "#333" | "#feb507";
type shapeObjType = {
  type: shapeType;
  color?: shapeColorType;
};
const options = {
  tileSizeInPixels: {
    height: 25,
    width: 25,
  },
  gridSizeInTilesAmount: {
    horizontal: 40,
    vertical: 40,
  },
  tiles: {
    NW: "NW",
    NE: "NE",
    SE: "SE",
    SW: "SW",
  },
};

/**
 * Draw a shape at the provided [x,y] coordinates
 */
const drawShape = (
  ctx: CanvasRenderingContext2D
): ((x: number, y: number, shape: shapeObjType) => void) => (
  x: number,
  y: number,
  shape
) => {
  ctx.beginPath();
  const { NW, NE, SE, SW } = options.tiles;
  const { height, width } = options.tileSizeInPixels;
  switch (shape.type) {
    case NW:
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x, y + width);
      break;
    case NE:
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x + width, y + height);
      break;
    case SE:
      ctx.moveTo(x, y + height);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x + width, y);
      break;
    case SW:
      ctx.moveTo(x, y + height);
      ctx.lineTo(x + height, y + height);
      ctx.lineTo(x, y);
      break;
    default:
      break;
  }
  ctx.fillStyle = shape.color;
  ctx.fill();
  ctx.closePath();
};


export default (seedString: string) => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.width = 1000;
  canvas.height = 1000;
  canvas.style.backgroundColor = "white";
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const seed = returnSeed(seedString);
};
