import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import colorsReducer from "../components/Art/colorsSlice";
import gradientBarReducer from "../components/GradientBar/gradientBarSlice";
import pointsReducer from "../components/GradientBar/Point/pointsSlice";

export const store = configureStore({
  reducer: {
    colors: colorsReducer,
    gradient: gradientBarReducer,
    points: pointsReducer,
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
