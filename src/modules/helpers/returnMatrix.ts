const returnMatrix = (
  horizontalLength: number,
  verticalLength: number,
  callback: (verticalIndex: number, horizontalIndex: number) => void
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

export default returnMatrix;
