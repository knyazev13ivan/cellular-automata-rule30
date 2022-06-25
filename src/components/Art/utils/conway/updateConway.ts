import { TMatrix2D } from "../initMatrixs";

const updateConway = (
  mtx: TMatrix2D,
  toggle: number,
  lastRowOfRule30: Array<number>
) => {
  const newRow = lastRowOfRule30.map((e) => (e === 1 ? 63 : 0));

  mtx[toggle].pop();
  mtx[toggle].push(newRow);

  let count = 0;

  for (let row = 0; row < mtx[toggle].length; row++) {
    for (let i = 0; i < mtx[toggle][0].length; i++) {
      count = 0;

      // верхние 3 окружающих клетки
      if (mtx[toggle][row - 1]) {
        if (mtx[toggle][row - 1][i - 1] === 63) count++;
        if (mtx[toggle][row - 1][i] === 63) count++;
        if (mtx[toggle][row - 1][i + 1] === 63) count++;
      }

      // 2 клетки по середине
      if (mtx[toggle][row][i - 1] === 63) count++;
      if (mtx[toggle][row][i + 1] === 63) count++;

      // нижние 3 окружающих клетки
      if (mtx[toggle][row + 1]) {
        if (mtx[toggle][row + 1][i - 1] === 63) count++;
        if (mtx[toggle][row + 1][i] === 63) count++;
        if (mtx[toggle][row + 1][i + 1] === 63) count++;
      }

      // сохранение или появление клетки
      switch (count) {
        case 3:
          mtx[1 - toggle][row][i] = 63;
          break;
        case 2:
          mtx[1 - toggle][row][i] = mtx[toggle][row][i];
          break;
        default:
          if (mtx[toggle][row][i] < 2) {
            mtx[1 - toggle][row][i] = mtx[toggle][row][i]
          } else {
            mtx[1 - toggle][row][i] = mtx[toggle][row][i] - 1
          }
          break;
      }
    }
  }
};

export default updateConway;
