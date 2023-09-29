import { createSlice } from "@reduxjs/toolkit";
import { payLoan } from "../accounts/accountSlice";

const initialState = {
	fullName: "",
	nationalID: "",
	createdAt: "",
};

const customerSlice = createSlice({
	name: "customer",
	initialState,
	reducers: {
		createCustomer: {
			prepare(fullName, nationalID) {
				return {
					payload: { fullName, nationalID },
				};
			},
			reducer(state, action) {
				state.fullName = action.payload.fullName;
				state.nationalID = action.payload.nationalID;
				state.createdAt = new Date().toISOString();
			},
		},

		updateName(state, action) {
			state.fullName = action.payload;
		},
	},
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;

/*
const customerReducer = (state = initialState, action) => {
	switch (action.type) {
		case "customer/createCustomer":
			return {
				...state,
				fullName: action.payload.fullName,
				nationalID: action.payload.nationalID,
				createdAt: action.payload.createdAt,
			};
		case "customer/updateName":
			return {
				...state,
				fullName: action.payload,
			};
		default:
			return state;
	}
};

const createCustomer = (fullName, nationalID) => {
	return {
		type: "customer/createCustomer",
		payload: { fullName, nationalID, createdAt: new Date().toISOString() },
	};
};

const updateName = (fullName) => {
	return {
		type: "customer/updateName",
		payload: fullName,
	};
};

export { customerReducer, createCustomer, updateName };
*/
