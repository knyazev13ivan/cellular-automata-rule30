const updateRule30 = (mtx: Array<Array<number>>) => {
  mtx.shift();

  const newRow = new Array(mtx[0].length).fill(0);

  for (let i = 0; i < mtx[0].length; i++) {
    const lastRow = mtx.length - 1;
    const mask = `${mtx[lastRow][i - 1] || 0}${mtx[lastRow][i]}${
      mtx[lastRow][i + 1] || 0
    }`;

    if (mask === "100" || mask === "011" || mask === "010" || mask === "001") {
      newRow[i] = 1;
    }

    if (mtx[lastRow][0] === 1 && mtx[lastRow - 1][0] === 1) newRow[0] = 0;
  }

  mtx.push(newRow);
};

export default updateRule30;
