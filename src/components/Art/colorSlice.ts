import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TColors = string[]

const initialState: TColors = new Array(64).fill('#ff1154')

export const colorsSlice = createSlice({
  name: 'colors',
  initialState: initialState,
  reducers: {
    setColor: (state, action: PayloadAction<{index: number, color: string}>) => {
      state[action.payload.index] = action.payload.color
    },
    setColorsArr: (state, action: PayloadAction<string[]>) => {
      state = action.payload.slice()
    }
  }
})

export const {setColor, setColorsArr} = colorsSlice.actions

export default colorsSlice.reducer