const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
	isLoading: false,
};

const accountReducer = (state = initialStateAccount, action) => {
	switch (action.type) {
		case "account/deposit":
			return {
				...state,
				balance: state.balance + action.payload,
				isLoading: false,
			};

		case "account/withdraw":
			return { ...state, balance: state.balance - action.payload };

		case "account/requestLoan":
			if (state.loan > 0) return state;
			// LATER
			return {
				...state,
				loan: action.payload.amount,
				loanPurpose: action.payload.purpose,
				balance: state.balance + action.payload.amount,
			};

		case "account/payLoan":
			return {
				...state,
				loan: 0,
				loanPurpose: "",
				balance: state.balance - state.loan,
			};
		case "account/convertingCurrency":
			return { ...state, isLoading: true };

		default:
			return state;
	}
};

const deposit = (amount, currency) => {
	if (currency === "USD") return { type: "account/deposit", payload: amount };

	return async (dispatch, getState) => {
		dispatch({ type: "account/convertingCurrency" });

		const res = await fetch(
			`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
		);
		const data = await res.json();
		const converted = data.rates.USD;

		dispatch({ type: "account/deposit", payload: converted });
	};
};
const withdraw = (amount) => {
	return { type: "account/withdraw", payload: amount };
};
const requestLoan = (amount, purpose) => {
	return { type: "account/requestLoan", payload: { amount, purpose } };
};
const payLoan = () => {
	return { type: "account/payLoan" };
};

export { accountReducer, deposit, withdraw, requestLoan, payLoan };

// 13. The Redux DevTools
