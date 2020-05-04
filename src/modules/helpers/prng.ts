const prng = (
  x: number,
  y: number,
  maximum: number,
  seed: number
) => {
  // this basically tries to make a predictable Math.random()
  const prng1 = ((parseInt(`${x * 33}${y * 84}`) * seed) % 100) / 100;
  const prng2 = ((parseInt(`${x * 29}${y * 51}`) * seed) % 100) / 100;
  return Math.floor(((prng1 + prng2) / 2) * maximum);
};

export default prng;