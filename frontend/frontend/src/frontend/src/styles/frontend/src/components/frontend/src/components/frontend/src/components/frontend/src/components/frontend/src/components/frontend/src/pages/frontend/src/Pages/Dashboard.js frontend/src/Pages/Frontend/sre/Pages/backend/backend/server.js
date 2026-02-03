const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/search', require('./routes/api'));

// Mock endpoints for frontend
app.post('/api/search/keyword', (req, res) => {
  const { keyword } = req.body;
  
  // Mock AI analysis
  const mockResults = {
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
        description: `People search for "${keyword}" but don't openly discuss it in public forums.`
      },
      {
        type: 'HOW',
        title: 'HOW',
        description: `Step-by-step guide for beginners on how to start with ${keyword}.`
      },
      {
        type: 'PROBLEM',
        title: 'PROBLEM',
        description: `Real problems related to ${keyword} that people quietly search for solutions.`
      },
      {
        type: 'COMPARE',
        title: 'COMPARE',
        description: `Comparison between ${keyword} and alternatives - which is better and cheaper.`
      },
      {
        type: 'MISTAKE',
        title: 'MISTAKE',
        description: `Common mistakes beginners make with ${keyword} that waste time and money.`
      },
      {
        type: 'SECRET',
        title: 'SECRET',
        description: `Hidden ${keyword} tricks that professionals don't openly share.`
      }
    ],
    opportunities: [
      {
        title: 'Beginner Guide',
        potential: '$5,000/month',
        competition: 'Low',
        trend: 'Growing 25% monthly'
      },
      {
        title: 'Advanced Tutorial',
        potential: '$8,000/month',
        competition: 'Medium',
        trend: 'Growing 18% monthly'
      }
    ]
  };
  
  res.json(mockResults);
});

app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    totalSearches: 1247,
    keywordsFound: 89,
    opportunities: 23,
    revenuePotential: 12500,
    monthlyTrend: [12, 19, 15, 25, 22, 30]
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
