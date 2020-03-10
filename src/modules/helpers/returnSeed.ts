import seedrandom from "seedrandom";

const returnSeed = (): number => {
  const input = document.getElementById("seed") as HTMLInputElement;
  if (input.value.length > 3) {
    const seed = new seedrandom(input.value);
    return seed();
  }
  const seed = new seedrandom();
  return seed();
};

export const seedBool = (seed: number, x: number, y: number) => {
  return (
    Math.round(seed / parseInt(`${x}${y}`) / (parseInt(`${x}${y}`) / seed)) %
      2 ===
    0
  );
};

export default returnSeed;
