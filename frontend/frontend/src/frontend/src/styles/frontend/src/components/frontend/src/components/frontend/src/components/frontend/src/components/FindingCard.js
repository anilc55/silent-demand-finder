import React from 'react';

const FindingCard = ({ type, title, description, icon }) => {
  const getIconClass = (type) => {
    switch(type.toLowerCase()) {
      case 'why': return 'icon-why';
      case 'how': return 'icon-how';
      case 'problem': return 'icon-problem';
      case 'compare': return 'icon-compare';
      case 'mistake': return 'icon-mistake';
      case 'secret': return 'icon-secret';
      default: return 'icon-why';
    }
  };

  return (
    <div className="finding-card">
      <div className="finding-header">
        <div className={`finding-icon ${getIconClass(type)}`}>
          {type.charAt(0)}
        </div>
        <h3 className="finding-title">{title}</h3>
      </div>
      <p className="finding-description">{description}</p>
    </div>
  );
};

export default FindingCard;
