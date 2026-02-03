const express = require('express');
const router = express.Router();

// Mock AI analysis function
const analyzeKeyword = (keyword) => {
  const demandTypes = ['Hidden +', 'Silent Search', 'Emerging', 'Seasonal'];
  const intentLevels = ['High + Monetizable', 'Medium + Commercial', 'Low + Informational'];
  const competitionLevels = ['Low', 'Low to Medium', 'Medium', 'High'];
  
  return {
    keyword,
    analysis: {
      demandType: demandTypes[Math.floor(Math.random() * demandTypes.length)],
      intentLevel: intentLevels[Math.floor(Math.random() * intentLevels.length)],
      competition: competitionLevels[Math.floor(Math.random() * competitionLevels.length)],
      searchVolume: Math.floor(Math.random() * 10000) + 1000,
      cpc: (Math.random() * 5 + 0.5).toFixed(2)
    },
    timestamp: new Date().toISOString()
  };
};

// Search keyword endpoint
router.post('/analyze', (req, res) => {
  const { keyword } = req.body;
  
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }
  
  const result = analyzeKeyword(keyword);
  res.json(result);
});

// Get trending keywords
router.get('/trending', (req, res) => {
  const trending = [
    { keyword: 'AI Tools 2024', growth: '45%', competition: 'Medium' },
    { keyword: 'Passive Income Ideas', growth: '32%', competition: 'High' },
    { keyword: 'Remote Work Skills', growth: '28%', competition: 'Medium' },
    { keyword: 'Digital Marketing', growth: '22%', competition: 'High' },
    { keyword: 'Web Development', growth: '18%', competition: 'Medium' }
  ];
  
  res.json(trending);
});

module.exports = router;
