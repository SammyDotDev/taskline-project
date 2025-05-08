import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./slices/currentUserSlice";

const store = configureStore({
	reducer: {
		currentUser: currentUserSlice,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
