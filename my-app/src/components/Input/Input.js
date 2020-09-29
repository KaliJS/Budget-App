import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/index';


class Input extends Component {

  state = {
    data: {
      description: '',
      amount: 0,
      target: 'inc'
    }    
  }

  changeElement = (event) => {
     const updateData = {...this.state.data};
      updateData.target =  event.target.value;
      this.setState({data: updateData});
  }

  descriptionHandler = (event) =>{
      const updateData = {...this.state.data};
      updateData.description =  event.target.value;  
      this.setState({data: updateData});
  }

  amountHandler = (event) =>{
      const updateData = {...this.state.data};
      updateData.amount =  parseInt(event.target.value);
      this.setState({data: updateData});   
  }  

  calculateBudget = () => {
    this.props.onAddBudgetData(this.state.data);
  }


  render(){

    return (
      <div className="add">
          <div className="add__container">
              <select className="add__type" onChange={this.changeElement} defaultValue={'inc'}>
                  <option value="inc">+</option>
                  <option value="exp">-</option>
              </select>
              <input type="text" onChange={this.descriptionHandler} className="add__description" placeholder="Add description"/>
              <input type="number" onChange={this.amountHandler} className="add__value" placeholder="Value"/>
              <button className="add__btn" onClick={this.calculateBudget}><i className="ion-ios-checkmark-outline">go</i></button>
          </div>
      </div>
      
    );
  }
}


const mapStateToProps = (state) => {
    return{
        income: state.income,
        expense: state.expense,
        total: state.total,
        target: state.target
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onAddBudgetData: (data) => dispatch(actions.addBudgetData(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
