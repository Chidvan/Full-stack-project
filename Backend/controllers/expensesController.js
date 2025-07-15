const Expense = require('../models/Expense1')
const mongoose = require('mongoose');


//create a single expense
const createExpense = async (req,res) => {
    const { description, amount, paidBy, group, splitBetween } = req.body;

  try {
    // validation (optional but recommended)
    if (!description || !amount || !paidBy || !group || !splitBetween || splitBetween.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // create the expense
    const expense = await Expense.create({
      description,
      amount,
      paidBy,
      group,
      splitBetween,
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error('Error creating expense:', error.message);
    res.status(500).json({ error: 'Failed to create expense' });
  }
}

//get all expenses
const getExpenses = async (req,res) => {
    const expenses = await Expense.find({}).sort({ createdAt:-1})

    res.status(200).json(expenses)
}
//get an expense
const getExpense = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error:'No such workout'})
    }

    const expense = await Expense.findById(id)

    if (!expense){
        return res.status(404).json({error:'No such expense'})
    }

    res.status(200).json(expense)
}
//delete an expense
//update an expense

 module.exports = {
    getExpense,
    getExpenses,
    createExpense
 }