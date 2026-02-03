import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MetricCard from '../components/MetricCard';
import FindingCard from '../components/FindingCard';

const Home = () => {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = (keyword) => {
    // Mock search results - in real app, this would come from API
    setSearchResults({
      keyword,
      metrics: [
        { title: 'Demand Type', value: 'Hidden +', icon: '🔍' },
        { title: 'Intent Level', value: 'High + Monetizable', icon: '🎯' },
        { title: 'Competition', value: 'Low to Medium', icon: '📊' },
        { title: 'Status', value: 'AI + Real-time Logic', icon: '🤖' }
      ],
      findings: [
        {
          type: 'WHY',
          title: 'WHY',
          description: 'People search for "AI" but don\'t openly discuss it in public forums.'
        },
        {
          type: 'HOW',
          title: 'HOW',
          description: 'Step-by-step guide for beginners on how to start with AI.'
        },
        {
          type: 'PROBLEM',
          title: 'PROBLEM',
          description: 'Real problems related to AI that people quietly search for solutions.'
        },
        {
          type: 'COMPARE',
          title: 'COMPARE',
          description: 'Comparison between AI and alternatives - which is better and cheaper.'
        },
        {
          type: 'MISTAKE',
          title: 'MISTAKE',
          description: 'Common mistakes beginners make that waste time and money.'
        },
        {
          type: 'SECRET',
          title: 'SECRET',
          description: 'Hidden AI tricks that professionals don\'t openly share.'
        }
      ]
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            What people search for – but don't openly talk about
          </h1>
          <p className="hero-subtitle">
            Discover hidden demand that you can monetize with low competition
          </p>
          
          <div className="search-container">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      {searchResults && (
        <section className="metrics">
          <div className="container">
            <h2 className="section-title">Analysis for: "{searchResults.keyword}"</h2>
            
            <div className="metrics-grid">
              {searchResults.metrics.map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  icon={metric.icon}
                />
              ))}
            </div>

            {/* Findings Section */}
            <h2 className="section-title">Silent Demand Findings</h2>
            <div className="findings-grid">
              {searchResults.findings.map((finding, index) => (
                <FindingCard
                  key={index}
                  type={finding.type}
                  title={finding.title}
                  description={finding.description}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Info Section for first-time visitors */}
      {!searchResults && (
        <section className="metrics">
          <div className="container">
            <h2 className="section-title">How Silent Demand Finder Works</h2>
            
            <div className="findings-grid">
              <FindingCard
                type="HOW"
                title="AI-Powered Discovery"
                description="Our AI analyzes search patterns to find topics people are searching for but not discussing publicly."
              />
              <FindingCard
                type="WHY"
                title="Low Competition"
                description="Find opportunities where demand exists but few creators are making content."
              />
              <FindingCard
                type="SECRET"
                title="Monetization Ready"
                description="Each finding comes with monetization strategies tailored to the demand type."
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
