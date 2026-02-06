// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = '#fff';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        navLinks.style.zIndex = '1000';
    });
}

// Language Selector
const languageSelect = document.getElementById('languageSelect');
if (languageSelect) {
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        alert(`Language changed to: ${this.options[this.selectedIndex].text}`);
        // Here you would typically implement actual language switching
    });
}

// Search Functionality
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-box input');

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Searching for: "${query}"\n(Search functionality would connect to backend)`);
            // Here you would implement actual search
        } else {
            searchInput.focus();
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// Upgrade Button Functionality
const upgradeBtns = document.querySelectorAll('.upgrade-plan-btn, .upgrade-btn:not(.login-btn)');
upgradeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        alert('Redirecting to payment page...');
        // Here you would redirect to payment page
    });
});

// Plan Selection
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('upgrade-plan-btn') && 
            !e.target.classList.contains('contact-btn')) {
            // Highlight selected plan (for visual feedback)
            pricingCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // Add visual indicator
            const planName = this.querySelector('h3').textContent;
            console.log(`Selected plan: ${planName}`);
        }
    });
});

// Contact Sales Button
const contactBtn = document.querySelector('.contact-btn');
if (contactBtn) {
    contactBtn.addEventListener('click', function() {
        alert('Please contact our sales team at: sales@silentdemandfinder.com');
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Current Year for Copyright
const yearSpan = document.querySelector('#current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Form Validation for Future Forms
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#e74c3c';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Initialize any tooltips or popovers
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
    console.log('Silent Demand Finder loaded successfully!');
    
    // Example: Auto-hide mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-btn') &&
            navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.backgroundColor = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.boxShadow = 'none';
        } else {
            navLinks.style.display = 'none';
        }
    });
});
