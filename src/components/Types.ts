import { PayloadAction } from "@reduxjs/toolkit"
import React from "react"

export type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>

export interface IAnimation {
  update: (params: IAnimationParams) => void,
  render: (context: CanvasRenderingContext2D) => void,
  isRun: boolean,
  fps?: number
}

export interface IAnimationParams {
  currentTime: number,
  prevTime: number,
  deltaTime: number
}

export interface ICircle {
  posX: number,
  posY: number,
  radius: number,
  waveSize: number,
  numberOfWaves: number,
  startAngle: number,
  offsetAngle: number,
  width: number,
  color: string
}

export interface IRgb {
  r: number,
  g: number,
  b: number
}

export interface IPointProps {
  id: string,
  color: string,
  position: number
}

export interface IPointsState {
  points: Array<IPointProps>
}

export type IPayloadPoint = PayloadAction<IPointProps>

export interface IColors {
  colors:Array<string>,
  size: number
}

export type FlameMatrix = [Array<Array<number>>, Array<Array<number>>]