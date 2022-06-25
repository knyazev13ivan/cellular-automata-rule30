const renderRule30 = (
  ctx: CanvasRenderingContext2D,
  color: string,
  mtx: Array<Array<number>>,
  size: number,
  initYPos: number
) => {
  ctx.fillStyle = color;

  for (let row = 0; row < mtx.length; row++) {
    for (let i = 0; i < mtx[0].length; i++) {
      if (mtx[row][i]) {
        const x = i * size
        const y = initYPos + row * size

        ctx.fillRect(x, y, size - 1, size - 1)
      }
    }
  }
};

export default renderRule30;
