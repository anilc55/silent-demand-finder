// Main application script
const findingsData = {
    "queries": [
        {
            "id": 1,
            "query": "sustainable packaging alternatives",
            "findings": [
                "Biodegradable mushroom packaging gaining traction",
                "Edible food containers emerging in food industry"
            ],
            "date": "2024-01-15"
        },
        {
            "id": 2,
            "query": "remote work productivity tools",
            "findings": [
                "AI-powered focus assistants in demand",
                "Virtual coworking spaces trending"
            ],
            "date": "2024-01-14"
        }
    ]
};

// Search function
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        console.log(`Searching for: ${query}`);
        displaySearchResults(query);
        saveSearchQuery(query);
    } else {
        alert('Please enter a search query');
    }
}

// Display search results
function displaySearchResults(query) {
    const findingsContainer = document.getElementById('findings-container');
    const filteredResults = findingsData.queries.filter(item => 
        item.query.toLowerCase().includes(query.toLowerCase()) ||
        item.findings.some(finding => finding.toLowerCase().includes(query.toLowerCase()))
    );
    
    findingsContainer.innerHTML = '';
    
    if (filteredResults.length > 0) {
        filteredResults.forEach(result => {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'finding-item';
            resultDiv.innerHTML = `
                <h3>${result.query}</h3>
                <p class="date">${result.date}</p>
                <ul>
                    ${result.findings.map(finding => `<li>${finding}</li>`).join('')}
                </ul>
            `;
            findingsContainer.appendChild(resultDiv);
        });
    } else {
        findingsContainer.innerHTML = '<p class="no-results">No findings found for your query. Try a different search term.</p>';
    }
}

// Save search query to data storage
function saveSearchQuery(query) {
    // In a real application, this would send data to a backend
    console.log(`Saving query: ${query}`);
    
    // Update local storage
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    recentSearches.unshift({
        query: query,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 10 searches
    if (recentSearches.length > 10) {
        recentSearches.pop();
    }
    
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load recent findings on page load
    displaySearchResults('');
    
    // Add event listener for Enter key in search
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});
