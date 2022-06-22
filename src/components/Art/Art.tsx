import React, { useEffect, useRef } from "react";
import styles from "./Art.module.css";

const Art = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  let ctx: CanvasRenderingContext2D;
  let requestID = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvasContextRef.current = canvas!.getContext("2d");
    ctx = canvasContextRef.current!;

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
      // updateRule30()
      // renderRule30(ctx)
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
