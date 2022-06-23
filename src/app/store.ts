import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import colorReduser from "../components/Art/colorSlice";
import gradientBarReduser from "../components/GradientBar/gradientBarSlice";
import pointsReduser from "../components/GradientBar/Point/pointsSlice";

export const store = configureStore({
  reducer: {
    colors: colorReduser,
    gradient: gradientBarReduser,
    points: pointsReduser,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
