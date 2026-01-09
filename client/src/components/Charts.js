import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Charts = ({ expenses }) => {
  const [chartSize, setChartSize] = useState({ width: undefined, height: undefined });
  
  // Update chart size on window resize
  useEffect(() => {
    const handleResize = () => {
      setChartSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // Set initial size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!expenses.length) {
    return <div className="charts-container no-data">No expense data available to display charts</div>;
  }

  // Process data for category pie chart
  const categoryData = {};
  expenses.forEach(expense => {
    if (!categoryData[expense.category]) {
      categoryData[expense.category] = 0;
    }
    categoryData[expense.category] += expense.amount;
  });

  // Process data for monthly bar chart
  const monthlyData = Array(12).fill(0);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  expenses.forEach(expense => {
    const month = new Date(expense.date).getMonth();
    monthlyData[month] += expense.amount;
  });

  // Generate random colors for categories
  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 200);
      const g = Math.floor(Math.random() * 200);
      const b = Math.floor(Math.random() * 200);
      colors.push(`rgba(${r}, ${g}, ${b}, 0.7)`);
    }
    return colors;
  };

  // Category chart data
  const categoryChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryData),
        backgroundColor: generateColors(Object.keys(categoryData).length),
        borderWidth: 1,
      },
    ],
  };

  // Monthly chart data
  const monthlyChartData = {
    labels: monthNames,
    datasets: [
      {
        label: 'Monthly Expenses',
        data: monthlyData,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Responsive chart options
  const isSmallScreen = chartSize.width < 768;
  
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isSmallScreen ? 'bottom' : 'right',
        labels: {
          boxWidth: isSmallScreen ? 12 : 15,
          font: {
            size: isSmallScreen ? 10 : 12
          }
        }
      },
      title: {
        display: true,
        text: 'Expenses by Category',
        font: {
          size: isSmallScreen ? 14 : 16
        }
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: isSmallScreen ? 12 : 15,
          font: {
            size: isSmallScreen ? 10 : 12
          }
        }
      },
      title: {
        display: true,
        text: 'Monthly Expenses',
        font: {
          size: isSmallScreen ? 14 : 16
        }
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: isSmallScreen ? 8 : 10
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: isSmallScreen ? 8 : 10
          }
        }
      }
    }
  };

  return (
    <div className="charts-container">
      <div className="chart-wrapper">
        <Pie data={categoryChartData} options={pieOptions} />
      </div>
      <div className="chart-wrapper">
        <Bar data={monthlyChartData} options={barOptions} />
      </div>
    </div>
  );
};

export default Charts;

