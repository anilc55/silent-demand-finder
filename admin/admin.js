// Admin Panel JavaScript - Silent Demand Finder

// Admin State Management
let adminState = {
    isLoggedIn: false,
    currentSection: 'dashboard',
    users: [],
    payments: [],
    apiKeys: [],
    notifications: []
};

// DOM Elements
let domElements = {};

// Initialize Admin Panel
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    checkAdminLogin();
    setupEventListeners();
    loadInitialData();
});

// Initialize DOM Elements
function initializeElements() {
    // Login Page Elements
    domElements.loginScreen = document.getElementById('loginScreen');
    domElements.adminPanel = document.getElementById('adminPanel');
    domElements.loginForm = document.getElementById('loginForm');
    domElements.loginError = document.getElementById('loginError');
    
    // Admin Panel Elements
    domElements.sidebar = document.querySelector('.sidebar');
    domElements.mainContent = document.querySelector('.main-content');
    domElements.sidebarToggle = document.querySelector('.sidebar-toggle');
    domElements.menuLinks = document.querySelectorAll('.menu-link');
    domElements.sections = document.querySelectorAll('.section');
    domElements.logoutBtn = document.querySelector('.logout-btn');
    
    // Dashboard Elements
    domElements.statValues = {
        totalUsers: document.getElementById('totalUsers'),
        totalRevenue: document.getElementById('totalRevenue'),
        apiRequests: document.getElementById('apiRequests'),
        totalSearches: document.getElementById('totalSearches')
    };
    
    // Table Elements
    domElements.usersTable = document.getElementById('usersTable');
    domElements.paymentsTable = document.getElementById('paymentsTable');
    domElements.apiKeysTable = document.getElementById('apiKeysTable');
    
    // Modal Elements
    domElements.modal = document.getElementById('modal');
    domElements.modalTitle = document.getElementById('modalTitle');
    domElements.modalBody = document.getElementById('modalBody');
    domElements.closeModal = document.querySelector('.close-modal');
    domElements.modalCancel = document.querySelector('.btn-cancel');
    domElements.modalConfirm = document.querySelector('.btn-confirm');
    
    // Loading Spinner
    domElements.loadingSpinner = document.querySelector('.loading-spinner');
}

// Check Admin Login Status
function checkAdminLogin() {
    const adminToken = localStorage.getItem('adminToken');
    const adminExpiry = localStorage.getItem('adminExpiry');
    
    if (adminToken && adminExpiry && new Date().getTime() < parseInt(adminExpiry)) {
        adminState.isLoggedIn = true;
        showAdminPanel();
    } else {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminExpiry');
        showLoginScreen();
    }
}

// Show Login Screen
function showLoginScreen() {
    if (domElements.loginScreen) {
        domElements.loginScreen.style.display = 'block';
    }
    if (domElements.adminPanel) {
        domElements.adminPanel.style.display = 'none';
    }
}

// Show Admin Panel
function showAdminPanel() {
    if (domElements.loginScreen) {
        domElements.loginScreen.style.display = 'none';
    }
    if (domElements.adminPanel) {
        domElements.adminPanel.style.display = 'block';
        loadDashboardData();
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Login Form
    if (domElements.loginForm) {
        domElements.loginForm.addEventListener('submit', handleLogin);
    }
    
    // Sidebar Toggle
    if (domElements.sidebarToggle) {
        domElements.sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Menu Links
    domElements.menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            switchSection(sectionId);
        });
    });
    
    // Logout Button
    if (domElements.logoutBtn) {
        domElements.logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Modal Close
    if (domElements.closeModal) {
        domElements.closeModal.addEventListener('click', closeModal);
    }
    
    if (domElements.modalCancel) {
        domElements.modalCancel.addEventListener('click', closeModal);
    }
    
    // Modal Confirm
    if (domElements.modalConfirm) {
        domElements.modalConfirm.addEventListener('click', handleModalConfirm);
    }
    
    // Close modal on outside click
    window.addEventListener('click', function(e) {
        if (e.target === domElements.modal) {
            closeModal();
        }
    });
}

