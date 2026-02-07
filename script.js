// Silent Demand Finder - Main JavaScript File
// WebApp Version for GitHub Pages

// Configuration
const CONFIG = {
    APP_NAME: 'Silent Demand Finder',
    VERSION: '1.0.0',
    API_BASE_URL: 'https://api.silentdemandfinder.com', // Replace with your API
    USE_MOCK_DATA: true, // Set to false when API is ready
    DEFAULT_LANG: 'en',
    ENABLE_PWA: true,
    ENABLE_ANALYTICS: true
};

// State Management
let AppState = {
    user: null,
    language: CONFIG.DEFAULT_LANG,
    theme: 'light',
    searchHistory: [],
    favorites: [],
    apiKeys: [],
    subscriptions: {
        plan: 'free',
        expires: null,
        features: []
    }
};

// DOM Elements
const DOM = {
    // Navigation
    menuToggle: document.getElementById('menuToggle'),
    mobileMenu: document.getElementById('mobileMenu'),
    loginBtn: document.getElementById('loginBtn'),
    signupBtn: document.getElementById('signupBtn'),
    
    // Modals
    loginModal: document.getElementById('loginModal'),
    signupModal: document.getElementById('signupModal'),
    closeLogin: document.getElementById('closeLogin'),
    closeSignup: document.getElementById('closeSignup'),
    switchToSignup: document.getElementById('switchToSignup'),
    switchToLogin: document.getElementById('switchToLogin'),
    
    // Forms
    loginForm: document.getElementById('loginForm'),
    signupForm: document.getElementById('signupForm'),
    
    // Search
    heroSearch: document.getElementById('heroSearch'),
    heroSearchBtn: document.getElementById('heroSearchBtn'),
    
    // Language
    langBtn: document.querySelector('.lang-btn'),
    langDropdown: document.querySelector('.lang-dropdown'),
    
    // Loading
    loadingOverlay: document.getElementById('loadingOverlay'),
    
    // CTA
    ctaSignup: document.getElementById('ctaSignup'),
    ctaDemo: document.getElementById('ctaDemo'),
    
    // Suggestions
    suggestions: document.querySelectorAll('.suggestion')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupEventListeners();
    loadUserPreferences();
    checkAuthStatus();
    updateUI();
    
    // Register Service Worker for PWA
    if (CONFIG.ENABLE_PWA && 'serviceWorker' in navigator) {
        registerServiceWorker();
    }
    
    console.log(`${CONFIG.APP_NAME} v${CONFIG.VERSION} initialized`);
});

// Initialize App
function initApp() {
    // Load language
    const savedLang = localStorage.getItem('sdf_language') || CONFIG.DEFAULT_LANG;
    AppState.language = savedLang;
    updateLanguage(savedLang);
    
    // Load theme
    const savedTheme = localStorage.getItem('sdf_theme') || 'light';
    AppState.theme = savedTheme;
    updateTheme(savedTheme);
    
    // Load user data
    const savedUser = localStorage.getItem('sdf_user');
    if (savedUser) {
        try {
            AppState.user = JSON.parse(savedUser);
        } catch (e) {
            console.error('Error parsing user data:', e);
            localStorage.removeItem('sdf_user');
        }
    }
    
    // Load search history
    const savedHistory = localStorage.getItem('sdf_search_history');
    if (savedHistory) {
        try {
            AppState.searchHistory = JSON.parse(savedHistory);
        } catch (e) {
            console.error('Error parsing search history:', e);
        }
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile Menu Toggle
    if (DOM.menuToggle) {
        DOM.menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Modal Controls
    if (DOM.loginBtn) {
        DOM.loginBtn.addEventListener('click', () => showModal(DOM.loginModal));
    }
    
    if (DOM.signupBtn) {
        DOM.signupBtn.addEventListener('click', () => showModal(DOM.signupModal));
    }
    
    if (DOM.closeLogin) {
        DOM.closeLogin.addEventListener('click', () => hideModal(DOM.loginModal));
    }
    
    if (DOM.closeSignup) {
        DOM.closeSignup.addEventListener('click', () => hideModal(DOM.signupModal));
    }
    
    if (DOM.switchToSignup) {
        DOM.switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            hideModal(DOM.loginModal);
            showModal(DOM.signupModal);
        });
    }
    
    if (DOM.switchToLogin) {
        DOM.switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            hideModal(DOM.signupModal);
            showModal(DOM.loginModal);
        });
    }
    
    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target);
        }
    });
    
    // Form Submissions
    if (DOM.loginForm) {
        DOM.loginForm.addEventListener('submit', handleLogin);
    }
    
    if (DOM.signupForm) {
        DOM.signupForm.addEventListener('submit', handleSignup);
    }
    
    // Search Functionality
    if (DOM.heroSearchBtn) {
        DOM.heroSearchBtn.addEventListener('click', performSearch);
    }
    
    if (DOM.heroSearch) {
        DOM.heroSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }
    
    // Language Selector
    if (DOM.langBtn) {
        DOM.langBtn.addEventListener('click', toggleLanguageDropdown);
    }
    
    // Language Selection
    const langOptions = document.querySelectorAll('.lang-dropdown a');
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = option.getAttribute('data-lang');
            changeLanguage(lang);
            hideLanguageDropdown();
        });
    });
    
    // Search Suggestions
    DOM.suggestions.forEach(suggestion => {
        suggestion.addEventListener('click', (e) => {
            const keyword = e.target.getAttribute('data-keyword');
            DOM.heroSearch.value = keyword;
            performSearch();
        });
    });
    
    // CTA Buttons
    if (DOM.ctaSignup) {
        DOM.ctaSignup.addEventListener('click', () => showModal(DOM.signupModal));
    }
    
    if (DOM.ctaDemo) {
        DOM.ctaDemo.addEventListener('click', showDemo);
    }
    
    // Window resize
    window.addEventListener('resize', handleResize);
}

