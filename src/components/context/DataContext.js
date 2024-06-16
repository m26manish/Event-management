import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const DateContext = createContext();

export const useData = () => {
  return useContext(DateContext);
};

export const DataProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const[scanResult,setScanResult]=useState(null)
  const [user,setUser]=useState({})
  const baseURL = "https://eventbookingserver.onrender.com"
  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };
  useEffect(()=>{
      const isUser = sessionStorage.getItem("user")
      setUser(isUser?JSON.parse(isUser):"")
  },[])
  useEffect(() => {  
    const performSearch = async () => {
      try {
        const response = await axios.get(`${baseURL}/search?q=${query}`); 
            if(response){
              setResults(response.data);
            }
      } catch (error) {
        console.error('Error searching:',error);
      } 
    };

    if (query.length>2) {
      performSearch();
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <DateContext.Provider value={{
       query, 
       setQuery, 
       results,
       isLoading, 
       startLoading, 
       stopLoading,
       user,
       setUser,
       scanResult,
       setScanResult
       }}>
      {children}
    </DateContext.Provider>
  );
};











