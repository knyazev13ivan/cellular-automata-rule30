export type TMatrix2D = Array<Array<Array<number>>>;

const initMatrixs = (
  width: number,
  height: number,
  cellSize: number,
  percent: number
): [Array<Array<number>>, TMatrix2D] => {
  console.log(width);

  const rowSize = Math.floor(width / cellSize);
  const colSizeRule30 = Math.floor((height / cellSize) * percent);
  const colSizeConway = Math.floor((height / cellSize) * (1 - percent));

  const rule30 = 
      new Array(colSizeRule30)
        .fill(null)
        .map((cell) => new Array(rowSize).fill(0))

  const middleIndexOfBottomRow = Math.floor(rule30[0].length / 2)
  rule30[rule30.length - 1][middleIndexOfBottomRow] = 1

  const conway = new Array(2)
    .fill(null)
    .map((row) =>
      new Array(colSizeConway)
        .fill(null)
        .map((cell) => new Array(rowSize).fill(0))
    );

  return [rule30, conway];
};

export default initMatrixs;
