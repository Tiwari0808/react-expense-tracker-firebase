import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

const ExpensesChart = ({ expenses }) => {
  // Process data to get monthly totals, sorted chronologically
  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthYear = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        label: monthYear,
        total: 0
      };
    }
    acc[monthKey].total += Number(expense.amount);
    return acc;
  }, {});

  // Sort months chronologically
  const sortedMonths = Object.keys(monthlyData).sort();
  const labels = sortedMonths.map(month => monthlyData[month].label);
  const dataValues = sortedMonths.map(month => monthlyData[month].total);

  // Calculate some statistics
  const maxExpense = Math.max(...dataValues);
  const totalExpenses = dataValues.reduce((sum, val) => sum + val, 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Expenses (₹)",
        data: dataValues,
        backgroundColor: (context) => {
          const value = context.dataset.data[context.dataIndex];
          return value === maxExpense ? '#ef5350' : '#4caf50';
        },
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        hoverBackgroundColor: '#66bb6a',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            const percentage = ((value / totalExpenses) * 100).toFixed(1);
            return `${value.toLocaleString()} (${percentage}%)`;
          }
        }
      },
      title: {
        display: true,
        text: `Total Expenses: ₹${totalExpenses.toLocaleString()}`,
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          bottom: 20
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (₹)',
          font: {
            weight: 'bold'
          }
        },
        ticks: {
          callback: (value) => `₹${value.toLocaleString()}`
        }
      },
      x: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Month',
          font: {
            weight: 'bold'
          }
        }
      }
    },
    animation: {
      duration: 1000
    }
  };

  return (
    <div style={{ height: '300px', position: 'relative' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpensesChart;
