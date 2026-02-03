// DOM Elements
const searchBtn = document.getElementById('searchBtn');
const keywordInput = document.getElementById('keywordInput');
const metricsSection = document.getElementById('metricsSection');
const findingsSection = document.getElementById('findingsSection');
const findingsGrid = document.getElementById('findingsGrid');
const currentKeyword = document.getElementById('currentKeyword');
const loadingOverlay = document.getElementById('loadingOverlay');
const exampleTags = document.querySelectorAll('.example-tag');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// Silent Demand Data
const silentDemandData = {
    'AI': {
        findings: [
            {
                type: 'WHY',
                title: 'WHY',
                description: '"AI" ko log search karte hain par openly discuss nahi karte because they feel it\'s too technical or they don\'t want to appear inexperienced.',
                tags: ['AI Education', 'Beginner Friendly', 'Hidden Interest']
            },
            {
                type: 'HOW',
                title: 'HOW',
                description: '"AI" beginners ke liye step-by-step kaise shuru kare without coding background - YouTube tutorials, no-code tools, practical projects.',
                tags: ['Step-by-Step', 'No Code', 'Practical']
            },
            {
                type: 'PROBLEM',
                title: 'PROBLEM',
                description: '"AI" se related real problems jo chup-chaap search karee hain - job replacement fears, implementation costs, technical complexity.',
                tags: ['Job Security', 'Cost', 'Implementation']
            },
            {
                type: 'COMPARE',
                title: 'COMPARE',
                description: '"AI" vs alternatives – kaunsa better aur sasta hai for small businesses: AI tools vs traditional software vs manual processes.',
                tags: ['Cost Analysis', 'ROI', 'Alternatives']
            },
            {
                type: 'MISTAKE',
                title: 'MISTAKE',
                description: 'Beginners ki common galtiyan jo paisa aur waqt barbaad karti hain - wrong tools, unrealistic expectations, no clear goals.',
                tags: ['Common Errors', 'Time Waste', 'Money Loss']
            },
            {
                type: 'SECRET',
                title: 'SECRET',
                description: '"AI" ke hidden tricks jo professionals openly nahi batate - prompt engineering secrets, free tools, automation workflows.',
                tags: ['Insider Tips', 'Hacks', 'Professional Secrets']
            }
        ]
    },
    'Passive Income': {
        findings: [
            {
                type: 'WHY',
                title: 'WHY',
                description: 'People search "passive income" but don\'t discuss openly because they fear judgment or don\'t want to share their methods.',
                tags: ['Financial Freedom', 'Side Hustle', 'Quiet Search']
            },
            {
                type: 'HOW',
                title: 'HOW',
                description: 'Real step-by-step methods that actually work without large investment - digital products, affiliate marketing, micro-SaaS.',
                tags: ['Actionable', 'Low Investment', 'Proven']
            },
            {
                type: 'PROBLEM',
                title: 'PROBLEM',
                description: 'Hidden problems: scams, time commitment, scalability issues that people search about but don\'t ask publicly.',
                tags: ['Scams', 'Time', 'Scalability']
            },
            {
                type: 'COMPARE',
                title: 'COMPARE',
                description: 'Different passive income methods compared - which ones actually work vs which are just hype.',
                tags: ['Comparison', 'Real Results', 'Hype vs Reality']
            },
            {
                type: 'MISTAKE',
                title: 'MISTAKE',
                description: 'Common mistakes: wrong niche selection, poor monetization, neglecting marketing.',
                tags: ['Niche Selection', 'Monetization', 'Marketing']
            },
            {
                type: 'SECRET',
                title: 'SECRET',
                description: 'Secrets successful creators don\'t share: specific platforms, automation tools, outsourcing tips.',
                tags: ['Platforms', 'Automation', 'Outsourcing']
            }
        ]
    },
    'YouTube Growth': {
        findings: [
            {
                type: 'WHY',
                title: 'WHY',
                description: 'Creators search for "YouTube growth" secretly to avoid competition and algorithm gaming accusations.',
                tags: ['Algorithm', 'Competition', 'Secret Tactics']
            },
            {
                type: 'HOW',
                title: 'HOW',
                description: 'Actual growth strategies that work beyond basic advice - thumbnail psychology, watch time hacks, community building.',
                tags: ['Thumbnails', 'Watch Time', 'Community']
            },
            {
                type: 'PROBLEM',
                title: 'PROBLEM',
                description: 'Unspoken problems: burnout, creative blocks, demonetization fears, algorithm changes.',
                tags: ['Burnout', 'Creativity', 'Algorithm']
            },
            {
                type: 'COMPARE',
                title: 'COMPARE',
                description: 'Different growth services compared - which actually deliver vs which are scams.',
                tags: ['Services', 'Real Results', 'Scams']
            },
            {
                type: 'MISTAKE',
                title: 'MISTAKE',
                description: 'Common mistakes: wrong niche, poor pacing, ignoring analytics, inconsistent uploads.',
                tags: ['Niche', 'Consistency', 'Analytics']
            },
            {
                type: 'SECRET',
                title: 'SECRET',
                description: 'Secrets successful YouTubers hide: specific editing software, promotion methods, collaboration networks.',
                tags: ['Editing', 'Promotion', 'Networking']
            }
        ]
    },
    'Freelancing': {
        findings: [
            {
                type: 'WHY',
                title: 'WHY',
                description: 'People secretly search freelancing tips to transition without alerting current employers or appearing desperate.',
                tags: ['Career Change', 'Discreet', 'Transition']
            },
            {
                type: 'HOW',
                title: 'HOW',
                description: 'Step-by-step guide to start freelancing: portfolio building, client acquisition, pricing strategies.',
                tags: ['Portfolio', 'Clients', 'Pricing']
            },
            {
                type: 'PROBLEM',
                title: 'PROBLEM',
                description: 'Hidden problems: client management, payment issues, work-life balance, feast or famine cycles.',
                tags: ['Clients', 'Payment', 'Balance']
            },
            {
                type: 'COMPARE',
                title: 'COMPARE',
                description: 'Freelancing platforms compared - which are best for beginners vs experienced freelancers.',
                tags: ['Platforms', 'Beginners', 'Experts']
            },
            {
                type: 'MISTAKE',
                title: 'MISTAKE',
                description: 'Common mistakes: underpricing, poor contracts, scope creep, ignoring taxes.',
                tags: ['Pricing', 'Contracts', 'Taxes']
            },
            {
                type: 'SECRET',
                title: 'SECRET',
                description: 'Secrets successful freelancers don\'t share: niche specialization, retainer agreements, referral systems.',
                tags: ['Specialization', 'Retainers', 'Referrals']
            }
        ]
    }
};

