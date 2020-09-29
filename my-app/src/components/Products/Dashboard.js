import React from 'react';
import { connect } from 'react-redux';

const Dashboard = props => {

let now = new Date();
let year = now.getFullYear();

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let month = now.getMonth();
let date = now.getDate();


  return(

  <div className="top">
      <div className="budget">
          <div className="budget__title">
              Available Budget in <span className="budget__title--month">{date + ' ' + months[month] + ' ' + year}</span>
          </div>
          
          <div className="budget__value"> {props.total}</div>
          
          <div className="budget__income clearfix">
              <div className="budget__income--text">Income</div>
              <div className="right">
                  <div className="budget__income--value"> {props.income}</div>
                  <div className="budget__income--percentage">&nbsp;</div>
              </div>
          </div>
          
          <div className="budget__expenses clearfix">
              <div className="budget__expenses--text">Expenses</div>
              <div className="right clearfix">
                  <div className="budget__expenses--value"> {props.expense}</div>
                  <div className="budget__expenses--percentage">{props.percentage.toFixed(2)}%</div>
              </div>
          </div>
      </div>
  </div>
  );

};

const mapStateToProps = (state) => {
    return{
        income: state.income,
        expense: state.expense,
        total: state.total,
        percentage: state.percentage
    };
};


export default connect(mapStateToProps)( Dashboard );

