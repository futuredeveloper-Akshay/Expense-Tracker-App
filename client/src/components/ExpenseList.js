import React from "react";
import { deleteExpense } from "../api";

const ExpenseList = ({ expenses, onExpenseDelete }) => {
  if (!expenses.length) {
    return (
      <div className="expense-list-container">
        <h2>Your Expenses</h2>
        <p className="no-expenses">
          No expenses found. Add your first expense using the form.
        </p>
      </div>
    );
  }

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      onExpenseDelete(id);
    } catch (error) {
      console.log(error);
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className="expense-list-container">
      <h2>Your Expenses</h2>
      <div className="expense-list">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.title}</td>
                <td>
                  <span
                    className={`category-badge ${expense.category.toLowerCase()}`}
                  >
                    {expense.category}
                  </span>
                </td>
                <td className="amount">{formatCurrency(expense.amount)}</td>
                <td>{formatDate(expense.date)}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(expense._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
