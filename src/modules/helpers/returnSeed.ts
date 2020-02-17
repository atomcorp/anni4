import seedrandom from "seedrandom";

const returnSeed = (): number => {
  const input = document.getElementById("seed") as HTMLInputElement;
  if (input.value.length > 3) {
    const seed = new seedrandom(input.value);
    return seed.int32();
  }
  const seed = new seedrandom();
  return seed.int32();
};

export const seedBool = (seed: number, x: number, y: number) => {
  return Math.round(seed / parseInt(`${x}${y}`)) % 2 === 0;
};

export default returnSeed;
