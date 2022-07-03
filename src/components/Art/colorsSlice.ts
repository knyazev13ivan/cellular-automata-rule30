import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TColors = {
  colors: string[];
};

const initialState: TColors = {
  colors: new Array(64).fill("#181818"),
};

export const colorsSlice = createSlice({
  name: "colors",
  initialState: initialState,
  reducers: {
    setColor: (
      state,
      action: PayloadAction<{ index: number; color: string }>
    ) => {
      state.colors[action.payload.index] = action.payload.color;
    },
    setColorsArr: (state, action: PayloadAction<string[]>) => {
      state.colors = ["#181818"].concat(action.payload.slice(1, 63), [
        "#ffffff",
      ]);
    },
  },
});

export const { setColor, setColorsArr } = colorsSlice.actions;

export default colorsSlice.reducer;
