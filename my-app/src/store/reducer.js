import * as actionTypes from './actionTypes';

const initialState = {
	total: 0,
	income: 0,
	expense: 0,
	percentage: 0,
	data: []
};

const budgetReducer = (state = initialState, action) => {

	switch(action.type){
		
		case actionTypes.INIT_BUDGET:
			return {
				...state,
				total: action.data.total,
				income: action.data.income, 
				expense: action.data.expense,
				percentage: action.data.percentage		
			}
		case actionTypes.GET_INIT_BUDGET:
			return {
				...state,
				data: action.data
			}
		case actionTypes.ADD_INCOME_ITEM:
			return {
				...state,
				income: state.income - action.value,
				total: state.total - action.value
			}
		case actionTypes.ADD_EXPENSE_ITEM:
			return {
				...state,
				expense: state.expense - action.value,
				total: state.total + action.value
			}
		default:return state
	}
};

export default budgetReducer;