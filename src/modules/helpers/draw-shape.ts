type shapeObjType = {
  type: string;
  color?: string;
};

type settingsType = {
  shapes: {
    [key:string]: string;
  };
  size: number[];
}

const drawShape = (
  ctx: CanvasRenderingContext2D,
  settings: settingsType
): ((x: number, y: number, shape: shapeObjType) => void) => (
  x: number,
  y: number,
  shape
) => {
  const { NW, NE, SE, SW } = settings.shapes;
  const [width, height] = settings.size;
  ctx.beginPath();

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

export default drawShape;