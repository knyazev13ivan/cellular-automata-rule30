import React, { useEffect, useRef } from "react";
import styles from "./Art.module.css";
import initMatrixs from "./utils/initMatrixs";
import renderConway from "./utils/conway/renderConway";
import renderRule30 from "./utils/rule30/renderRule30";
import updateConway from "./utils/conway/updateConway";
import updateRule30 from "./utils/rule30/updateRule30";
import { useAppSelector } from "../../app/hooks";

const Art = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const widthRef = useRef<number>(500);
  const heightRef = useRef<number>(450);

  const colors = useAppSelector((state) => state.colors.colors);
  const colorsRef = useRef<string[]>(colors);
  colorsRef.current = colors;

  const cellSize = 4;
  const percent = 0.2;
  const rule30Color = "#999999";

  const rule30Mtx = useRef<any>(null);
  const conwayMtx = useRef<any>(null);

  const requestID = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvasContextRef.current = canvas!.getContext("2d");
    const ctx = canvasContextRef.current!;

    widthRef.current = containerRef.current?.offsetWidth!;
    heightRef.current = containerRef.current?.offsetHeight!;
    const width = widthRef.current;
    const height = heightRef.current;

    if (rule30Mtx.current === null) {
      [rule30Mtx.current, conwayMtx.current] = initMatrixs(
        width,
        height,
        cellSize,
        percent
      );
    }

    let toggleMtx = 0;

    const animate = (): void => {
      ctx.clearRect(0, 0, width, height);

      updateRule30(rule30Mtx.current);

      toggleMtx = 1 - toggleMtx;
      updateConway(conwayMtx.current, toggleMtx, rule30Mtx.current[0]);

      const yPos = Math.floor(height * (1 - percent));
      renderRule30(ctx, rule30Color, rule30Mtx.current, cellSize, yPos);

      renderConway(
        ctx,
        colorsRef.current,
        conwayMtx.current[toggleMtx],
        cellSize
      );

      requestID.current = requestAnimationFrame(() => animate());
    };

    animate();

    return () => window.cancelAnimationFrame(requestID.current);
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={widthRef.current}
        height={heightRef.current}
      ></canvas>
    </div>
  );
};

export default Art;
