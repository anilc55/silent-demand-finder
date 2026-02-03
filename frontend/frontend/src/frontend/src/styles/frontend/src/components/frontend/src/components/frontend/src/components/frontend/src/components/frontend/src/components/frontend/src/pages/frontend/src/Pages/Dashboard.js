import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSearches: 0,
    keywordsFound: 0,
    opportunities: 0,
    revenuePotential: 0
  });

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setStats({
      totalSearches: 1247,
      keywordsFound: 89,
      opportunities: 23,
      revenuePotential: 12500
    });
  }, []);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Demand Found',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: 'rgb(102, 126, 234)',
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        tension: 0.4
      },
      {
        label: 'Competition',
        data: [30, 25, 28, 20, 18, 15],
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Demand vs Competition Trend'
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="section-title">Dashboard</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Searches</h3>
            <p className="metric-value">{stats.totalSearches}</p>
          </div>
          <div className="stat-card">
            <h3>Keywords Found</h3>
            <p className="metric-value">{stats.keywordsFound}</p>
          </div>
          <div className="stat-card">
            <h3>Opportunities</h3>
            <p className="metric-value">{stats.opportunities}</p>
          </div>
          <div className="stat-card">
            <h3>Revenue Potential</h3>
            <p className="metric-value">${stats.revenuePotential.toLocaleString()}</p>
          </div>
        </div>

        <div className="chart-container" style={{ background: 'white', padding: '2rem', borderRadius: '10px', margin: '2rem 0' }}>
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="recent-findings" style={{ marginTop: '2rem' }}>
          <h2>Recent Silent Demand Findings</h2>
          <div className="findings-grid" style={{ marginTop: '1rem' }}>
            <FindingCard
              type="SECRET"
              title="Passive Income"
              description="People searching for 'passive income 2024' but not discussing specific methods publicly."
            />
            <FindingCard
              type="PROBLEM"
              title="Career Change"
              description="Individuals quietly researching career change to tech without telling current employers."
            />
            <FindingCard
              type="HOW"
              title="Remote Work"
              description="Step-by-step guides for getting remote jobs in specific industries."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
