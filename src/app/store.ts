import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import colorReduser from '../components/Art/colorSlice'

export const store = configureStore({
  reducer: {
    colors: colorReduser,
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
