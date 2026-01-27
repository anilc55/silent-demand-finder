<script>
    // Sample data for findings
    const findingsData = [
        {
            id: 1,
            title: "WHY",
            description: "Log 'AI' ko search karte hain par openly discuss nahi karte. Unhe dar hai ke woh outdated lagenge ya technical samajh nahi aayegi.",
            example: "\"AI basics for non-tech people\" - 15K monthly searches but only 3 quality resources",
            icon: "fas fa-question-circle"
        },
        {
            id: 2,
            title: "HOW",
            description: "'AI' beginners ke liye step-by-step kaise shuru kare without coding. Unhe simple tools chahiye jo free ho.",
            example: "\"AI tools for small business owners\" - 22K monthly searches, 78% are beginners",
            icon: "fas fa-cogs"
        },
        {
            id: 3,
            title: "PROBLEM",
            description: "'AI' se related real problems jo chup-chaap search kiye jate hain. Privacy concerns, cost, implementation difficulties.",
            example: "\"AI replacing my job\" - 45K monthly searches, high anxiety intent",
            icon: "fas fa-exclamation-triangle"
        },
        {
            id: 4,
            title: "COMPARE",
            description: "'AI' vs alternatives – kaunsa better aur sasta hai. Log secretly compare karte hain par publicly nahi poochte.",
            example: "\"ChatGPT vs Google Bard vs Claude\" - 32K monthly searches, comparison intent",
            icon: "fas fa-balance-scale"
        },
        {
            id: 5,
            title: "MISTAKE",
            description: "Beginners ki common galtiyan jo paisa aur waqt barbaad karti hain. Overpaying for tools, wrong learning path.",
            example: "\"AI tools I regret buying\" - 8K monthly searches, high purchase intent",
            icon: "fas fa-times-circle"
        },
        {
            id: 6,
            title: "SECRET",
            description: "'AI' ke hidden tricks jo professionals openly nahi batate. Prompts, workflows, automation secrets.",
            example: "\"ChatGPT prompts that actually work\" - 28K monthly searches, low competition",
            icon: "fas fa-user-secret"
        }
    ];

    // Sample search results data
    const searchResults = {
        "AI": [
            { keyword: "AI for complete beginners without tech background", searches: "12,500", competition: "Low", intent: "Informational" },
            { keyword: "How to use AI to make money quietly", searches: "8,200", competition: "Medium", intent: "Commercial" },
            { keyword: "AI tools that don't require coding skills", searches: "15,300", competition: "Medium", intent: "Transactional" },
            { keyword: "Free AI alternatives to expensive software", searches: "22,400", competition: "High", intent: "Commercial" },
            { keyword: "AI automation for repetitive office tasks", searches: "9,800", competition: "Low", intent: "Transactional" },
            { keyword: "Learning AI without math or programming", searches: "18,600", competition: "Low", intent: "Informational" }
        ],
        "Jobs": [
            { keyword: "Remote jobs that don't require experience", searches: "45,200", competition: "High", intent: "Transactional" },
            { keyword: "Side hustles that pay weekly", searches: "32,500", competition: "Medium", intent: "Commercial" },
            { keyword: "Work from home jobs for moms", searches: "28,700", competition: "Medium", intent: "Informational" },
            { keyword: "Freelance jobs for beginners with no portfolio", searches: "15,400", competition: "Low", intent: "Transactional" }
        ],
        "YouTube": [
            { keyword: "YouTube automation without showing face", searches: "23,800", competition: "Medium", intent: "Commercial" },
            { keyword: "Getting first 1000 subscribers quickly", searches: "38,500", competition: "High", intent: "Informational" },
            { keyword: "YouTube channels that make money without talking", searches: "12,300", competition: "Low", intent: "Transactional" },
            { keyword: "Best time to upload videos for maximum views", searches: "19,700", competition: "Medium", intent: "Informational" }
        ],
        "Marketing": [
            { keyword: "Marketing strategies for shy people", searches: "8,400", competition: "Low", intent: "Informational" },
            { keyword: "Selling without being salesy", searches: "14,600", competition: "Medium", intent: "Commercial" },
            { keyword: "Content marketing without social media", searches: "7,900", competition: "Low", intent: "Transactional" }
        ]
    };

    // Initialize the app
    document.addEventListener('DOMContentLoaded', function() {
        // Render findings
        renderFindings();
        
        // Set up search button event - YAHAN PROBLEM THI
        document.getElementById('searchBtn').addEventListener('click', function() {
            performSearch();
        });
        
        // Also trigger search on Enter key in search input
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Perform initial search for "AI"
        performSearch();
        
        // Add click event to login button
        document.querySelector('.login-btn').addEventListener('click', function() {
            alert('Login functionality would open here. In a full app, this would connect to a backend.');
        });
        
        // Add click event to premium badge
        document.querySelector('.premium-badge').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Premium features coming soon! This would unlock advanced analytics and more silent demand patterns.');
        });
        
        // Add active state to nav links
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Show appropriate content based on nav click
                const page = this.textContent;
                if (page === 'Dashboard') {
                    alert('Dashboard page would show here with user analytics and saved searches.');
                } else if (page === 'Premium') {
                    alert('Premium page would show pricing and premium features.');
                } else if (page === 'About') {
                    alert('About page would show information about the tool and its creators.');
                }
            });
        });
    });

    // Function to render findings
    function renderFindings() {
        const findingsContainer = document.getElementById('findingsContainer');
        findingsContainer.innerHTML = '';
        
        findingsData.forEach(finding => {
            const findingElement = document.createElement('div');
            findingElement.className = 'finding-box';
            findingElement.innerHTML = `
                <div class="finding-header">
                    <h3 class="finding-title">${finding.title}</h3>
                    <div class="finding-icon">
                        <i class="${finding.icon}"></i>
                    </div>
                </div>
                <div class="finding-content">
                    <p>${finding.description}</p>
                    <div class="finding-example">
                        ${finding.example}
                    </div>
                </div>
            `;
            findingsContainer.appendChild(findingElement);
        });
    }

    // Function to perform search
    function performSearch() {
        const searchInput = document.getElementById('searchInput');
        const keyword = searchInput.value.trim() || 'AI';
        
        // Show loading
        document.getElementById('loader').style.display = 'block';
        document.getElementById('resultsContainer').style.display = 'none';
        
        // Simulate API delay
        setTimeout(() => {
            // Update keyword in results
            document.getElementById('keywordResult').textContent = keyword;
            
            // Get results for keyword or default to AI
            // Fix: Handle case sensitivity
            const keywordUpper = keyword.toUpperCase();
            let results;
            
            if (keywordUpper === 'AI') {
                results = searchResults['AI'];
            } else if (keywordUpper === 'JOBS') {
                results = searchResults['Jobs'];
            } else if (keywordUpper === 'YOUTUBE') {
                results = searchResults['YouTube'];
            } else if (keywordUpper === 'MARKETING') {
                results = searchResults['Marketing'];
            } else {
                results = searchResults['AI'];
            }
            
            // Update result count
            document.getElementById('resultCount').textContent = results.length;
            
            // Render results
            renderResults(results);
            
            // Hide loading and show results
            document.getElementById('loader').style.display = 'none';
            document.getElementById('resultsContainer').style.display = 'block';
            
            // Update features based on keyword
            updateFeatures(keyword);
            
            // Update findings based on keyword
            updateFindings(keyword);
        }, 1000);
    }

    // Function to render search results
    function renderResults(results) {
        const resultsList = document.getElementById('resultsList');
        resultsList.innerHTML = '';
        
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'result-item';
            
            // Determine competition color
            let competitionColor = '#40c057'; // Green for low
            if (result.competition === 'Medium') competitionColor = '#ff922b'; // Orange
            if (result.competition === 'High') competitionColor = '#fa5252'; // Red
            
            resultElement.innerHTML = `
                <div class="result-keyword">${result.keyword}</div>
                <div class="result-description">Silent demand pattern identified - people search this but don't discuss publicly</div>
                <div class="result-stats">
                    <div class="result-stat">
                        <i class="fas fa-search"></i>
                        <span>${result.searches} monthly searches</span>
                    </div>
                    <div class="result-stat">
                        <i class="fas fa-users"></i>
                        <span>Competition: <strong style="color:${competitionColor}">${result.competition}</strong></span>
                    </div>
                    <div class="result-stat">
                        <i class="fas fa-bullseye"></i>
                        <span>Intent: ${result.intent}</span>
                    </div>
                </div>
            `;
            
            resultsList.appendChild(resultElement);
        });
    }

    // Function to update features based on keyword
    function updateFeatures(keyword) {
        const featureValues = document.querySelectorAll('.feature-value');
        const featureSubtitles = document.querySelectorAll('.feature-subtitle');
        
        // Update based on keyword
        const keywordUpper = keyword.toUpperCase();
        
        if (keywordUpper === 'AI') {
            featureValues[0].textContent = 'Hidden +';
            featureValues[0].className = 'feature-value green';
            featureSubtitles[0].textContent = 'Silent Search';
            
            featureValues[1].textContent = 'High +';
            featureSubtitles[1].textContent = 'Monetizable';
            
            featureValues[2].textContent = 'Low to Medium';
            featureValues[2].className = 'feature-value orange';
            featureSubtitles[2].textContent = 'Easy to Rank';
            
            featureValues[3].textContent = 'AI + Real-time';
            featureSubtitles[3].textContent = 'Live Logic';
        } else if (keywordUpper === 'JOBS') {
            featureValues[0].textContent = 'Silent +';
            featureValues[0].className = 'feature-value orange';
            featureSubtitles[0].textContent = 'Hidden Search';
            
            featureValues[1].textContent = 'Very High';
            featureSubtitles[1].textContent = 'Urgent Intent';
            
            featureValues[2].textContent = 'Medium to High';
            featureValues[2].className = 'feature-value';
            featureValues[2].style.color = '#fa5252';
            featureSubtitles[2].textContent = 'Competitive';
            
            featureValues[3].textContent = 'AI + Real-time';
            featureSubtitles[3].textContent = 'Live Logic';
        } else if (keywordUpper === 'YOUTUBE') {
            featureValues[0].textContent = 'Hidden +';
            featureValues[0].className = 'feature-value green';
            featureSubtitles[0].textContent = 'Silent Search';
            
            featureValues[1].textContent = 'High';
            featureSubtitles[1].textContent = 'Monetizable';
            
            featureValues[2].textContent = 'Medium';
            featureValues[2].className = 'feature-value orange';
            featureSubtitles[2].textContent = 'Moderate Competition';
            
            featureValues[3].textContent = 'AI + Real-time';
            featureSubtitles[3].textContent = 'Live Logic';
        } else {
            featureValues[0].textContent = 'Silent +';
            featureValues[0].className = 'feature-value';
            featureValues[0].style.color = '#4dabf7';
            featureSubtitles[0].textContent = 'Hidden Demand';
            
            featureValues[1].textContent = 'Medium +';
            featureSubtitles[1].textContent = 'Monetizable';
            
            featureValues[2].textContent = 'Low';
            featureValues[2].className = 'feature-value green';
            featureSubtitles[2].textContent = 'Easy to Rank';
            
            featureValues[3].textContent = 'AI + Real-time';
            featureSubtitles[3].textContent = 'Live Logic';
        }
    }

    // Function to update findings based on keyword
    function updateFindings(keyword) {
        const keywordUpper = keyword.toUpperCase();
        
        // Update all findings based on keyword
        const findings = document.querySelectorAll('.finding-box');
        
        if (keywordUpper === 'AI') {
            findings[0].querySelector('.finding-content p').textContent = "Log 'AI' ko search karte hain par openly discuss nahi karte. Unhe dar hai ke woh outdated lagenge ya technical samajh nahi aayegi.";
            findings[0].querySelector('.finding-example').textContent = "\"AI basics for non-tech people\" - 15K monthly searches but only 3 quality resources";
            
            findings[1].querySelector('.finding-content p').textContent = "'AI' beginners ke liye step-by-step kaise shuru kare without coding. Unhe simple tools chahiye jo free ho.";
            findings[1].querySelector('.finding-example').textContent = "\"AI tools for small business owners\" - 22K monthly searches, 78% are beginners";
            
            findings[2].querySelector('.finding-content p').textContent = "'AI' se related real problems jo chup-chaap search kiye jate hain. Privacy concerns, cost, implementation difficulties.";
            findings[2].querySelector('.finding-example').textContent = "\"AI replacing my job\" - 45K monthly searches, high anxiety intent";
            
            findings[3].querySelector('.finding-content p').textContent = "'AI' vs alternatives – kaunsa better aur sasta hai. Log secretly compare karte hain par publicly nahi poochte.";
            findings[3].querySelector('.finding-example').textContent = "\"ChatGPT vs Google Bard vs Claude\" - 32K monthly searches, comparison intent";
            
            findings[4].querySelector('.finding-content p').textContent = "Beginners ki common galtiyan jo paisa aur waqt barbaad karti hain. Overpaying for tools, wrong learning path.";
            findings[4].querySelector('.finding-example').textContent = "\"AI tools I regret buying\" - 8K monthly searches, high purchase intent";
            
            findings[5].querySelector('.finding-content p').textContent = "'AI' ke hidden tricks jo professionals openly nahi batate. Prompts, workflows, automation secrets.";
            findings[5].querySelector('.finding-example').textContent = "\"ChatGPT prompts that actually work\" - 28K monthly searches, low competition";
            
        } else if (keywordUpper === 'JOBS') {
            findings[0].querySelector('.finding-content p').textContent = "Log 'Jobs' ko secretly search karte hain, especially agar woh currently employed hain. Unhe dar hai ke employer ko pata chal jayega.";
            findings[0].querySelector('.finding-example').textContent = "\"How to search for jobs without current employer knowing\" - 18K monthly searches";
            
            findings[1].querySelector('.finding-content p').textContent = "'Jobs' ke liye kaise apply kare without experience. Unhe shortcuts chahiye jo actually work karte hain.";
            findings[1].querySelector('.finding-example').textContent = "\"Getting a job with no experience\" - 42K monthly searches, high intent";
            
            findings[2].querySelector('.finding-content p').textContent = "'Jobs' se related real problems - interview anxiety, salary negotiation, career change doubts.";
            findings[2].querySelector('.finding-example').textContent = "\"How to answer salary expectations question\" - 25K monthly searches";
            
            findings[3].querySelector('.finding-content p').textContent = "'Remote jobs' vs 'Office jobs' – konsa better hai work-life balance ke liye.";
            findings[3].querySelector('.finding-example').textContent = "\"Remote work vs office work pros and cons\" - 15K monthly searches";
            
            findings[4].querySelector('.finding-content p').textContent = "Job search ki common galtiyan jo opportunities kho deti hain. Weak resume, poor interview skills.";
            findings[4].querySelector('.finding-example').textContent = "\"Common resume mistakes that get rejected\" - 22K monthly searches";
            
            findings[5].querySelector('.finding-content p').textContent = "'Jobs' ke hidden tricks - how to negotiate salary, find unadvertised positions, network effectively.";
            findings[5].querySelector('.finding-example').textContent = "\"Salary negotiation scripts that work\" - 12K monthly searches, low competition";
            
        } else if (keywordUpper === 'YOUTUBE') {
            findings[0].querySelector('.finding-content p').textContent = "Log 'YouTube' success ko secretly search karte hain par openly admit nahi karte ke woh YouTuber banna chahte hain.";
            findings[0].querySelector('.finding-example').textContent = "\"How to become a YouTuber without telling friends\" - 8K monthly searches";
            
            findings[1].querySelector('.finding-content p').textContent = "'YouTube' channel kaise start kare without showing face. Unhe anonymity chahiye.";
            findings[1].querySelector('.finding-example').textContent = "\"Faceless YouTube channel ideas\" - 14K monthly searches";
            
            findings[2].querySelector('.finding-content p').textContent = "'YouTube' se related real problems - copyright issues, algorithm changes, burnout.";
            findin
