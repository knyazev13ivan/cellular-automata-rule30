const renderConway = (
  ctx: CanvasRenderingContext2D,
  colors: string[],
  mtx: number[][],
  size: number
) => {
  for (let row = 0; row < mtx.length - 1; row++) {
    for (let i = 0; i < mtx[0].length; i++) {
      const colorIndex = mtx[row][i];

      if (colorIndex > 1) {
        ctx.fillStyle = colors[colorIndex];

        const x = i * size;
        const y = row * size + size + 2;

        ctx.fillRect(x, y, size - 1, size - 1);
        // ctx.fillRect(x, y, size, size);
      }
    }
  }
};

export default renderConway;
