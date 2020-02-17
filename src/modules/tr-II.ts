import returnMatrix from "./helpers/returnMatrix";
import returnSeed, { seedBool } from "./helpers/returnSeed";

const bkg = "#04b27a";
const clrone = "#bbc5b4";
const clrtwo = "#80948f";

// TODO: use seed

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
  const SIZE = {
    HEIGHT: 25,
    WIDTH: 50
  };
  const STEPS = 25;
  const grid = { horizontal: 10, vertical: 20 }; // [horizontal]
  const drawUpTriangle = (x, y) => {
    ctx.moveTo(x, y + SIZE.HEIGHT);
    ctx.lineTo(x + SIZE.WIDTH, y + SIZE.HEIGHT);
    ctx.lineTo(x + SIZE.WIDTH / 2, y);
  };
  const drawDownTriangle = (x, y) => {
    ctx.moveTo(x, y);
    ctx.lineTo(x + SIZE.WIDTH, y);
    ctx.lineTo(x + SIZE.WIDTH / 2, y + SIZE.HEIGHT);
  };
  const drawTriangle = (x: number, y: number) => {
    ctx.beginPath();
    const isInvert = seedBool(seed, x, y);
    if (isInvert) {
      drawUpTriangle(x, y);
    } else {
      drawDownTriangle(x, y);
    }
    ctx.fillStyle = isInvert ? clrone : clrtwo;
    // isInvert ? ctx.lineTo(x, y + SIZE) : ctx.lineTo(x, y);
    ctx.fill();
    ctx.closePath();
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