// Handle Login
async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    // Show loading
    showLoading();
    
    try {
        // For demo purposes, using mock login
        // In production, this would be an API call
        
        if (username === 'admin' && password === 'admin123') {
            // Generate token and expiry (24 hours)
            const token = 'admin_token_' + Date.now();
            const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
            
            localStorage.setItem('adminToken', token);
            localStorage.setItem('adminExpiry', expiry.toString());
            
            adminState.isLoggedIn = true;
            showAdminPanel();
            
            showNotification('Login successful!', 'success');
        } else {
            if (domElements.loginError) {
                domElements.loginError.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Login failed. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

// Handle Logout
function handleLogout() {
    showModal(
        'Confirm Logout',
        'Are you sure you want to logout?',
        function() {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminExpiry');
            adminState.isLoggedIn = false;
            showLoginScreen();
            showNotification('Logged out successfully', 'success');
        }
    );
}

// Toggle Sidebar
function toggleSidebar() {
    if (domElements.sidebar) {
        domElements.sidebar.classList.toggle('active');
    }
}

// Switch Section
function switchSection(sectionId) {
    // Update active menu link
    domElements.menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
    
    // Show selected section
    domElements.sections.forEach(section => {
        section.style.display = 'none';
        if (section.id === sectionId + 'Section') {
            section.style.display = 'block';
        }
    });
    
    // Update current section
    adminState.currentSection = sectionId;
    
    // Load section data
    switch(sectionId) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'users':
            loadUsersData();
            break;
        case 'payments':
            loadPaymentsData();
            break;
        case 'api':
            loadApiKeysData();
            break;
        case 'settings':
            loadSettingsData();
            break;
    }
}

// Load Initial Data
async function loadInitialData() {
    // Load mock data for demonstration
    adminState.users = generateMockUsers();
    adminState.payments = generateMockPayments();
    adminState.apiKeys = generateMockApiKeys();
    adminState.notifications = generateMockNotifications();
}

// Load Dashboard Data
async function loadDashboardData() {
    // Update stats
    if (domElements.statValues.totalUsers) {
        domElements.statValues.totalUsers.textContent = adminState.users.length;
    }
    
    if (domElements.statValues.totalRevenue) {
        const totalRevenue = adminState.payments
            .filter(p => p.status === 'completed')
            .reduce((sum, p) => sum + p.amount, 0);
        domElements.statValues.totalRevenue.textContent = `$${totalRevenue}`;
    }
    
    if (domElements.statValues.apiRequests) {
        const totalRequests = adminState.apiKeys.reduce((sum, key) => sum + key.usage, 0);
        domElements.statValues.apiRequests.textContent = totalRequests.toLocaleString();
    }
    
    if (domElements.statValues.totalSearches) {
        const totalSearches = adminState.users.reduce((sum, user) => sum + (user.searches || 0), 0);
        domElements.statValues.totalSearches.textContent = totalSearches.toLocaleString();
    }
    
    // Update charts
    updateRevenueChart();
    updateUserGrowthChart();
    
    // Update recent activities
    updateRecentActivities();
}

// Load Users Data
function loadUsersData() {
    if (!domElements.usersTable) return;
    
    const tbody = domElements.usersTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    adminState.users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="user-info">
                    <div class="user-avatar">
                        ${user.name.charAt(0)}
                    </div>
                    <div>
                        <strong>${user.name}</strong><br>
                        <small>${user.email}</small>
                    </div>
                </div>
            </td>
            <td>${user.plan}</td>
            <td>${user.searches || 0}</td>
            <td>${new Date(user.joined).toLocaleDateString()}</td>
            <td>
                <span class="status ${user.status}">${user.status}</span>
            </td>
            <td>
                <div class="actions">
                    <button class="action-btn" onclick="editUser('${user.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn" onclick="deleteUser('${user.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load Payments Data
function loadPaymentsData() {
    if (!domElements.paymentsTable) return;
    
    const tbody = domElements.paymentsTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    adminState.payments.forEach(payment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${payment.id}</td>
            <td>${payment.userEmail}</td>
            <td>$${payment.amount}</td>
            <td>${payment.plan}</td>
            <td>${payment.gateway}</td>
            <td>${new Date(payment.date).toLocaleDateString()}</td>
            <td>
                <span class="status ${payment.status}">${payment.status}</span>
            </td>
            <td>
                <button class="action-btn" onclick="viewPayment('${payment.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load API Keys Data
function loadApiKeysData() {
    if (!domElements.apiKeysTable) return;
    
    const tbody = domElements.apiKeysTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    adminState.apiKeys.forEach(key => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><code>${key.key.substring(0, 20)}...</code></td>
            <td>${key.userEmail}</td>
            <td>${key.plan}</td>
            <td>${key.usage}</td>
            <td>${key.limit}</td>
            <td>${new Date(key.created).toLocaleDateString()}</td>
            <td>
                <span class="status ${key.status}">${key.status}</span>
            </td>
            <td>
                <div class="actions">
                    <button class="action-btn" onclick="copyApiKey('${key.key}')">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="action-btn" onclick="revokeApiKey('${key.id}')">
                        <i class="fas fa-ban"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load Settings Data
function loadSettingsData() {
    // Load settings from localStorage or default values
    const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
    
    document.getElementById('siteTitle').value = settings.siteTitle || 'Silent Demand Finder';
    document.getElementById('siteEmail').value = settings.siteEmail || 'admin@silentdemand.com';
    document.getElementById('currency').value = settings.currency || 'USD';
    document.getElementById('timezone').value = settings.timezone || 'UTC';
    
    // Payment gateways
    document.getElementById('razorpayEnabled').checked = settings.razorpayEnabled !== false;
    document.getElementById('paypalEnabled').checked = settings.paypalEnabled !== false;
    document.getElementById('stripeEnabled').checked = settings.stripeEnabled !== false;
}

// Save Settings
function saveSettings() {
    const settings = {
        siteTitle: document.getElementById('siteTitle').value,
        siteEmail: document.getElementById('siteEmail').value,
        currency: document.getElementById('currency').value,
        timezone: document.getElementById('timezone').value,
        razorpayEnabled: document.getElementById('razorpayEnabled').checked,
        paypalEnabled: document.getElementById('paypalEnabled').checked,
        stripeEnabled: document.getElementById('stripeEnabled').checked
    };
    
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    showNotification('Settings saved successfully!', 'success');
}

// Show Modal
function showModal(title, content, onConfirm = null) {
    if (domElements.modalTitle) {
        domElements.modalTitle.textContent = title;
    }
    
    if (domElements.modalBody) {
        domElements.modalBody.innerHTML = content;
    }
    
    if (domElements.modal) {
        domElements.modal.style.display = 'flex';
    }
    
    // Store confirm callback
    if (onConfirm) {
        domElements.modalConfirm.onclick = function() {
            onConfirm();
            closeModal();
        };
    }
}

// Close Modal
function closeModal() {
    if (domElements.modal) {
        domElements.modal.style.display = 'none';
    }
}

// Handle Modal Confirm
function handleModalConfirm() {
    // This is set dynamically by showModal
    closeModal();
}

// Show Loading Spinner
function showLoading() {
    if (domElements.loadingSpinner) {
        domElements.loadingSpinner.style.display = 'flex';
    }
}

// Hide Loading Spinner
function hideLoading() {
    if (domElements.loadingSpinner) {
        domElements.loadingSpinner.style.display = 'none';
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 9999;
                animation: slideIn 0.3s ease;
            }
            .notification-success { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
            .notification-error { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
            .notification-info { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); }
            .notification button {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Generate Mock Data
function generateMockUsers() {
    return [
        { id: '1', name: 'John Doe', email: 'john@example.com', plan: 'pro', searches: 47, joined: '2024-01-15', status: 'active' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', plan: 'free', searches: 12, joined: '2024-01-20', status: 'active' },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com', plan: 'enterprise', searches: 156, joined: '2024-01-05', status: 'active' },
        { id: '4', name: 'Alice Brown', email: 'alice@example.com', plan: 'pro', searches: 89, joined: '2024-01-25', status: 'inactive' },
        { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', plan: 'free', searches: 5, joined: '2024-02-01', status: 'active' }
    ];
}

function generateMockPayments() {
    return [
        { id: 'PAY001', userEmail: 'john@example.com', amount: 9, plan: 'pro', gateway: 'stripe', date: '2024-01-15', status: 'completed' },
        { id: 'PAY002', userEmail: 'bob@example.com', amount: 29, plan: 'enterprise', gateway: 'paypal', date: '2024-01-05', status: 'completed' },
        { id: 'PAY003', userEmail: 'alice@example.com', amount: 9, plan: 'pro', gateway: 'razorpay', date: '2024-01-25', status: 'pending' },
        { id: 'PAY004', userEmail: 'john@example.com', amount: 9, plan: 'pro', gateway: 'stripe', date: '2024-02-15', status: 'completed' }
    ];
}

function generateMockApiKeys() {
    return [
        { id: '1', key: 'sdf_abc123xyz4567890', userEmail: 'john@example.com', plan: 'pro', usage: 156, limit: 1000, created: '2024-01-15', status: 'active' },
        { id: '2', key: 'sdf_def456uvw7890123', userEmail: 'bob@example.com', plan: 'enterprise', usage: 2345, limit: 10000, created: '2024-01-05', status: 'active' },
        { id: '3', key: 'sdf_ghi789rst0123456', userEmail: 'alice@example.com', plan: 'pro', usage: 45, limit: 1000, created: '2024-01-25', status: 'revoked' }
    ];
}

function generateMockNotifications() {
    return [
        { id: '1', type: 'payment', message: 'New payment received from John Doe', time: '2 minutes ago', read: false },
        { id: '2', type: 'user', message: 'New user registration: Jane Smith', time: '1 hour ago', read: true },
        { id: '3', type: 'api', message: 'API key generated for Enterprise plan', time: '3 hours ago', read: true }
    ];
}

// Chart Functions
function updateRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    // Mock revenue data
    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Revenue ($)',
            data: [1200, 1900, 1500, 2500, 2200, 3000],
            backgroundColor: 'rgba(102, 126, 234, 0.2)',
          
