import { useState, useEffect } from 'react';
import useDebounce from './hooks/useDebounce';

const url = "https://api.github.com/search/users?"

function searchCharacters(search) {
  return fetch(`${url}q=${search}&per_page=5`)
    .then(res => res.json())
    .then(data => data)
    .catch(error => {
      console.error(error);
      return [];
    });
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedValue = useDebounce(inputValue);

  useEffect(
    () => {
      if (debouncedValue) {
        setIsSearching(true);
        searchCharacters(debouncedValue).then(results => {
          setIsSearching(false);
          setResults(results.items);
        });
      } else {
        setResults([]);
      }
    },
    [debouncedValue]
  );


  return (
    <div>
      <input
        placeholder="Search"
        onChange={e => setInputValue(e.target.value)}
      />

      {isSearching && <div>Searching ...</div>}

      {results.length > 0 ? results.map(result => (
        <div key={result.id}>
          <h4>{result.login}</h4>
        </div>
      )) : <div>No users</div>}
    </div>
  );
}

export default App















// import { useEffect, useState } from "react";

// function App() {
//   const [data, dataSet] = useState(null);
//   const [value, setValue] = useState("");

//   const onChange = (e) => {
//     setValue(e.target.value);
//   };

//   const debounce = (f, ms) => {

//     return function () {
//       setTimeout(() => console.log("debounce"), ms);
//     };
//   }

//   debounce(null, 2000)();

//   useEffect(() => {
//     async function fetchMyAPI() {
//       let response = await fetch("https://api.github.com/search/users?q=anton");
//       response = await response.json();
//       dataSet(response.items);
//     }

//     fetchMyAPI();
//   }, [value]);

//   return (
//     <div className="App">
//       <h1>Github search</h1>
//       <input type="text" name="name" onChange={onChange} value={value} />
//     </div>
//   );
// }

// export default App;