// Function to show loading
function showLoading() {
    loadingOverlay.style.display = 'flex';
}

// Function to hide loading
function hideLoading() {
    loadingOverlay.style.display = 'none';
}

// Function to analyze keyword
function analyzeKeyword(keyword) {
    showLoading();
    
    // Simulate API delay
    setTimeout(() => {
        keyword = keyword.trim();
        
        if (!keyword) {
            alert('Please enter a keyword');
            hideLoading();
            return;
        }
        
        // Update current keyword display
        currentKeyword.textContent = keyword;
        
        // Show sections
        metricsSection.style.display = 'block';
        findingsSection.style.display = 'block';
        
        // Scroll to metrics section
        metricsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Get data for keyword or use default AI data
        const data = silentDemandData[keyword] || silentDemandData['AI'];
        
        // Clear previous findings
        findingsGrid.innerHTML = '';
        
        // Add new findings
        data.findings.forEach(finding => {
            const findingCard = document.createElement('div');
            findingCard.className = `finding-card finding-${finding.type.toLowerCase()}`;
            
            findingCard.innerHTML = `
                <div class="finding-header">
                    <div class="finding-icon icon-${finding.type.toLowerCase()}">
                        ${finding.type.charAt(0)}
                    </div>
                    <h3 class="finding-title">${finding.title}</h3>
                </div>
                <p class="finding-description">${finding.description}</p>
                <div class="finding-tags">
                    ${finding.tags.map(tag => `<span class="finding-tag">${tag}</span>`).join('')}
                </div>
            `;
            
            findingsGrid.appendChild(findingCard);
        });
        
        hideLoading();
        
        // Update metrics with random variations (simulating real-time analysis)
        updateMetrics(keyword);
        
    }, 1500);
}

// Function to update metrics
function updateMetrics(keyword) {
    const metricValues = document.querySelectorAll('.metric-value');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    // Generate random metrics based on keyword
    const metrics = {
        'Demand Type': ['Hidden +', 'Silent Search', 'Unexplored +'][Math.floor(Math.random() * 3)],
        'Intent Level': ['High + Monetizable', 'Medium + Monetizable', 'Very High'][Math.floor(Math.random() * 3)],
        'Competition': ['Low to Medium', 'Very Low', 'Medium'][Math.floor(Math.random() * 3)],
        'Status': ['AI + Real-time Logic', 'Analyzing...', 'Live Data'][Math.floor(Math.random() * 3)]
    };
    
    const progressWidths = [
        Math.floor(Math.random() * 30) + 70, // 70-100%
        Math.floor(Math.random() * 30) + 70, // 70-100%
        Math.floor(Math.random() * 40) + 20, // 20-60%
        Math.floor(Math.random() * 20) + 80  // 80-100%
    ];
    
    metricValues.forEach((metric, index) => {
        const metricType = metric.previousElementSibling.textContent;
        if (metrics[metricType]) {
            metric.textContent = metrics[metricType];
        }
    });
    
    progressBars.forEach((bar, index) => {
        bar.style.width = `${progressWidths[index]}%`;
    });
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const keyword = keywordInput.value || 'AI';
    analyzeKeyword(keyword);
});

keywordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const keyword = keywordInput.value || 'AI';
        analyzeKeyword(keyword);
    }
});

// Example tag clicks
exampleTags.forEach(tag => {
    tag.addEventListener('click', () => {
        keywordInput.value = tag.textContent;
        analyzeKeyword(tag.textContent);
    });
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Initialize with default analysis
window.addEventListener('DOMContentLoaded', () => {
    // Analyze default keyword on page load
    setTimeout(() => {
        analyzeKeyword('AI');
    }, 1000);
});
