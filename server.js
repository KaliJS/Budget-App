const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const uuid = require('uuid/v4');

const app = express();

mongoose.Promise = global.Promise;

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//cors middleware
app.use(cors());

//setting port...
const port = process.env.PORT || 3000;

app.listen(port,()=>{console.log(`server is running on port no. ${port}`)})

let DUMMY_BUDGET = [];
let MAIN_BUDGET = {
    income: 0,
    expense: 0,
    total: 0,
    percentage: 0
};


if(process.env.NODE_ENV == 'production'){
	app.use(express.static('my-app/build'));
	app.get('*',(req,res) => {
		res.sendFile(path.resolve(__dirname, 'my-app', 'build', 'index.html'));
	});
}


app.get('/budgets', (req, res, next) => {
  res.status(200).json(DUMMY_BUDGET);
});

app.post('/postIncome', (req, res, next) => {
   if(MAIN_BUDGET.income !== 0){
   MAIN_BUDGET.percentage = (MAIN_BUDGET.expense/MAIN_BUDGET.income)*100;
 }
  const { description, amount, target } = req.body;

  if (!description || description.trim().length === 0 || !amount || amount <= 0) {
    return res.status(422).json({
      message: 'Invalid input, please enter a valid description and value.'
    });
  }

  const createdBudget = {
    id: uuid(),
    description,
    amount,
    target
  };

  if(req.body.target === 'inc'){
    MAIN_BUDGET.income = MAIN_BUDGET.income + req.body.amount;
    MAIN_BUDGET.total = MAIN_BUDGET.total + req.body.amount;
  }
  if(req.body.target === 'exp'){
    MAIN_BUDGET.expense = MAIN_BUDGET.expense + req.body.amount;
    MAIN_BUDGET.total = MAIN_BUDGET.total - req.body.amount;
  }

  DUMMY_BUDGET.push(createdBudget);

  res
    .status(201)
    .json(MAIN_BUDGET);
});

app.get('/', (req,res)=>{
  if(MAIN_BUDGET.income !== 0){
   MAIN_BUDGET.percentage = (MAIN_BUDGET.expense/MAIN_BUDGET.income)*100;
 }
    res.json(MAIN_BUDGET);
})


app.delete('/:id', (req,res) => {
  console.log(req.params.id);
  let dummy = DUMMY_BUDGET.filter(data => data.id === req.params.id);
  console.log(dummy);
  if(dummy[0].target === 'inc'){ 
    console.log('we are in');
    MAIN_BUDGET.income = MAIN_BUDGET.income - dummy[0].amount;
    console.log(MAIN_BUDGET.income);
    MAIN_BUDGET.total = MAIN_BUDGET.total - dummy[0].amount;
    console.log(MAIN_BUDGET.total);
  }
  if(dummy[0].target === 'exp'){
    MAIN_BUDGET.expense = MAIN_BUDGET.expense - dummy[0].amount;
    MAIN_BUDGET.total = MAIN_BUDGET.total + dummy[0].amount;
  }

  DUMMY_BUDGET = DUMMY_BUDGET.filter(data => data.id !== req.params.id);
  console.log(MAIN_BUDGET);
  if(MAIN_BUDGET.income !== 0){
   MAIN_BUDGET.percentage = (MAIN_BUDGET.expense/MAIN_BUDGET.income)*100;
 }else{
  MAIN_BUDGET.percentage = 100;
 }
  res.json(MAIN_BUDGET);
})




