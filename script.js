// ===== MAIN SCRIPT FOR SILENT DEMAND FINDER =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

// ===== APPLICATION INITIALIZATION =====
function initApp() {
    console.log('Silent Demand Finder Initialized');
    
    // Initialize all modules
    initMobileMenu();
    initSearch();
    initAnimations();
    initAnalytics();
    initTooltips();
    
    // Load initial data
    loadInitialData();
}

// ===== MOBILE MENU TOGGLE =====
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Change icon based on state
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// ===== SEARCH FUNCTIONALITY =====
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput && searchBtn) {
        // Search on button click
        searchBtn.addEventListener('click', performSearch);
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Add autocomplete suggestions
        initAutocomplete(searchInput);
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput.value.trim();
    
    if (!keyword) {
        showNotification('Please enter a keyword to search', 'error');
        searchInput.focus();
        return;
    }
    
    // Show loading state
    const originalBtnText = searchBtn.innerHTML;
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    searchBtn.disabled = true;
    
    // Call search API
    searchKeyword(keyword)
        .then(data => {
            // Update UI with search results
            updateSearchResults(data);
            showNotification(`Found ${data.resultsCount} hidden opportunities for "${keyword}"`, 'success');
            
            // Add to search history
            addToSearchHistory(keyword, data);
        })
        .catch(error => {
            console.error('Search error:', error);
            showNotification('Error performing search. Please try again.', 'error');
            
            // Show demo data
            showDemoData(keyword);
        })
        .finally(() => {
            // Restore button state
            searchBtn.innerHTML = originalBtnText;
            searchBtn.disabled = false;
        });
}

// ===== API INTEGRATION =====
async function searchKeyword(keyword) {
    // For demo purposes - replace with actual API call
    const mockApiDelay = 1500; // 1.5 seconds
    
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock API response
            resolve({
                keyword: keyword,
                timestamp: new Date().toISOString(),
                resultsCount: Math.floor(Math.random() * 50) + 20,
                metrics: {
                    demandScore: Math.floor(Math.random() * 30) + 70,
                    competitionScore: Math.floor(Math.random() * 60) + 20,
                    monetizationPotential: Math.floor(Math.random() * 40) + 60,
                    trendVelocity: Math.floor(Math.random() * 50) + 30
                },
                findings: generateMockFindings(keyword),
                suggestions: [
                    `Create beginner guide for ${keyword}`,
                    `Start YouTube channel on ${keyword} tutorials`,
                    `Build community for ${keyword} learners`,
                    `Develop ${keyword} tool with freemium model`
                ],
                relatedKeywords: [
                    `${keyword} for beginners`,
                    `${keyword} tutorial`,
                    `learn ${keyword}`,
                    `${keyword} tools`,
                    `${keyword} alternatives`
                ]
            });
        }, mockApiDelay);
    });
}

function generateMockFindings(keyword) {
    const categories = ['WHY', 'HOW', 'PROBLEM', 'COMPARE', 'MISTAKE', 'SECRET'];
    
    return categories.map(category => ({
        category: category,
        title: getCategoryTitle(category, keyword),
        description: getCategoryDescription(category, keyword),
        monthlySearches: Math.floor(Math.random() * 5000) + 1000,
        competition: Math.floor(Math.random() * 60) + 20,
        opportunityScore: Math.floor(Math.random() * 40) + 60
    }));
}

function getCategoryTitle(category, keyword) {
    const titles = {
        'WHY': `Why people secretly search "${keyword}"`,
        'HOW': `How beginners actually learn "${keyword}"`,
        'PROBLEM': `Real problems with "${keyword}" no one discusses`,
        'COMPARE': `${keyword} vs alternatives - hidden comparisons`,
        'MISTAKE': `Common "${keyword}" mistakes that waste money`,
        'SECRET': `Professional "${keyword}" tricks never shared`
    };
    return titles[category] || `Unknown category for ${keyword}`;
}

