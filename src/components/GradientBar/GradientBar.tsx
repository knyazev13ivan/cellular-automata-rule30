import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Canvas from "./Canvas";
import Point from "./Point/Point";
import { IAnimation } from "../Types";
import { run, stop } from "./gradientBarSlice";
import { setColorsArr } from "../Art/colorSlice";
import styles from "./GradientBar.module.css";

const GradientBar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const points = useAppSelector((state) => state.points.points);
  const isRun = useAppSelector((state) => state.gradient.isRun);

  const width = 480;
  const height = 15;
  const size = 64;

  let currentColors = [];

  useEffect(() => {
    dispatch(run());
  }, [points]);

  const animation: IAnimation = {
    isRun: isRun,

    update() {
      // console.log('render!');
    },

    render(ctx) {
      //отрисовка градиента
      const sorted = points.slice().sort((a, b) => a.position - b.position);

      for (let i = -1; i < sorted.length; i++) {
        const start = sorted[i] || {
          color: sorted[i + 1].color,
          position: 0,
        };
        const end = sorted[i + 1] || {
          color: sorted[i].color,
          position: width,
        };
        const gradient = ctx.createLinearGradient(
          start.position,
          0,
          end.position,
          0
        );
        gradient.addColorStop(0, start.color);
        gradient.addColorStop(1, end.color);
        ctx.fillStyle = gradient;
        ctx.fillRect(start.position, 0, end.position, 15);
      }
      //=========
      //взятие цветов из градиента для state.colors
      currentColors = [];
      for (let i = 0; i < size; i++) {
        const xPos = Math.floor(i * (width / size) + width / size / 2);
        const rgb = ctx.getImageData(xPos, 5, 1, 1).data.slice(0, 3);
        currentColors.push(`rgb(${rgb.join(", ")})`);
      }

      dispatch(setColorsArr(currentColors));

      setTimeout(() => dispatch(stop()), 0);
    },
  };

  return (
    <div ref={containerRef} className={styles.gradientBar}>
      <Canvas animation={animation} run={isRun} width={width} height={height} />

      <div>
        {points.map((_point, i) => {
          const id = `:r${i}:`;
          return (
            <Point
              key={id}
              id={id}
              offsetLeft={containerRef.current?.offsetLeft}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GradientBar;
