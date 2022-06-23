import { createSlice } from "@reduxjs/toolkit";

const initialState: { isRun: boolean } = { isRun: false }

export const gradientBarSlice = createSlice({
  name: 'gradient',
  initialState: initialState,
  reducers: {
    run: (state) => { state.isRun = true },
    stop: (state) => { state.isRun = false },
  }
})

export const { run, stop } = gradientBarSlice.actions

export default gradientBarSlice.reducer