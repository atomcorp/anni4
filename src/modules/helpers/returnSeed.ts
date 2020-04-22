import seedrandom from "seedrandom";

const returnSeed = (inputValue: string): number => {
  if (inputValue.length > 0) {
    const seed = seedrandom(inputValue);
    return seed();
  }
  const seed = seedrandom();
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