function getCategoryDescription(category, keyword) {
    const descriptions = {
        'WHY': `People feel insecure asking about ${keyword} publicly but search extensively in private.`,
        'HOW': `Beginners need step-by-step guidance that existing content doesn't provide clearly.`,
        'PROBLEM': `Real pain points with ${keyword} that users hesitate to discuss openly.`,
        'COMPARE': `Secret comparisons users make between ${keyword} and alternatives.`,
        'MISTAKE': `Costly errors beginners make when starting with ${keyword}.`,
        'SECRET': `Advanced techniques professionals use but don't share publicly.`
    };
    return descriptions[category] || `Description for ${keyword}`;
}

// ===== UI UPDATES =====
function updateSearchResults(data) {
    // Update metrics cards
    updateMetrics(data.metrics);
    
    // Update findings cards
    updateFindings(data.findings);
    
    // Update keyword display
    updateKeywordDisplay(data.keyword);
    
    // Show results section if hidden
    const resultsSection = document.querySelector('.findings-section');
    if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function updateMetrics(metrics) {
    const metricCards = document.querySelectorAll('.metric-card');
    
    metricCards.forEach((card, index) => {
        const valueElement = card.querySelector('.metric-value');
        const tagElement = card.querySelector('.metric-tag');
        
        if (valueElement && tagElement) {
            switch(index) {
                case 0: // Demand Type
                    valueElement.textContent = metrics.demandScore >= 70 ? 'High +' : 'Medium';
                    tagElement.textContent = 'Silent Search';
                    break;
                case 1: // Intent Level
                    valueElement.textContent = metrics.monetizationPotential >= 60 ? 'High +' : 'Medium';
                    tagElement.textContent = 'Monetizable';
                    break;
                case 2: // Competition
                    valueElement.textContent = metrics.competitionScore <= 50 ? 'Low' : 'Medium';
                    tagElement.textContent = 'Opportunity';
                    break;
                case 3: // Status
                    valueElement.textContent = 'AI + Real-time';
                    tagElement.textContent = 'Live Analysis';
                    break;
            }
        }
    });
}

function updateFindings(findings) {
    const findingCards = document.querySelectorAll('.finding-card');
    
    findingCards.forEach((card, index) => {
        if (findings[index]) {
            const finding = findings[index];
            const titleElement = card.querySelector('.finding-title');
            const descElement = card.querySelector('.finding-desc');
            const exampleElement = card.querySelector('.finding-example');
            
            if (titleElement) titleElement.textContent = finding.title;
            if (descElement) descElement.textContent = finding.description;
            if (exampleElement) {
                exampleElement.innerHTML = `<strong>Opportunity:</strong> ${finding.monthlySearches.toLocaleString()} monthly silent searches`;
            }
        }
    });
}

function updateKeywordDisplay(keyword) {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const highlightElement = heroTitle.querySelector('.highlight');
        if (highlightElement) {
            highlightElement.textContent = `"${keyword}" secretly searched`;
        }
    }
}

// ===== DEMO DATA (Fallback) =====
function showDemoData(keyword) {
    const demoData = {
        keyword: keyword,
        metrics: {
            demandScore: 85,
            competitionScore: 35,
            monetizationPotential: 78,
            trendVelocity: 42
        },
        findings: generateMockFindings(keyword)
    };
    
    updateSearchResults(demoData);
}

