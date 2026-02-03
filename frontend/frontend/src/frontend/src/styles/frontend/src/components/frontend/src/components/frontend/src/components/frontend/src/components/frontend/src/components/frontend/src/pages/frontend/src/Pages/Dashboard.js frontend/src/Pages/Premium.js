import React from 'react';

const Premium = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: [
        '5 searches per day',
        'Basic demand insights',
        'Limited keyword suggestions',
        'Community support'
      ],
      buttonText: 'Current Plan',
      disabled: true
    },
    {
      name: 'Pro',
      price: '$29/month',
      features: [
        'Unlimited searches',
        'Advanced AI predictions',
        'Priority support',
        'Export reports',
        'API access',
        'Custom alerts'
      ],
      buttonText: 'Upgrade to Pro',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: '$99/month',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom AI models',
        'White-label reports',
        'Dedicated support',
        'Training sessions'
      ],
      buttonText: 'Contact Sales'
    }
  ];

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="section-title">Premium Plans</h1>
        <p style={{ textAlign: 'center', marginBottom: '3rem', color: '#64748b' }}>
          Unlock advanced features to find hidden demand opportunities
        </p>

        <div className="plans-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className="plan-card" 
              style={{ 
                background: plan.highlighted ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                color: plan.highlighted ? 'white' : '#1e293b',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                position: 'relative'
              }}
            >
              {plan.highlighted && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#10b981',
                  color: 'white',
                  padding: '5px 20px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  MOST POPULAR
                </div>
              )}
              
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{plan.name}</h2>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                {plan.price}
                {plan.name !== 'Free' && <span style={{ fontSize: '1rem', opacity: 0.8 }}>/month</span>}
              </div>
              
              <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                style={{
                  width: '100%',
                  padding: '12px',
                  background: plan.highlighted ? 'white' : plan.disabled ? '#94a3b8' : '#667eea',
                  color: plan.highlighted ? '#667eea' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: plan.disabled ? 'not-allowed' : 'pointer',
                  opacity: plan.disabled ? 0.6 : 1
                }}
                disabled={plan.disabled}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="premium-features" style={{ background: 'white', padding: '2rem', borderRadius: '15px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Premium Features</h2>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <FindingCard
              type="SECRET"
              title="Advanced AI Predictions"
              description="Get predictions 6 months ahead of trends with our proprietary AI models."
            />
            <FindingCard
              type="HOW"
              title="Competitor Analysis"
              description="See what your competitors are missing in their content strategy."
            />
            <FindingCard
              type="WHY"
              title="Revenue Estimates"
              description="Get detailed monetization plans for each opportunity found."
            />
            <FindingCard
              type="COMPARE"
              title="Global Market Insights"
              description="Access demand data from multiple countries and languages."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
