import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Bob Builder" },
  { id: "1", name: "Jack Roberts" },
  { id: "2", name: "Ram Raghav" }
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {}
});

export default usersSlice.reducer;