// ===== AUTOCOMPLETE =====
function initAutocomplete(inputElement) {
    const suggestions = [
        'AI', 'Artificial Intelligence', 'Machine Learning',
        'YouTube', 'Content Creation', 'Monetization',
        'Marketing', 'Digital Marketing', 'Social Media',
        'Jobs', 'Remote Work', 'Freelancing',
        'Fitness', 'Health', 'Wellness',
        'Crypto', 'Bitcoin', 'Blockchain',
        'Programming', 'Web Development', 'Coding',
        'Business', 'Startup', 'Entrepreneurship'
    ];
    
    let currentFocus = -1;
    
    inputElement.addEventListener('input', function() {
        const val = this.value;
        closeAllLists();
        
        if (!val) return false;
        
        currentFocus = -1;
        
        // Create autocomplete container
        const listContainer = document.createElement('div');
        listContainer.setAttribute('id', this.id + '-autocomplete-list');
        listContainer.setAttribute('class', 'autocomplete-items');
        this.parentNode.appendChild(listContainer);
        
        // Add matching suggestions
        suggestions.forEach(suggestion => {
            if (suggestion.toLowerCase().includes(val.toLowerCase())) {
                const item = document.createElement('div');
                item.innerHTML = `<strong>${suggestion.substring(0, val.length)}</strong>`;
                item.innerHTML += suggestion.substring(val.length);
                item.innerHTML += `<input type='hidden' value='${suggestion}'>`;
                
                item.addEventListener('click', function() {
                    inputElement.value = this.getElementsByTagName('input')[0].value;
                    closeAllLists();
                });
                
                listContainer.appendChild(item);
            }
        });
    });
    
    inputElement.addEventListener('keydown', function(e) {
        const items = document.getElementById(this.id + '-autocomplete-list');
        if (items) items = items.getElementsByTagName('div');
        
        if (e.keyCode == 40) { // Down arrow
            currentFocus++;
            addActive(items);
        } else if (e.keyCode == 38) { // Up arrow
            currentFocus--;
            addActive(items);
        } else if (e.keyCode == 13) { // Enter
            e.preventDefault();
            if (currentFocus > -1 && items) {
                items[currentFocus].click();
            }
        }
    });
    
    function addActive(items) {
        if (!items) return false;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = items.length - 1;
        items[currentFocus].classList.add('autocomplete-active');
    }
    
    function removeActive(items) {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('autocomplete-active');
        }
    }
    
    function closeAllLists() {
        const items = document.getElementsByClassName('autocomplete-items');
        for (let i = 0; i < items.length; i++) {
            items[i].parentNode.removeChild(items[i]);
        }
    }
    
    // Close autocomplete when clicking outside
    document.addEventListener('click', function() {
        closeAllLists();
    });
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
        }
    `;
    document.head.appendChild(style);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Add animation classes on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.metric-card, .finding-card').forEach(el => {
        observer.observe(el);
    });
    
    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .metric-card, .finding-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .metric-card.animate-in, .finding-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .metric-card:nth-child(1) { transition-delay: 0.1s; }
        .metric-card:nth-child(2) { transition-delay: 0.2s; }
        .metric-card:nth-child(3) { transition-delay: 0.3s; }
        .metric-card:nth-child(4) { transition-delay: 0.4s; }
        
        .finding-card:nth-child(1) { transition-delay: 0.1s; }
        .finding-card:nth-child(2) { transition-delay: 0.2s; }
        .finding-card:nth-child(3) { transition-delay: 0.3s; }
        .finding-card:nth-child(4) { transition-delay: 0.4s; }
        .finding-card:nth-child(5) { transition-delay: 0.5s; }
        .finding-card:nth-child(6) { transition-delay: 0.6s; }
    `;
    document.head.appendChild(animationStyle);
}

// ===== ANALYTICS =====
function initAnalytics() {
    // Track page views
    trackPageView();
    
    // Track button clicks
    document.querySelectorAll('.btn-primary, .search-btn, .finding-btn').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('button_click', {
                button_text: this.textContent.trim(),
                button_type: this.className
            });
        });
    });
    
    // Track search submissions
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            trackEvent('search_input', {
                character_count: this.value.length
            });
        });
    }
}

function trackPageView() {
    // Simulate analytics tracking
    console.log(`Page viewed: ${window.location.pathname}`);
    
    // In production, you would send to Google Analytics, etc.
    // Example: gtag('config', 'GA_MEASUREMENT_ID');
}

function trackEvent(eventName, eventData = {}) {
    // Simulate event tracking
    console.log(`Event: ${eventName}`, eventData);
    
    // In production:
    // gtag('event', eventName, eventData);
}

// ===== TOOLTIPS =====
function initTooltips() {
    // Add tooltips to elements with data-tooltip attribute
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const tooltipText = event.target.getAttribute('data-tooltip');
    if (!tooltipText) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = event.target.getBoundingClientRect();
    tooltip.style.position = 'fixed';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    
    // Add styles
    tooltip.style.cssText += `
        background: #1e293b;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.85rem;
        z-index: 1000;
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    // Add a
