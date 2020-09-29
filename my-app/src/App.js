import React, { Component } from 'react';

import Dashboard from './components/Products/Dashboard';
import IncomeItem from './components/Products/IncomeItem';
import ExpenseItem from './components/Products/ExpenseItem';
import Input from './components/Input/Input';
import './App.css';

class App extends Component {

  render(){
    return (
      <div>
          <Dashboard/>
          <div className="bottom">
            <Input/>
            <div className="container clearfix">
             
                <IncomeItem/>
                <ExpenseItem/>
              
            </div>
          </div>
      </div>
    );
  }
}

export default App;
