import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchExpenses } from '../api';
import Navbar from '../components/Navbar';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Sidebar from '../components/Sidebar';
import Charts from '../components/Charts';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('expenses'); // For mobile view tab navigation
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    loadExpenses();
  }, [navigate]);

  const loadExpenses = async () => {
    setLoading(true);
    try {
      const response = await fetchExpenses();
      setExpenses(response.data);
      setError('');
    } catch (error) {
      console.log(error);
      setError('Failed to fetch expenses. Please try again.');
      
      // If unauthorized, redirect to login
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseAdded = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleExpenseDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense._id !== id));
  };

  // Mobile tab navigation
  const renderMobileTabNav = () => (
    <div className="mobile-tabs">
      <button 
        className={`tab-btn ${activeTab === 'expenses' ? 'active' : ''}`}
        onClick={() => setActiveTab('expenses')}
      >
        Expenses
      </button>
      <button 
        className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
        onClick={() => setActiveTab('add')}
      >
        Add New
      </button>
      <button 
        className={`tab-btn ${activeTab === 'charts' ? 'active' : ''}`}
        onClick={() => setActiveTab('charts')}
      >
        Charts
      </button>
      <button 
        className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
        onClick={() => setActiveTab('summary')}
      >
        Summary
      </button>
    </div>
  );

  // Content based on active tab for mobile
  const renderMobileContent = () => {
    if (loading && activeTab !== 'add') {
      return <div className="loading">Loading expenses...</div>;
    }

    switch (activeTab) {
      case 'add':
        return (
          <div className="dashboard-section">
            <ExpenseForm onExpenseAdded={handleExpenseAdded} />
          </div>
        );
      case 'charts':
        return (
          <div className="dashboard-section">
            <Charts expenses={expenses} />
          </div>
        );
      case 'summary':
        return (
          <div className="side-content-mobile">
            <Sidebar expenses={expenses} />
          </div>
        );
      default: // expenses
        return (
          <div className="dashboard-section">
            <ExpenseList 
              expenses={expenses} 
              onExpenseDelete={handleExpenseDelete} 
            />
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      
      {error && <div className="error-banner">{error}</div>}
      
      {/* Mobile view */}
      <div className="mobile-dashboard-view">
        {renderMobileTabNav()}
        {renderMobileContent()}
      </div>
      
      {/* Desktop view */}
      <div className="desktop-dashboard-view">
        <div className="dashboard-content">
          <div className="main-content">
            <div className="dashboard-section">
              <ExpenseForm onExpenseAdded={handleExpenseAdded} />
            </div>
            
            <div className="dashboard-section">
              {loading ? (
                <div className="loading">Loading expenses...</div>
              ) : (
                <ExpenseList 
                  expenses={expenses} 
                  onExpenseDelete={handleExpenseDelete} 
                />
              )}
            </div>
            
            <div className="dashboard-section">
              <Charts expenses={expenses} />
            </div>
          </div>
          
          <div className="side-content">
            <Sidebar expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
