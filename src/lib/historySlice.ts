import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type HistoryItem = {
  name: string,
  country: string,
  lat: number,
  lon: number
}

const historySlice = createSlice({
  name: "history",
  initialState: {
    history: [] as HistoryItem[],
  },
  reducers: {
    addToHistory: (state, { payload }: PayloadAction<HistoryItem>) => {
      // Cleanings items with the same data of payload
      const filtered = state.history.filter(i => 
        (i.lat !== payload.lat) && 
        (i.lon !== payload.lon)
      );
      // Adding the new item
      filtered.push(payload);
      // Setting to the state
      state.history = filtered;
    }
  }
});

export const { addToHistory } = historySlice.actions;

export default historySlice.reducer;