import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPointProps, IPointsState } from '../../Types'

const initialState: IPointsState = {
  points: [
    {
      id: ':r0:',
      color: '#181818',
      position: 0,
    },
    {
      id: ':r1:',
      color: '#dd00fa',
      position: 100,
    },
    {
      id: ':r2:',
      color: '#ff1154',
      position: 310,
    },
    {
      id: ':r3:',
      color: '#efd300',
      position: 460,
    },
  ]
}

export const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    changePosition: (state, {payload}: PayloadAction<IPointProps>) => {
      const indexPoint = state.points.findIndex(e => e.id === payload.id)
      let position = payload.position
      if (payload.position < 0) position = 0
      if (payload.position > 480) position = 480

      state.points[indexPoint].position = position
    },
    changeColor: (state, {payload}: PayloadAction<IPointProps>) => {
      const indexPoint = state.points.findIndex(e => e.id === payload.id)
      state.points[indexPoint].color = payload.color
    },
    addPoint: (state, {payload}: PayloadAction<IPointProps>) => {
      state.points.push({
        id: payload.id,
        color: payload.color,
        position: payload.position
      })
    },
    deletePoint: (state, actions: PayloadAction<string>) => {
      state.points.filter(point => point.id !== actions.payload)
    },
  },
})

export const { changePosition, changeColor, addPoint, deletePoint } = pointsSlice.actions

export default pointsSlice.reducer
