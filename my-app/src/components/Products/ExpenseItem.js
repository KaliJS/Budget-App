import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/index';


class ExpenseItem extends Component {

render(){

    let expenseItems;
    let budgetData;
    budgetData = this.props.data.filter(data => data.target !== 'inc' );
    if (this.props.data || this.props.data.length > 0){
        expenseItems = budgetData.map( budget => (  
            <div key={budget.id} className="item clearfix" id="expense-1">
                <div className="item__description">{budget.description}</div>
                <div className="right clearfix">
                    <div className="item__value">- {budget.amount}</div>
                    <div className="item__percentage">{((budget.amount/this.props.expense)*100).toFixed(2)}%</div>
                    <div className="item__delete">
                        <button className="item__delete--btn" onClick={()=>this.props.onRemoveItem(budget.id)}><i className="ion-ios-close-outline">x</i></button>
                    </div>
                </div>
            </div>
                
        ))
        
    }

  return (
    <div className="expenses">
        <h2 className="expenses__title">Expenses</h2>
        
        <div className="expenses__list">
            
                  {expenseItems}  
        </div>
        
    </div>
            
  );
};
};

const mapStateToProps = (state) => {
    return{
        data: state.data,
        expense: state.expense
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveItem: (id) => dispatch(actions.removeBudgetItem(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)( ExpenseItem );

