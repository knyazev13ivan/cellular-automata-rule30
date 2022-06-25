import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../app/hooks";
import styles from "./Art.module.css";
import initMatrixs, { TMatrix2D } from "./utils/initMatrixs";
import renderConway from "./utils/conway/renderConway";
import renderRule30 from "./utils/rule30/renderRule30";
import updateConway from "./utils/conway/updateConway";
import updateRule30 from "./utils/rule30/updateRule30";

const Art = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const colorsState = useAppSelector((state) => state.colors);

  const colors = [
    "rgb(24, 24, 24)",
    "rgb(70, 1, 102)",
    "rgb(84, 1, 115)",
    "rgb(98, 1, 130)",
    "rgb(111, 1, 142)",
    "rgb(126, 0, 156)",
    "rgb(139, 1, 170)",
    "rgb(154, 1, 184)",
    "rgb(166, 0, 196)",
    "rgb(181, 0, 211)",
    "rgb(195, 1, 224)",
    "rgb(209, 0, 239)",
    "rgb(221, 0, 249)",
    "rgb(222, 1, 243)",
    "rgb(224, 2, 238)",
    "rgb(225, 2, 232)",
    "rgb(226, 2, 226)",
    "rgb(227, 3, 219)",
    "rgb(229, 4, 214)",
    "rgb(230, 5, 208)",
    "rgb(231, 5, 202)",
    "rgb(232, 5, 195)",
    "rgb(234, 7, 190)",
    "rgb(235, 7, 184)",
    "rgb(236, 7, 178)",
    "rgb(237, 8, 171)",
    "rgb(239, 9, 166)",
    "rgb(240, 10, 160)",
    "rgb(241, 10, 154)",
    "rgb(242, 10, 147)",
    "rgb(244, 11, 142)",
    "rgb(245, 12, 136)",
    "rgb(245, 12, 130)",
    "rgb(247, 13, 123)",
    "rgb(248, 14, 118)",
    "rgb(250, 15, 112)",
    "rgb(250, 15, 106)",
    "rgb(252, 15, 99)",
    "rgb(253, 16, 94)",
    "rgb(255, 17, 88)",
    "rgb(255, 20, 83)",
    "rgb(255, 31, 81)",
    "rgb(255, 41, 80)",
    "rgb(255, 52, 78)",
    "rgb(255, 61, 76)",
    "rgb(255, 71, 74)",
    "rgb(255, 81, 73)",
    "rgb(255, 92, 71)",
    "rgb(255, 101, 69)",
    "rgb(255, 112, 67)",
    "rgb(255, 122, 66)",
    "rgb(255, 132, 64)",
    "rgb(255, 141, 62)",
    "rgb(255, 152, 60)",
    "rgb(255, 162, 59)",
    "rgb(255, 173, 57)",
    "rgb(255, 182, 55)",
    "rgb(255, 193, 53)",
    "rgb(255, 202, 52)",
    "rgb(255, 213, 50)",
    "rgb(255, 222, 47)",
    "rgb(255, 231, 46)",
    "rgb(255, 231, 46)",
    "rgb(255, 255, 255)",
  ];

  let rule30Mtx: Array<Array<number>>;
  let conwayMtx: TMatrix2D;
  let width = containerRef.current?.offsetWidth || 500;
  let height = containerRef.current?.offsetHeight || 400;

  const cellSize = 5;
  const percent = 0.2;
  const rule30Color = "#ffffff";

  let ctx: CanvasRenderingContext2D;
  let requestID = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvasContextRef.current = canvas!.getContext("2d");
    ctx = canvasContextRef.current!;

    [rule30Mtx, conwayMtx] = initMatrixs(width, height, cellSize, percent);

    requestID.current = window.requestAnimationFrame((stampTime: number) =>
      animate()
    );

    return () => window.cancelAnimationFrame(requestID.current);
  }, [width, height]);

  let toggleMtx = 0;

  const animate = () => {
    ctx.clearRect(0, 0, width, height);

    toggleMtx = 1 - toggleMtx;

    updateRule30(rule30Mtx);
    updateConway(conwayMtx, toggleMtx, rule30Mtx[0]);

    renderRule30(
      ctx,
      rule30Color,
      rule30Mtx,
      cellSize,
      Math.floor(height * (1 - percent))
    );

    renderConway(ctx, colors, conwayMtx[toggleMtx], cellSize);

    requestID.current = requestAnimationFrame((stampTime: number) => animate());
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={width}
        height={height}
      ></canvas>
    </div>
  );
};

export default Art;
