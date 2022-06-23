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

  let ctx: CanvasRenderingContext2D;
  let requestID = useRef<number>(0);

  const colors = useAppSelector((state) => state.colors);

  let rule30Mtx: TMatrix2D, conwayMtx: TMatrix2D;
  const cellSize = 10;
  const percent = 0.3;
  const rule30Color = "#aa7000";

  let toggleMtx = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    canvasContextRef.current = canvas!.getContext("2d");
    ctx = canvasContextRef.current!;

    const width = containerRef.current?.offsetWidth!;
    const height = containerRef.current?.offsetHeight!;
    console.log("effect");

    [rule30Mtx, conwayMtx] = initMatrixs(width, height, cellSize, percent);

    requestID.current = window.requestAnimationFrame((stampTime: number) =>
      animate(stampTime)
    );

    return () => window.cancelAnimationFrame(requestID.current);
  }, []);

  let prevTime = 0;
  let deltaTime = 0;
  const maxInterval = 40;

  const animate = (currentTime: number) => {
    deltaTime = currentTime - prevTime;

    if (deltaTime < maxInterval) {
      toggleMtx = 1 - toggleMtx;

      updateRule30(rule30Mtx, toggleMtx);
      updateConway(conwayMtx, toggleMtx);
      renderRule30(ctx, rule30Color, rule30Mtx[toggleMtx]);
      renderConway(
        ctx,
        colors,
        conwayMtx[toggleMtx],
        rule30Mtx[toggleMtx][rule30Mtx.length - 1]
      );

      ctx.fillStyle = "#bc4256";
      ctx.fillRect(20, 20, 30, 30);

      // console.log('run');
    }

    prevTime = currentTime;

    requestID.current = requestAnimationFrame((stampTime: number) =>
      animate(stampTime)
    );
  };

  console.log("rule30 render");

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={containerRef.current?.offsetWidth!}
        height={containerRef.current?.offsetHeight!}
      ></canvas>
    </div>
  );
};

export default Art;
