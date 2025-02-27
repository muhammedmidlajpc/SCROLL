import { configureStore } from "@reduxjs/toolkit";
import reviewrereducer from "./reviewslice";
const store = configureStore({
  reducer: {
    review: reviewrereducer
  }
});
export default store;
