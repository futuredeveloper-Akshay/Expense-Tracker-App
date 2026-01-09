import Expense from '../models/Expense.js';

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses' });
    console.log(error);
  }
};

export const addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;
  
  try {
    const newExpense = await Expense.create({
      userId: req.userId,
      title,
      amount,
      category,
      date: new Date(date)
    });
    
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add expense' });
    console.log(error);
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  
  try {
    const expense = await Expense.findOne({ _id: id, userId: req.userId });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found or not authorized' });
    }
    
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete expense' });
    console.log(error);
  }
};
