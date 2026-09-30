import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UiState = {
  isDarkMode: boolean;
};

const initialState: UiState = {
  isDarkMode: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
