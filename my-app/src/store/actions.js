import * as actionTypes from './actionTypes';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export const addBudgetData = (data) => {
	return dispatch => {
		axios.post('/postIncome', data, { headers: { 'Content-Type': 'application/json', } })
		.then(response=>{
			dispatch( initBudget(response.data) );
			dispatch( getBudget() );
		})
		.catch(err => console.log(err.response))
	}
};

export const getBudget =  () => {
	return dispatch => {
    axios.get('/budgets')
    .then(res=>{
      dispatch(getInitBudget(res.data));
      dispatch(getOverAllBudget());
    })

   }
}

export const getOverAllBudget =  () => {
	return dispatch => {
    axios.get('/')
    .then(res=>{
      dispatch(initBudget(res.data));
    })

   }
}


export const getInitBudget = (data) => {
	return{
		type: actionTypes.GET_INIT_BUDGET,
		data: data
	}
}

export const addIncomeItem = (value) => {
	return{
		type:actionTypes.ADD_INCOME_ITEM,
		value: value
	}
};

export const addExpenseItem = (value) => {
	return{
		type:actionTypes.ADD_EXPENSE_ITEM,
		value: value
	}
};

export const initBudget = (data) => {
	return{
		type: actionTypes.INIT_BUDGET,
		data: data
	}
};

export const removeBudgetItem = (id) => {
	return dispatch => {
		axios.delete(`/${id}`)
		.then((res)=>{
			dispatch( getBudget() );
			console.log(res.data);
			dispatch( initBudget(res.data) );
		})
		.catch((err)=>{
			console.log(err);
		})
	}
};