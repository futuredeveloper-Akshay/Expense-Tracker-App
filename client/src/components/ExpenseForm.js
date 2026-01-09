import React, { useState } from 'react';
import { addExpense } from '../api';

const ExpenseForm = ({ onExpenseAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().slice(0, 10)
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      // Convert amount to number
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };
      
      const { data } = await addExpense(expenseData);
      onExpenseAdded(data);
      
      // Reset form
      setFormData({
        title: '',
        amount: '',
        category: '',
        date: new Date().toISOString().slice(0, 10)
      });
      
      // Show success message
      setSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setError('Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="expense-form-container">
      <h2>Add New Expense</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Expense added successfully!</div>}
      
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              required
              disabled={loading}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Utilities">Utilities</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
