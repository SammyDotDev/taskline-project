import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id: 0,
	username: "",
	email: "",
	projects: [],
};

const currentUserSlice = createSlice({
	name: "currentUser",
	initialState,
	reducers: {
		setCurrentUser(state, action) {
			state = action.payload;
		},
	},
});

export const { setCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
