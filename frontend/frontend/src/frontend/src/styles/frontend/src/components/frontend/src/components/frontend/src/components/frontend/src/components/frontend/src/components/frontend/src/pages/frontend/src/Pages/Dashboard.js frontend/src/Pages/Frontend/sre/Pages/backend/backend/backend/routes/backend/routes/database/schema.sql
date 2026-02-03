-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    plan ENUM('free', 'pro', 'enterprise') DEFAULT 'free',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Search History Table
CREATE TABLE searches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    keyword VARCHAR(255) NOT NULL,
    results JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Keywords Table
CREATE TABLE keywords (
    id INT PRIMARY KEY AUTO_INCREMENT,
    keyword VARCHAR(255) UNIQUE NOT NULL,
    search_volume INT,
    competition_score DECIMAL(3,2),
    demand_type ENUM('hidden', 'silent', 'emerging', 'trending'),
    monetization_score DECIMAL(3,2),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Opportunities Table
CREATE TABLE opportunities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    keyword_id INT,
    title VARCHAR(255),
    description TEXT,
    revenue_potential DECIMAL(10,2),
    competition_level ENUM('low', 'medium', 'high'),
    trend_direction ENUM('up', 'down', 'stable'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (keyword_id) REFERENCES keywords(id) ON DELETE CASCADE
);

-- Subscriptions Table
CREATE TABLE subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    plan ENUM('pro', 'enterprise'),
    stripe_subscription_id VARCHAR(255),
    status ENUM('active', 'canceled', 'past_due'),
    current_period_end TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
