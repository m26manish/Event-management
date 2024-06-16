import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const performSearch = async () => {
    
      try {
        const response = await axios.get(`${baseURL}/search?q=${query}`); 
            if(!response){
              setResults(data);
            }
      } catch (error) {
        console.error('Error searching:', error);
      } 
    };

    if (query) {
      performSearch();
    } else {
      // Clear the results when the query is empty
      setResults([]);
    }
  }, [query]);

  return (
    <SearchContext.Provider value={{ query, setQuery, results}}>
      {children}
    </SearchContext.Provider>
  );
};





import React from 'react';
import { useSearch } from './SearchContext';

const SearchBar = () => {
  const { query, setQuery } = useSearch();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={handleInputChange}
    />
  );
};

const SearchResults = () => {
  const { results, loading } = useSearch();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {results.map((result) => (
        <li key={result.id}>{result.name}</li>
      ))}
    </ul>
  );
};

const SearchPage = () => {
  return (
    <div>
      <h1>Search Page</h1>
      <SearchBar />
      <SearchResults />
    </div>
  );
};

export default SearchPage;





import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SearchProvider } from './SearchContext';

ReactDOM.render(
  <React.StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
