import React from 'react';

const MetricCard = ({ title, value, icon }) => {
  return (
    <div className="metric-card">
      <div className="metric-title">{title}</div>
      <div className="metric-value">
        {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
        {value}
      </div>
    </div>
  );
};

export default MetricCard;
