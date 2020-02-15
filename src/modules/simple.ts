export default function() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "red";
  ctx.fillRect(10, 10, 150, 100);
}
