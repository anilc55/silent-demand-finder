// Main JavaScript for Silent Demand Finder

// DOM Elements
const searchBtn = document.getElementById('searchBtn');
const keywordInput = document.getElementById('keywordInput');
const metricsSection = document.getElementById('metricsSection');
const findingsSection = document.getElementById('findingsSection');
const findingsGrid = document.getElementById('findingsGrid');
const currentKeyword = document.getElementById('currentKeyword');
const loadingOverlay = document.getElementById('loadingOverlay');
const paymentModal = document.getElementById('paymentModal');
const paymentAmount = document.getElementById('paymentAmount');
const paymentPlan = document.getElementById('paymentPlan');

// Global Variables
let selectedPlan = '';
let selectedGateway = 'razorpay';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    setupExampleTags();
    setupMobileMenu();
});

// Initialize Event Listeners
function initializeEventListeners() {
    // Search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Enter key in search input
    if (keywordInput) {
        keywordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Close modal on outside click
    if (paymentModal) {
        paymentModal.addEventListener('click', function(e) {
            if (e.target === paymentModal) {
                closePaymentModal();
            }
        });
    }
    
    // Gateway selection
    const gatewayOptions = document.querySelectorAll('input[name="gateway"]');
    gatewayOptions.forEach(option => {
        option.addEventListener('change', function() {
            selectedGateway = this.value;
            updateGatewaySelection();
        });
    });
}

// Setup Example Tags
function setupExampleTags() {
    const exampleTags = document.querySelectorAll('.example-tag');
    exampleTags.forEach(tag => {
        tag.addEventListener('click', function() {
            keywordInput.value = this.textContent;
            performSearch();
        });
    });
}

// Setup Mobile Menu
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Perform Search
function performSearch() {
    const keyword = keywordInput.value.trim();
    
    if (!keyword) {
        alert('Please enter a keyword to search');
        keywordInput.focus();
        return;
    }
    
    showLoading();
    
    // Update current keyword
    currentKeyword.textContent = keyword;
    
    // Show sections
    metricsSection.style.display = 'block';
    findingsSection.style.display = 'block';
    
    // Simulate API call delay
    setTimeout(() => {
        // Generate findings
        generateFindings(keyword);
        
        // Hide loading
        hideLoading();
        
        // Scroll to results
        metricsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Log search (for analytics)
        logSearch(keyword);
        
    }, 1500);
}

// Generate Findings
function generateFindings(keyword) {
    if (!findingsGrid) return;
    
    findingsGrid.innerHTML = '';
    
    const findings = [
        {
            type: 'why',
            title: `Why People Search "${keyword}"`,
            description: `Users secretly want to master ${keyword} but feel overwhelmed by complex information. They want simple, actionable steps that aren't publicly discussed.`,
            tags: ['Hidden Need', 'Emotional Search', 'Beginner Friendly'],
            color: '#3b82f6',
            icon: '❓'
        },
        {
            type: 'how',
            title: `How to Monetize "${keyword}"`,
            description: `Create micro-products addressing specific pain points. Use affiliate marketing with tools that people search for but can't find easily.`,
            tags: ['Monetization', 'Affiliate', 'Digital Product'],
            color: '#10b981',
            icon: '💰'
        },
        {
            type: 'problem',
            title: `Unspoken Problems in "${keyword}"`,
            description: `People struggle with implementation, not theory. They search for "done-for-you" solutions but find only theoretical advice.`,
            tags: ['Implementation', 'Solutions', 'Pain Points'],
            color: '#ef4444',
            icon: '⚠️'
        },
        {
            type: 'compare',
            title: `${keyword} vs Alternatives`,
            description: `Searchers compare options but find biased reviews. They want honest, side-by-side comparisons that aren't influenced by affiliate commissions.`,
            tags: ['Comparison', 'Review', 'Unbiased'],
            color: '#8b5cf6',
            icon: '⚖️'
        },
        {
            type: 'mistake',
            title: `Common Mistakes in ${keyword}`,
            description: `Beginners waste time on wrong approaches. They search for "shortcut methods" and "quick wins" that actually work but aren't shared publicly.`,
            tags: ['Mistakes', 'Shortcuts', 'Time-Saving'],
            color: '#f59e0b',
            icon: '🚫'
        },
        {
            type: 'secret',
            title: `Secret Strategies for ${keyword}`,
            description: `Advanced users search for loopholes and untapped methods not shared in public forums. These are high-value, low-competition opportunities.`,
            tags: ['Advanced', 'Secret', 'Untapped'],
            color: '#ec4899',
            icon: '🔒'
        }
    ];
    
    findings.forEach(finding => {
        const card = document.createElement('div');
        card.className = `finding-card finding-${finding.type}`;
        
        card.innerHTML = `
            <div class="finding-header">
                <div class="finding-icon" style="background: ${finding.color}">
                    ${finding.icon}
                </div>
                <h3 class="finding-title">${finding.title}</h3>
            </div>
            <p class="finding-description">${finding.description}</p>
            <div class="finding-tags">
                ${finding.tags.map(tag => `<span class="finding-tag">${tag}</span>`).join('')}
            </div>
            <div class="monetization-link">
                <button class="btn-monetize" onclick="showMonetization('${finding.type}', '${keyword}')">
                    <i class="fas fa-money-bill-wave"></i> Monetize This
                </button>
            </div>
        `;
        
        findingsGrid.appendChild(card);
    });
}

// Show Monetization Options
function showMonetization(type, keyword) {
    const monetizationLinks = {
        'why': {
            title: `Create a Course on "${keyword}"`,
            description: `People searching "why" want deep understanding. Create a course explaining the fundamentals.`,
            links: [
                { name: 'Udemy Course', url: 'https://www.udemy.com/create-course/', affiliate: true },
                { name: 'Teachable', url: 'https://teachable.com/', affiliate: true },
                { name: 'YouTube Monetization', url: 'https://www.youtube.com/creators/how-to/', affiliate: false }
            ]
        },
        'how': {
            title: `Monetize "${keyword}" Tutorials`,
            description: `"How-to" searches indicate buying intent. Create tutorials with affiliate links.`,
            links: [
                { name: 'Amazon Associates', url: 'https://affiliate-program.amazon.com/', affiliate: true },
                { name: 'ShareASale', url: 'https://www.shareasale.com/', affiliate: true },
                { name: 'ClickBank', url: 'https://www.clickbank.com/', affiliate: true }
            ]
        },
        'problem': {
            title: `Solve Problems in "${keyword}"`,
            description: `Create solutions for common problems. Sell templates, checklists, or consulting.`,
            links: [
                { name: 'Gumroad', url: 'https://gumroad.com/', affiliate: false },
                { name: 'Consulting Services', url: 'https://calendly.com/', affiliate: false },
                { name: 'Fiverr', url: 'https://www.fiverr.com/', affiliate: true }
            ]
        },
        'compare': {
            title: `Create Comparison Content`,
            description: `Build comparison sites or detailed reviews with affiliate links.`,
            links: [
                { name: 'Affiliate Comparison Site', url: 'https://wordpress.org/', affiliate: false },
                { name: 'Product Review Blog', url: 'https://www.blogger.com/', affiliate: false },
                { name: 'YouTube Comparisons', url: 'https://www.youtube.com/', affiliate: false }
            ]
        },
        'mistake': {
            title: `Avoid Mistakes Guide`,
            description: `Create checklists or courses showing how to avoid common mistakes.`,
            links: [
                { name: 'Ebook on Kindle', url: 'https://kdp.amazon.com/', affiliate: false },
                { name: 'Checklist Template', url: 'https://www.canva.com/', affiliate: true },
                { name: 'Workshop', url: 'https://zoom.us/', affiliate: false }
            ]
        },
        'secret': {
            title: `Premium Secrets Community`,
            description: `Create a paid community or newsletter sharing secret strategies.`,
            links: [
                { name: 'Patreon', url: 'https://www.patreon.com/', affiliate: false },
                { name: 'Substack', url: 'https://substack.com/', affiliate: false },
                { name: 'Discord Community', url: 'https://discord.com/', affiliate: false }
            ]
        }
    };
    
    const monetization = monetizationLinks[type];
    if (!monetization) return;
    
    let linksHTML = monetization.links.map(link => `
        <div class="monetization-option">
            <a href="${link.url}" target="_blank" class="monetization-link-item">
                ${link.name} ${link.affiliate ? '<span class="affiliate-badge">Affiliate</span>' : ''}
            </a>
            <button onclick="copyLink('${link.url}')" class="btn-copy-link">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `).join('');
    
    const modalHTML = `
        <div class="monetization-modal" id="monetizationModal">
            <div class="modal-content">
                <h3>${monetization.title}</h3>
                <p>${monetization.description}</p>
                <div class="monetization-links">
                    ${linksHTML}
                </div>
                <div class="modal-actions">
                    <button onclick="closeMonetizationModal()" class="btn-close">Close</button>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('monetizationModal');
    if (existingModal) existingModal.remove();
    
    // Add new modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = document.getElementById('monetizationModal');
    modal.style.display = 'flex';
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeMonetizationModal();
        }
    });
}

// Close Monetization Modal
function closeMonetizationModal() {
    const modal = document.getElementById('monetizationModal');
    if (modal) {
        modal.style.display = 'none';
        setTimeout(() => modal.remove(), 300);
    }
}

// Copy Link to Clipboard
function copyLink(url) {
    navigator.clipboard.writeText(url)
        .then(() => {
            alert('Link copied to clipboard!');
        })
        .catch(err => {
            console.error('Copy failed:', err);
            alert('Failed to copy link');
        });
}

// Payment Gateway Functions
function selectGateway(gateway) {
    selectedGateway = gateway;
    
    // Update UI
    const options = document.querySelectorAll('.payment-option');
    options.forEach(option => {
        if (option.onclick.toString().includes(gateway)) {
            option.style.background = '#667eea';
            option.style.color = 'white';
        } else {
            option.style.background = '#f1f5f9';
            option.style.color = 'inherit';
        }
    });
}

function processPayment(plan) {
    selectedPlan = plan;
    
    const prices = {
        'pro': 499,
        'enterprise': 1999
    };
    
    if (paymentAmount) paymentAmount.value = `₹${prices[plan]}`;
    if (paymentPlan) paymentPlan.value = plan.toUpperCase();
    
    // Show payment modal
    if (paymentModal) {
        paymentModal.style.display = 'flex';
    }
}

function updateGatewaySelection() {
    const gatewayOptions = document.querySelectorAll('.gateway-option');
    gatewayOptions.forEach(option => {
        const input = option.querySelector('input');
        if (input.value === selectedGateway) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function confirmPayment() {
    const amount = paymentAmount ? paymentAmount.value : '';
    const plan = paymentPlan ? paymentPlan.value : '';
    const gateway = selectedGateway;
    
    if (!amount || !plan || !gateway) {
        alert('Please complete payment details');
        return;
    }
    
    showLoading();
    
    // Simulate payment processing
    setTimeout(() => {
        hideLoading();
        closePaymentModal();
        
        // Show success message
        const successHTML = `
            <div class="payment-success">
                <div class="success-icon">✓</div>
                <h3>Payment Successful!</h3>
                <p>Your ${plan} plan has been activated.</p>
                <p>Gateway: ${gateway.toUpperCase()}</p>
                <p>Amount: ${amount}</p>
                <button onclick="closeSuccessModal()" class="btn-success">Continue</button>
            </div>
        `;
        
        // Remove existing success modal
        const existingSuccess = document.querySelector('.payment-success-overlay');
        if (existingSuccess) existingSuccess.remove();
        
        // Add success modal
        const overlay = document.createElement('div');
        overlay.className = 'payment-success-overlay';
        overlay.innerHTML = successHTML;
        document.body.appendChild(overlay);
        
    }, 2000);
}

function closePaymentModal() {
    if (paymentModal) {
        paymentModal.style.display = 'none';
    }
}

function closeSuccessModal() {
    const successModal = document.querySelector('.payment-success-overlay');
    if (successModal) {
        successModal.remove();
    }
}

// Admin Panel Redirect
function redirectToAdmin() {
    const password = prompt('Enter admin password:');
    // In production, use proper authentication
    if (password === 'admin123') {
        // Open admin panel in new tab
        window.open('admin/admin.html', '_blank');
    } else {
        alert('Invalid password! Contact administrator.');
    }
}

// Loading Functions
function showLoading() {
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
    }
}

function hideLoading() {
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

// Log Search (for analytics)
function logSearch(keyword) {
    const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    
    // Add new search
    searches.unshift({
        keyword: keyword,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    
    // Keep only last 10 searches
    if (searches.length > 10) {
        searches.pop();
    }
    
    // Save to localStorage
    localStorage.setItem('recentSearches', JSON.stringify(searches));
    
    // Log to console (for debugging)
    console.log(`Search logged: ${keyword}`);
}

// Security Functions
function generateSecurityToken() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const token = btoa(`${timestamp}-${random}-${navigator.userAgent}`);
    return token;
}

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize scroll to top button
function initScrollTop() {
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.onclick = scrollToTop;
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
}

// Initialize on page load
window.onload = function() {
    initScrollTop();
    
    // Check for saved searches
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    if (recentSearches.length > 0) {
        console.log('Recent searches:', recentSearches);
    }
};

// API Functions (for future integration)
async function callAPI(endpoint, data = {}) {
    showLoading();
    
    try {
        const response = await fetch(`/api/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        hideLoading();
        
        if (!response.ok) {
            throw new Error(result.error || 'API call failed');
        }
        
        return result;
    } catch (error) {
        hideLoading();
        console.error('API Error:', error);
        alert(`Error: ${error.message}`);
        throw error;
    }
}