// Mobile Menu Functions
function toggleMobileMenu() {
    DOM.mobileMenu.classList.toggle('active');
    DOM.menuToggle.innerHTML = DOM.mobileMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
}

function closeMobileMenu() {
    DOM.mobileMenu.classList.remove('active');
    DOM.menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
}

// Modal Functions
function showModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Authentication Functions
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    showLoading();
    
    if (CONFIG.USE_MOCK_DATA) {
        // Mock login for demo
        setTimeout(() => {
            const mockUser = {
                id: Date.now(),
                email: email,
                name: email.split('@')[0],
                plan: 'free',
                joined: new Date().toISOString(),
                searches: 5,
                apiKey: null
            };
            
            AppState.user = mockUser;
            localStorage.setItem('sdf_user', JSON.stringify(mockUser));
            
            hideLoading();
            hideModal(DOM.loginModal);
            showToast('Login successful!', 'success');
            updateUI();
            
            // Track analytics
            if (CONFIG.ENABLE_ANALYTICS) {
                trackEvent('user_login', { method: 'email' });
            }
            
        }, 1500);
    } else {
        // Real API call
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                AppState.user = data.user;
                localStorage.setItem('sdf_user', JSON.stringify(data.user));
                
                hideModal(DOM.loginModal);
                showToast('Login successful!', 'success');
                updateUI();
            } else {
                showToast(data.error || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showToast('Network error. Please try again.', 'error');
        } finally {
            hideLoading();
        }
    }
}

async function handleSignup(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    showLoading();
    
    if (CONFIG.USE_MOCK_DATA) {
        // Mock signup for demo
        setTimeout(() => {
            const mockUser = {
                id: Date.now(),
                email: email,
                name: fullName,
                plan: 'free',
                joined: new Date().toISOString(),
                searches: 5,
                apiKey: null
            };
            
            AppState.user = mockUser;
            localStorage.setItem('sdf_user', JSON.stringify(mockUser));
            
            hideLoading();
            hideModal(DOM.signupModal);
            showToast('Account created successfully!', 'success');
            updateUI();
            
            // Track analytics
            if (CONFIG.ENABLE_ANALYTICS) {
                trackEvent('user_signup', { method: 'email' });
            }
            
        }, 1500);
    } else {
        // Real API call
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: fullName, 
                    email, 
                    password,
                    language: AppState.language
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                AppState.user = data.user;
                localStorage.setItem('sdf_user', JSON.stringify(data.user));
                
                hideModal(DOM.signupModal);
                showToast('Account created successfully!', 'success');
                updateUI();
            } else {
                showToast(data.error || 'Signup failed', 'error');
            }
        } catch (error) {
            console.error('Signup error:', error);
            showToast('Network error. Please try again.', 'error');
        } finally {
            hideLoading();
        }
    }
}

function logout() {
    AppState.user = null;
    localStorage.removeItem('sdf_user');
    updateUI();
    showToast('Logged out successfully', 'success');
    
    // Track analytics
    if (CONFIG.ENABLE_ANALYTICS) {
        trackEvent('user_logout');
    }
}

// Search Functions
async function performSearch() {
    const keyword = DOM.heroSearch.value.trim();
    
    if (!keyword) {
        showToast('Please enter a keyword to search', 'warning');
        return;
    }
    
    showLoading();
    
    // Add to search history
    addToSearchHistory(keyword);
    
    if (CONFIG.USE_MOCK_DATA) {
        // Mock search results
        setTimeout(() => {
            hideLoading();
            showSearchResults(keyword);
            
            // Track analytics
            if (CONFIG.ENABLE_ANALYTICS) {
                trackEvent('search_performed', { keyword: keyword });
            }
            
        }, 2000);
    } else {
        // Real API call
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/api/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    keyword: keyword,
                    language: AppState.language,
                    api_key: AppState.user?.apiKey
                })
            });
            
            const data = await response.json();
            hideLoading();
            
            if (data.success) {
                showSearchResults(keyword, data.analysis);
            } else {
                showToast(data.error || 'Search failed', 'error');
            }
        } catch (error) {
            console.error('Search error:', error);
            hideLoading();
            showToast('Network error. Please try again.', 'error');
            
            // Fallback to mock data
            showSearchResults(keyword);
        }
    }
}

