// Silent Demand Finder - Main Application

class SilentDemandFinder {
    constructor() {
        this.currentKeyword = '';
        this.searchHistory = [];
        this.userPreferences = {};
        this.isSearching = false;
        this.init();
    }

    // Initialize the application
    init() {
        console.log('🚀 Silent Demand Finder Initialized');
        
        // Wait for DOM to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Load saved data
        this.loadData();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initialize UI
        this.initUI();
        
        // Hide loading screen
        setTimeout(() => {
            this.hideLoading();
        }, 1500);
    }

    loadData() {
        // Load search history
        const savedHistory = localStorage.getItem('sdf_search_history');
        if (savedHistory) {
            this.searchHistory = JSON.parse(savedHistory);
        }

        // Load user preferences
        const savedPrefs = localStorage.getItem('sdf_user_prefs');
        if (savedPrefs) {
            this.userPreferences = JSON.parse(savedPrefs);
        }

        // Load theme
        const savedTheme = localStorage.getItem('sdf_theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }

    saveData() {
        localStorage.setItem('sdf_search_history', JSON.stringify(this.searchHistory));
        localStorage.setItem('sdf_user_prefs', JSON.stringify(this.userPreferences));
    }

    setupEventListeners() {
        // Search functionality
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        
        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', () => this.performSearch());
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
            
            // Autocomplete
            searchInput.addEventListener('input', (e) => {
                this.showSuggestions(e.target.value);
            });
        }

        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.navbar') && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }

        // Modal handling
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });

