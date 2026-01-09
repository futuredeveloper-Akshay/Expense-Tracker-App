import React from 'react';

const Sidebar = ({ expenses }) => {
  // Calculate total expenses
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };
  
  // Group expenses by category and calculate totals
  const categoryTotals = expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});
  
  // Sort categories by total amount (descending)
  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="sidebar">
      <div className="total-section">
        <h2>Overview</h2>
        <div className="total-amount">
          <span className="label">Total Expenses:</span>
          <span className="value">{formatCurrency(totalAmount)}</span>
        </div>
        <div className="expense-count">
          <span className="label">Number of Expenses:</span>
          <span className="value">{expenses.length}</span>
        </div>
      </div>
      
      <div className="category-section">
        <h3>Expenses by Category</h3>
        {sortedCategories.length > 0 ? (
          <ul className="category-list">
            {sortedCategories.map(([category, amount]) => (
              <li key={category} className="category-item">
                <div className="category-name">
                  <span className={`category-badge ${category.toLowerCase()}`}>
                    {category}
                  </span>
                </div>
                <div className="category-amount">
                  {formatCurrency(amount)}
                </div>
                <div className="category-percent">
                  {Math.round((amount / totalAmount) * 100)}%
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-data">No data available</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