function showSearchResults(keyword, data = null) {
    // Create results modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'resultsModal';
    
    if (data) {
        // Use real data
        modal.innerHTML = createResultsHTML(keyword, data);
    } else {
        // Use mock data
        const mockData = generateMockAnalysis(keyword);
        modal.innerHTML = createResultsHTML(keyword, mockData);
    }
    
    document.body.appendChild(modal);
    showModal(modal);
    
    // Add close functionality
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            document.body.removeChild(modal);
            hideModal(modal);
        }
    });
}

function createResultsHTML(keyword, analysis) {
    return `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>Analysis Results: "${keyword}"</h2>
            
            <div class="results-grid">
                <div class="result-card">
                    <h3><i class="fas fa-chart-line"></i> Demand Score</h3>
                    <div class="score">${analysis.demandScore || 85}%</div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${analysis.demandScore || 85}%"></div>
                    </div>
                </div>
                
                <div class="result-card">
                    <h3><i class="fas fa-users"></i> Competition</h3>
                    <div class="score">${analysis.competition || 'Low'}</div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${analysis.competitionScore || 40}%"></div>
                    </div>
                </div>
                
                <div class="result-card">
                    <h3><i class="fas fa-money-bill-wave"></i> Revenue Potential</h3>
                    <div class="score">${analysis.revenuePotential || '$2,000-5,000/mo'}</div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${analysis.revenueScore || 75}%"></div>
                    </div>
                </div>
            </div>
            
            <div class="insights-section">
                <h3><i class="fas fa-lightbulb"></i> Monetization Ideas</h3>
                <ul class="insights-list">
                    ${(analysis.monetizationIdeas || []).map(idea => `
                        <li>
                            <strong>${idea.title}</strong>
                            <p>${idea.description}</p>
                            <span class="revenue">${idea.revenue}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="saveSearch('${keyword}')">
                    <i class="fas fa-save"></i> Save Analysis
                </button>
                <button class="btn btn-outline" onclick="shareResults('${keyword}')">
                    <i class="fas fa-share"></i> Share
                </button>
            </div>
        </div>
    `;
}

function generateMockAnalysis(keyword) {
    const scores = {
        demandScore: Math.floor(Math.random() * 30) + 70, // 70-100
        competitionScore: Math.floor(Math.random() * 60) + 10, // 10-70
        revenueScore: Math.floor(Math.random() * 40) + 60 // 60-100
    };
    
    const competitionLevels = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
    const revenueLevels = ['$500-2,000/mo', '$2,000-5,000/mo', '$5,000-10,000/mo', '$10,000-20,000/mo'];
    
    return {
        demandScore: scores.demandScore,
        competition: competitionLevels[Math.floor(scores.competitionScore / 20)],
        competitionScore: scores.competitionScore,
        revenuePotential: revenueLevels[Math.floor(Math.random() * revenueLevels.length)],
        revenueScore: scores.revenueScore,
        monetizationIdeas: [
            {
                title: `Create ${keyword} Online Course`,
                description: `Teach others about ${keyword} through a comprehensive course`,
                revenue: '$2,000-5,000/mo'
            },
            {
                title: `${keyword} Affiliate Website`,
                description: `Review and recommend ${keyword} products with affiliate links`,
                revenue: '$1,000-3,000/mo'
            },
            {
                title: `${keyword} Consulting Services`,
                description: `Offer personalized ${keyword} consulting to businesses`,
                revenue: '$3,000-8,000/mo'
            }
        ]
    };
}

// Language Functions
function toggleLanguageDropdown() {
    DOM.langDropdown.style.display = DOM.langDropdown.style.display === 'block' ? 'none' : 'block';
}

function hideLanguageDropdown() {
    DOM.langDropdown.style.display = 'none';
}

async function changeLanguage(lang) {
    AppState.language = lang;
    localStorage.setItem('sdf_language', lang);
    
    // Update UI
    updateLanguage(lang);
    
    // Update flag
    const flagClass = getFlagClass(lang);
    DOM.langBtn.querySelector('.fi').className = flagClass;
    
    showToast(`Language changed to ${getLanguageName(lang)}`, 'success');
    
    // Track analytics
    if (CONFIG.ENABLE_ANALYTICS) {
        trackEvent('language_change', { language: lang });
    }
}

function updateLanguage(lang) {
    // In a real app, you would load translations from locales/{lang}.json
    // For now, we'll just update a few elements
    
    const translations = {
        en: {
            searchPlaceholder: 'Enter a keyword or topic...',
            searchButton: 'Find Hidden Demand'
        },
        hi: {
            searchPlaceholder: 'एक कीवर्ड या विषय दर्ज करें...',
            searchButton: 'छिपी मांग खोजें'
        },
        es: {
            searchPlaceholde
