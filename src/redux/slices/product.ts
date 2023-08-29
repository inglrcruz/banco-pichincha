import { createSlice } from '@reduxjs/toolkit'

export const state = {
  selected: null,
  loading: false,
  dialogConfig: null,
  list: []
}

export const productSlice = createSlice({
  name: "product",
  initialState: state,
  reducers: {
    changeStage: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { changeStage } = productSlice.actions
