import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <input
        type="text"
        className="search-input"
        placeholder="Enter a keyword (AI, Jobs, YouTube...)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="btn-search">
        Find Silent Demand
      </button>
    </form>
  );
};

export default SearchBar;
