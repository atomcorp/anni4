const returnMatrix = (
  horizontalLength: number,
  verticalLength: number,
  callback: (x: number, y: number) => void
) => {
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

export default function (seedString: string) {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.width = 500;
  canvas.height = 500;
  canvas.style.backgroundColor = "";
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const SIZE = 50;
  const grid = [10, 10];
  const drawTriangle = (x: number, y: number) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + SIZE, y);
    ctx.lineTo(x, y + SIZE);
    ctx.fill();
    ctx.closePath();
  };

  ctx.beginPath();
  returnMatrix(
    grid[0],
    grid[1],
    (verticalIndex: number, horizontalIndex: number) => {
      drawTriangle(verticalIndex * SIZE, horizontalIndex * SIZE);
    }
  );
}