// Export Data (for admin)
function exportData(format = 'json') {
    const data = {
        searches: JSON.parse(localStorage.getItem('recentSearches') || '[]'),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    
    let content, mimeType, fileName;
    
    switch(format) {
        case 'json':
            content = JSON.stringify(data, null, 2);
            mimeType = 'application/json';
            fileName = `silent-demand-data-${Date.now()}.json`;
            break;
        case 'csv':
            // Convert to CSV
            const csvRows = [];
            csvRows.push(['Keyword', 'Timestamp']);
            data.searches.forEach(search => {
                csvRows.push([search.keyword, search.timestamp]);
            });
            content = csvRows.map(row => row.join(',')).join('\n');
            mimeType = 'text/csv';
            fileName = `silent-demand-data-${Date.now()}.csv`;
            break;
        default:
            alert('Unsupported format');
            return;
    }
    
    // Create down
// ==================== API CONFIGURATION ====================
const API_CONFIG = {
    BASE_URL: 'http://localhost:5000/api',
    MOCK_MODE: true, // Start with mock data
    ENDPOINTS: {
        SEARCH: '/search',
        TRENDS: '/trends',
        MONETIZATION: '/monetization',
        GENERATE_KEY: '/generate_key',
        VALIDATE_KEY: '/validate_key',
        REGISTER: '/user/register',
        LOGIN: '/user/login',
        PAYMENT: '/payment/create'
    }
};

// ==================== API SERVICE ====================
class SilentDemandAPI {
    constructor() {
        this.baseUrl = API_CONFIG.BASE_URL;
        this.mockMode = API_CONFIG.MOCK_MODE;
    }
    
    // Search for keyword
    async searchKeyword(keyword, apiKey = null) {
        if (this.mockMode) {
            return this.mockSearch(keyword);
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    keyword: keyword,
                    api_key: apiKey
                })
            });
            
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return this.mockSearch(keyword);
        }
    }
    
    // Get trends
    async getTrends(keyword, days = 30) {
        try {
            const response = await fetch(
                `${this.baseUrl}/trends?keyword=${encodeURIComponent(keyword)}&days=${days}`
            );
            return await response.json();
        } catch (error) {
            return this.mockTrends(keyword);
        }
    }
    
    // Get monetization ideas
    async getMonetizationIdeas(keyword) {
        try {
            const response = await fetch(
                `${this.baseUrl}/monetization?keyword=${encodeURIComponent(keyword)}`
            );
            return await response.json();
        } catch (error) {
            return this.mockMonetization(keyword);
        }
    }
    
    // Generate API key
    async generateApiKey(userId, plan = 'free') {
        try {
            const response = await fetch(`${this.baseUrl}/generate_key`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    plan: plan
                })
            });
            
            return await response.json();
        } catch (error) {
            return this.mockApiKey(userId, plan);
        }
    }
    
    // Register user
    async registerUser(email, password, name) {
        try {
            const response = await fetch(`${this.baseUrl}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name
                })
            });
            
            return await response.json();
        } catch (error) {
            return this.mockRegister(email, name);
        }
    }
    
    // Login user
    async loginUser(email, password) {
        try {
            const response = await fetch(`${this.baseUrl}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            
            return await response.json();
        } catch (error) {
            return this.mockLogin(email, password);
        }
    }
    
    // Create payment
    async createPayment(userId, amount, plan, gateway) {
        try {
            const response = await fetch(`${this.baseUrl}/payment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    amount: amount,
                    plan: plan,
                    gateway: gateway
                })
            });
            
            return await response.json();
        } catch (error) {
            return this.mockPayment(userId, amount, plan);
        }
    }
    
    // ==================== MOCK DATA GENERATORS ====================
    mockSearch(keyword) {
        const demandScore = Math.floor(Math.random() * 50) + 50;
        const competitionScore = Math.floor(Math.random() * 60) + 10;
        const opportunityScore = Math.floor(Math.random() * 40) + 60;
        
        return {
            success: true,
            keyword: keyword,
            analysis: {
                demand_score: demandScore,
                competition_score: competitionScore,
                opportunity_score: opportunityScore,
                monetization_ideas: this.generateMockIdeas(keyword),
                recommendations: [
                    `Create beginner-friendly ${keyword} tutorials`,
                    `Build comparison articles for ${keyword} tools`,
                    `Develop case studies showing ${keyword} results`,
                    `Start affiliate marketing for ${keyword} products`
                ]
            }
        };
    }
    
    generateMockIdeas(keyword) {
        const ideas = [
            {
                title: `${keyword} Online Course`,
                revenue: `$${Math.floor(Math.random() * 5000) + 1000}/month`,
                difficulty: 'Medium',
                time: '2-4 weeks'
            },
            {
                title: `${keyword} Affiliate Website`,
                revenue: `$${Math.floor(Math.random() * 3000) + 500}/month`,
                difficulty: 'Easy',
                time: '1-2 weeks'
            },
            {
                title: `${keyword} Consulting`,
                revenue: `$${Math.floor(Math.random() * 10000) + 2000}/month`,
                difficulty: 'Hard',
                time: 'Ongoing'
            }
        ];
        
        return ideas.slice(0, Math.floor(Math.random() * 2) + 2);
    }
    
    mockTrends(keyword) {
        return {
            success: true,
            keyword: keyword,
            trends: {
                interest_over_time: Array.from({length: 12}, (_, i) => ({
                    date: `2024-${String(i+1).padStart(2, '0')}-01`,
                    value: Math.floor(Math.random() * 70) + 30
                })),
                related_queries: [
                    {query: `${keyword} tutorial`, value: 85},
                    {query: `learn ${keyword}`, value: 78},
                    {query: `${keyword} for beginners`, value: 92},
                    {query: `best ${keyword} tools`, value: 67}
                ]
            }
        };
    }
    
    mockMonetization(keyword) {
        return {
            success: true,
            keyword: keyword,
            monetization_ideas: this.generateMockIdeas(keyword)
        };
    }
    
    mockApiKey(userId, plan) {
        const key = `mock_${userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return {
            success: true,
            api_key: key,
            plan: plan,
            limits: {
                daily_limit: plan === 'pro' ? 100 : 10,
                monthly_limit: plan === 'pro' ? 1000 : 100
            }
        };
    }
    
    mockRegister(email, name) {
        return {
            success: true,
            user_id: `user_${Date.now()}`,
            email: email,
            name: name,
            plan: 'free'
        };
    }
    
    mockLogin(email, password) {
        if (email && password) {
            return {
                success: true,
                user_id: `user_${Date.now()}`,
                email: email,
                name: email.split('@')[0],
                plan: 'free'
            };
        }
        return {success: false, error: 'Invalid credentials'};
    }
    
    mockPayment(userId, amount, plan) {
        return {
            success: true,
            payment_id: `pay_${Date.now()}`,
            payment_url: '#',
            amount: amount,
            plan: plan,
            status: 'pending'
        };
    }
}

// ==================== INTEGRATE WITH EXISTING CODE ====================
// Initialize API
const api = new SilentDemandAPI();

// Update search function
async function performSearch() {
    const keyword = document.getElementById('keywordInput').value.trim();
    if (!keyword) {
        alert('Please enter a keyword');
        return;
    }
    
    showLoading();
    
    try {
        // Get current user's API key if available
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const apiKey = user.apiKey;
        
        // Call API
        const result = await api.searchKeyword(keyword, apiKey);
        
        // Update UI
        updateAnalysisResults(keyword, result.analysis);
        showFindings(keyword, result.analysis);
        
    } catch (error) {
        console.error('Search error:', error);
        // Fallback to mock
        updateAnalysisResults(keyword);
        showFindings(keyword);
    } finally {
        hideLoading();
    }
}

// Update login function
async function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        alert('Please fill all fields');
        return;
    }
    
    const result = await api.loginUser(email, password);
    
    if (result.success) {
        currentUser = {
            id: result.user_id,
            name: result.name,
            email: result.email,
            plan: result.plan,
            apiKey: result.api_key
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUIForLoggedInUser();
        closeModal('loginModal');
        alert('Login successful!');
    } else {
        alert(result.error || 'Login failed');
    }
}

// Update signup function
async function handleSignup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    const result = await api.registerUser(email, password, name);
    
    if (result.success) {
        currentUser = {
            id: result.user_id,
            name: result.name,
            email: result.email,
            plan: result.plan
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUIForLoggedInUser();
        closeModal('signupModal');
        alert('Account created successfully!');
    } else {
        alert(result.error || 'Signup failed');
    }
}

// Generate API key
async function generateApiKey(type) {
    if (!currentUser) {
        openLoginModal();
        return;
    }
    
    const result = await api.generateApiKey(currentUser.id, type);
    
    if (result.success) {
        // Store API key
        currentUser.apiKey = result.api_key;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Show key to user
        alert(`API Key Generated:\n\n${result.api_key}\n\nKeep this key secret!`);
        
        // Update API keys list
        loadApiKeys();
    }
}

// Process payment
async function processPayment(plan, amount) {
    if (!currentUser) {
        openLoginModal();
        return;
    }
    
    currentPayment.plan = plan;
    currentPayment.amount = amount;
    
    // Get selected gateway
    const gateway = document.querySelector('input[name="gateway"]:checked').value;
    
    const result = await api.createPayment(currentUser.id, amount, plan, gateway);
    
    if (result.success) {
        if (gateway === 'bank') {
            showBankDetails(amount, plan);
        } else {
            alert(`Payment initiated! Payment ID: ${result.payment_id}`);
            // Redirect to payment URL
            if (result.payment_url !== '#') {
                window.open(result.payment_url, '_blank');
            }
        }
        
        // Update user plan
        currentUser.plan = plan;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

// ==================== UPDATE EXISTING FUNCTIONS ====================
// Replace existing search function
document.getElementById('searchBtn').addEventListener('click', performSearch);

// Update search input to work with Enter key
document.getElementById('keywordInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') performSearch();
});

// Update login form
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    handleLogin();
});

// Update signup form
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    handleSignup();
});

// Update API key generation
function generateApiKeyWrapper(type) {
    generateApiKey(type);
}

// Update payment processing
function processPaymentWrapper(plan, amount) {
    processPayment(plan, amount);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Silent Demand Finder API Ready!');
    console.log('Mode:', API_CONFIG.MOCK_MODE ? 'Mock Mode' : 'Real API Mode');
    
    // Auto-start backend check
    checkBackendStatus();
});

// Check if backend is running
async function checkBackendStatus() {
    try {
        const response = await fetch('http://localhost:5000/');
        const data = await response.json();
        
        if (data.status === 'active') {
            console.log('✅ Backend API is running');
            API_CONFIG.MOCK_MODE = false;
            
            // Update API instance
            api.mockMode = false;
            api.baseUrl = 'http://localhost:5000/api';
        }
    } catch (error) {
        console.log('⚠️ Using mock data mode. Start backend with: python backend/server.py');
    }
                        }
