const returnMatrix = (horizontalLength, verticalLength, callback) => {
  Array(verticalLength)
    .fill(null)
    .forEach((_, verticalIndex) => {
      Array(horizontalLength)
        .fill(null)
        .forEach((_, horizontalIndex) => {
          callback(verticalIndex, horizontalIndex);
        });
    });
};

export default function() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const SIZE = 100;
  const grid = [5, 5];
  const drawTriangle = (x: number, y: number) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + SIZE, y);
    ctx.lineTo(x, y + SIZE);
    ctx.fill();
    ctx.closePath();
  };

  ctx.beginPath();
  returnMatrix(grid[0], grid[1], (verticalIndex, horizontalIndex) => {
    drawTriangle(verticalIndex * SIZE, horizontalIndex * SIZE);
  });
}
