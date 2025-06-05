import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isDarkTheme:false
}
const themeSlice = createSlice({
  name:'theme',
  initialState:initialState,
  reducers:{
    toggleTheme(state){
      state.isDarkTheme=!state.isDarkTheme;
    }
  }
})

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;