        // Form submissions
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignup();
            });
        }

        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
    }

    initUI() {
        // Initialize findings
        this.loadDefaultFindings();
        
        // Update stats
        this.updateStats();
        
        // Setup auto-refresh for stats
        setInterval(() => this.animateStats(), 5000);
        
        // Add scroll animation
        this.setupScrollAnimations();
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loading');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300);
        }
    }

    async performSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        if (!searchInput || !searchBtn) return;
        
        const keyword = searchInput.value.trim();
        if (!keyword) {
            this.showNotification('Please enter a keyword to search', 'warning');
            searchInput.focus();
            return;
        }
        
        if (this.isSearching) return;
        
        this.isSearching = true;
        this.currentKeyword = keyword;
        
        // Update button state
        const originalText = searchBtn.innerHTML;
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        searchBtn.disabled = true;
        
        try {
            // Simulate API call
            await this.simulateAnalysis(keyword);
            
            // Show results
            this.showResults(keyword);
            
            // Add to history
            this.addToHistory(keyword);
            
            this.showNotification(`Found hidden opportunities for "${keyword}"`, 'success');
            
        } catch (error) {
            console.error('Search error:', error);
            this.showNotification('Analysis failed. Please try again.', 'error');
        } finally {
            // Restore button
            searchBtn.innerHTML = originalText;
            searchBtn.disabled = false;
            this.isSearching = false;
        }
    }

    async simulateAnalysis(keyword) {
        // Simulate AI processing time
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.generateAnalysisData(keyword));
            }, 2000);
        });
    }

    generateAnalysisData(keyword) {
        const data = {
            keyword: keyword,
            timestamp: new Date().toISOString(),
            metrics: {
                demand: this.randomScore(7, 10),
                competition: this.randomScore(1, 5),
                monetization: this.randomScore(8, 10),
                trend: this.randomScore(6, 10),
                velocity: this.randomScore(5, 9)
            },
            opportunities: this.generateOpportunities(keyword),
            suggestions: this.generateSuggestions(keyword),
            related: this.generateRelatedKeywords(keyword)
        };
        
        return data;
    }

    randomScore(min, max) {
        return (Math.random() * (max - min) + min).toFixed(1);
    }

    generateOpportunities(keyword) {
        return [
            {
                title: `Beginner's Guide to ${keyword}`,
                description: `People secretly search for "how to start with ${keyword}" but don't ask publicly`,
                score: this.randomScore(8, 10),
                type: 'content'
            },
            {
                title: `${keyword} Tool Development`,
                description: `Market gap for simple ${keyword} tools that existing solutions ignore`,
                score: this.randomScore(7, 10),
                type: 'product'
            },
            {
                title: `${keyword} Community Building`,
                description: `No active community for ${keyword} beginners to ask questions safely`,
                score: this.randomScore(8, 9),
                type: 'community'
            },
            {
                title: `${keyword} vs Alternatives`,
                description: `People compare ${keyword} with alternatives but don't find clear answers`,
                score: this.randomScore(7, 10),
                type: 'comparison'
            }
        ];
    }

    generateSuggestions(keyword) {
        return [
            {
                title: 'Create Video Tutorials',
                description: `Make beginner-friendly ${keyword} tutorials on YouTube`,
                icon: 'fa-video'
            },
            {
                title: 'Build Newsletter',
                description: `Start ${keyword} newsletter with weekly tips and insights`,
                icon: 'fa-newspaper'
            },
            {
                title: 'Develop Tool/Plugin',
                description: `Create simple ${keyword} tool solving common pain points`,
                icon: 'fa-tools'
            },
            {
                title: 'Offer Consultation',
                description: `Provide 1-on-1 ${keyword} consultation for beginners`,
                icon: 'fa-comments'
            }
        ];
    }

    generateRelatedKeywords(keyword) {
        const baseKeywords = [
            `${keyword} for beginners`,
            `learn ${keyword}`,
            `${keyword} tutorial`,
            `${keyword} basics`,
            `${keyword} tools`,
            `${keyword} alternatives`,
            `${keyword} mistakes`,
            `${keyword} secrets`
        ];
        
        return baseKeywords.slice(0, 5);
    }

    showResults(keyword) {
        const resultsSection = document.getElementById('resultsSection');
        if (!resultsSection) return;
        
        // Show section
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Update keyword display
        const keywordDisplay = document.getElementById('keywordDisplay');
        if (keywordDisplay) {
            keywordDisplay.textContent = `Keyword: ${keyword}`;
        }
        
        // Update analysis time
        const analysisTime = document.getElementById('analysisTime');
        if (analysisTime) {
            const now = new Date();
            analysisTime.innerHTML = `<i class="fas fa-clock"></i> Analyzed just now`;
        }
        
        // Generate analysis data
        const analysis = this.generateAnalysisData(keyword);
        
        // Update metrics
        this.updateResultsMetrics(analysis.metrics);
        
        // Update opportunities
        this.updateOpportunities(analysis.opportunities);
        
        // Update suggestions
        this.updateSuggestions(analysis.suggestions);
    }

    updateResultsMetrics(metrics) {
        const ids = ['demandScore', 'competitionScore', 'monetizationScore', 'trendScore'];
        const values = [metrics.demand, metrics.competition, metrics.monetization, metrics.trend];
        
        ids.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element) {
                // Animate number counting
                this.animateNumber(element, values[index], 1);
            }
        });
    }

    animateNumber(element, target, duration = 1) {
        const start = 0;
        const increment = target / (duration * 60); // 60fps
        
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = parseFloat(current).toFixed(1);
        }, 1000 / 60);
    }

    updateOpportunities(opportunities) {
        const opportunityList = document.getElementById('opportunityList');
        if (!opportunityList) return;
        
        opportunityList.innerHTML = opportunities.map(opp => `
            <div class="opportunity-item">
                <div class="opportunity-icon">
                    <i class="fas fa-${opp.type === 'content' ? 'file-alt' : opp.type === 'product' ? 'box' : 'users'}"></i>
                </div>
                <div class="opportunity-content">
                    <div class="opportunity-title">${opp.title}</div>
                    <div class="opportunity-desc">${opp.description}</div>
                </div>
                <div class="opportunity-score">${opp.score}/10</div>
            </div>
        `).join('');
    }

    updateSuggestions(suggestions) {
        const suggestionsGrid = document.getElementById('suggestionsGrid');
        if (!suggestionsGrid) return;
        
        suggestionsGrid.innerHTML = suggestions.map(sugg => `
            <div class="suggestion-card">
                <div class="suggestion-icon">
                    <i class="fas ${sugg.icon}"></i>
                </div>
                <div class="suggestion-title">${sugg.title}</div>
                <div class="suggestion-desc">${sugg.description}</div>
                <a href="#" class="suggestion-action">
                    Learn more
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `).join('');
    }

    loadDefaultFindings() {
        const findings = [
            {
                category: 'WHY',
                icon: 'fa-question-circle',
                title: '"AI" ko log search karte hain par openly discuss nahi karte',
                description: 'People feel insecure asking basic AI questions publicly. They secretly search for solutions but never post in forums.',
                example: '5,400 monthly searches for "how to learn AI without coding"'
            },
            {
                category: 'HOW',
                icon: 'fa-graduation-cap',
                title: '"AI" beginners ke liye step-by-step kaise shuru kare',
                description: 'Complete roadmap missing for absolute beginners. Existing content is too technical and overwhelming.',
                example: 'Opportunity: Create "AI for complete beginners" video series'
            },
            {
                category: 'PROBLEM',
                icon: 'fa-exclamation-triangle',
                title: '"AI" se related real problems jo chup-chaap search karee hain',
                description: 'Real implementation problems are searched but rarely discussed. People struggle silently with integration.',
                example: '2,800 monthly searches for "AI problems for small business"'
            },
            {
                category: 'COMPARE',
                icon: 'fa-balance-scale',
                title: '"AI" vs alternatives – kaunsa better aur sasta hai',
                description: 'People secretly compare tools but hesitate to ask. Clear, unbiased comparisons are missing.',
                example: '8,900 monthly comparison searches for AI tools'
            },
            {
                category: 'MISTAKE',
                icon: 'fa-times-circle',
                title: 'Beginners ki common galtiyan jo paisa aur waqt barbaad karti hain',
                description: 'New learners make expensive mistakes but don\'t share them. They search for solutions after facing issues.',
                example: '1,200 monthly searches for "AI course scam"'
            },
            {
                category: 'SECRET',
                icon: 'fa-user-secret',
                title: '"AI" ke hidden tricks jo professionals openly nahi batate',
                description: 'Professionals keep lucrative techniques secret. Beginners search for these methods but can\'t find reliable info.',
                example: 'High-demand for premium content with advanced techniques'
            }
        ];

        const findingsGrid = document.getElementById('findingsGrid');
        if (findingsGrid) {
            findingsGrid.innerHTML = findings.map(finding => `
                <div class="finding-card">
                    <div class="finding-header">
                        <span class="finding-category">${finding.category}</span>
                        <div class="finding-icon">
                            <i class="fas ${finding.icon}"></i>
                        </div>
                    </div>
                    <h3 class="finding-title">${finding.title}</h3>
                    <p class="finding-desc">${finding.description}</p>
                    <div class="finding-example">
                        <strong>Example:</strong> ${finding.example}
                    </div>
                    <button class="finding-btn" onclick="app.searchKeyword('AI')">
                        <i class="fas fa-chart-line"></i>
                        View Analysis
                    </button>
                </div>
            `).join('');
        }
    }

    showSuggestions(query) {
        // This would typically call an API for real suggestions
        // For now, we'll use a simple mock
        const suggestions = ['AI', 'YouTube', 'Marketing', 'Crypto', 'Fitness', 'Programming', 'Business'];
        
        if (query.length < 2) return;
        
        const filtered = suggestions.filter(s => 
            s.toLowerCase().includes(query.toLowerCase())
        );
        
        // In a real app, you would update a dropdown with these suggestions
        console.log('Suggestions:', filtered);
    }

    addToHistory(keyword) {
        const search = {
            keyword: keyword,
            timestamp: new Date().toISOString(),
            id: Date.now()
        };
        
        this.searchHistory.unshift(search);
        
        // Keep only last 10 searches
        if (this.searchHistory.length > 10) {
            this.searchHistory = this.searchHistory.slice(0, 10);
        }
        
        this.saveData();
        this.updateStats();
    }

    updateStats() {
        // Update keyword count
        const keywordStat = document.getElementById('statKeywords');
        if (keywordStat) {
            const baseCount = 10247;
            const newCount = baseCount + this.searchHistory.length * 100;
            keywordStat.textContent = newCount.toLocaleString();
        }
        
        // Update low competition percentage
        const compStat = document.getElementById('statLowComp');
        if (compStat) {
            // Simulate slight variation
            const base = 85;
            const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            compStat.textContent = `${base + variation}%`;
        }
        
        // Update potential value
        const potentialStat = document.getElementById('statPotential');
        if (potentialStat) {
            // Simulate increasing potential
            const base = 5;
            const increase = Math.floor(this.searchHistory.length / 2);
            potentialStat.textContent = `₹${base + increase}L+`;
        }
    }

    animateStats() {
        const stats = ['statKeywords', 'statLowComp', 'statPotential'];
        
        stats.forEach(statId => {
            const element = document.getElementById(statId);
            if (element) {
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }

    showSignupModal() {
        this.showModal('signupModal');
    }

    showLoginModal() {
        this.showModal('loginModal');
        this.closeModal('signupModal');
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (m
