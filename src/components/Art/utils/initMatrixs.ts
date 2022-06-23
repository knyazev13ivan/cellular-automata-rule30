export type TMatrix2D = Array<Array<Array<number>>>;

const initMatrixs = (
  width: number,
  height: number,
  cellSize: number,
  percent: number
): TMatrix2D[] => {
  console.log(width);

  const rowSize = Math.floor(width / cellSize);
  const colSizeRule30 = Math.floor((height / cellSize) * percent);
  const colSizeConway = Math.floor((height / cellSize) * (1 - percent));

  const rule30 = new Array(2)
    .fill(null)
    .map((row) =>
      new Array(colSizeRule30)
        .fill(null)
        .map((cell) => new Array(rowSize).fill("#333333"))
    );
  const conway = new Array(2)
    .fill(null)
    .map((row) =>
      new Array(colSizeConway)
        .fill(null)
        .map((cell) => new Array(rowSize).fill("#333333"))
    );

  return [rule30, conway];
};

export default initMatrixs;
