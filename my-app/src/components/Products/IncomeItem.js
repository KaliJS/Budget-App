import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/index';



class IncomeItem extends Component {

    componentDidMount(){
        this.props.onGetBudget();
    }

render(){
    let incomeItems;
    let budgetData;
    budgetData = this.props.data.filter(data => data.target !== 'exp' );
    if (this.props.data || this.props.data.length > 0){
        incomeItems = budgetData.map( budget => (
                
            <div key={budget.id} className="item clearfix" id="income-0">
            <div className="item__description">{budget.description}</div>
                <div className="right clearfix">
                    <div className="item__value">+ {budget.amount}</div>
                    <div className="item__delete">
                        <button className="item__delete--btn" onClick={()=>this.props.onRemoveItem(budget.id)} ><i className="ion-ios-close-outline">x</i></button>
                    </div>
                </div>
            </div>
                
        ))
        
    }



  return (
    <div className="income">
        <h2 className="icome__title">Income</h2>
        
        <div className="income__list">           
            
                {incomeItems}
    
        </div>
        
    </div>
                
  );
}
};

const mapStateToProps = (state) => {
    return{
        data: state.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveItem: (id) => dispatch(actions.removeBudgetItem(id)),
        onGetBudget: () => dispatch(actions.getBudget())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)( IncomeItem );
