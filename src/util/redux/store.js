import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
// import visibilityFilter from "./visibilityFilter";

const store = configureStore({
  reducer: reducer,
});

export default store;
