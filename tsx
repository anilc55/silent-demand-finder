// components/Dashboard.tsx
import React, { useState } from 'react';
import DemandCard from './DemandCard';
import Filters from './Filters';
import ScoreVisualization from './ScoreVisualization';

interface DemandData {
  topic: string;
  demandScore: number;
  competition: 'Low' | 'Medium' | 'High';
  monetization: string;
  platforms: string[];
  countries: string[];
  freshness: Date;
}

const Dashboard: React.FC = () => {
  const [demands, setDemands] = useState<DemandData[]>([]);
  const [filters, setFilters] = useState({
    country: 'All',
    language: 'All',
    platform: 'All',
    minScore: 70
  });

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <Filters filters={filters} onFilterChange={setFilters} />
        <CountryHeatmap data={demands} />
      </div>
      
      <div className="main-content">
        <div className="header-stats">
          <StatCard title="Total Opportunities" value={demands.length} />
          <StatCard title="Avg Demand Score" value={averageScore} />
          <StatCard title="High Value" value={highValueCount} />
        </div>
        
        <div className="demand-grid">
          {demands.map((demand, index) => (
            <DemandCard key={index} data={demand} />
          ))}
        </div>
        
        <ScoreVisualization data={demands} />
      </div>
    </div>
  );
};
