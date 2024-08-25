import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// Mock REST API function for demonstration purposes
const mockApiCall = (payload) => {
  return new Promise((resolve) => {
    // Simulating an API response based on the payload
    setTimeout(() => {
      resolve({
        alphabets: ['A', 'B', 'C', 'D', 'E'],
        numbers: ['1', '2', '3', '4', '5'],
        highestLowercase: 'z'
      });
    }, 1000);
  });
};

// Component
const JsonInput = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [response, setResponse] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  // Define options for the dropdown
  const dropdownOptions = [
    { label: 'Alphabets', value: 'alphabets' },
    { label: 'Numbers', value: 'numbers' },
    { label: 'Highest lowercase alphabet', value: 'highestLowercase' }
  ];

  // Handle change in JSON input field
  const handleChange = (e) => {
    setJsonInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Parse JSON
      const parsedJson = JSON.parse(jsonInput);
      console.log('Parsed JSON:', parsedJson);

      // Call the mock API with the parsed JSON
      const apiResponse = await mockApiCall(parsedJson);
      setResponse(apiResponse);
      setError('');
      setShowDropdown(true);
    } catch (err) {
      setError('Invalid JSON format');
      setShowDropdown(false);
      setFilteredData(null); // Reset filtered data on error
    }
  };

  // Handle changes in the dropdown
  const handleMultiSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  // Filter response based on selected options
  useEffect(() => {
    if (!response) return;

    const selectedValues = selectedOptions.map(option => option.value);
    const newFilteredData = {};

    if (selectedValues.includes('alphabets')) {
      newFilteredData.alphabets = response.alphabets;
    }
    if (selectedValues.includes('numbers')) {
      newFilteredData.numbers = response.numbers;
    }
    if (selectedValues.includes('highestLowercase')) {
      newFilteredData.highestLowercase = response.highestLowercase;
    }

    setFilteredData(newFilteredData);
  }, [selectedOptions, response]);


  useEffect(() => {
    document.title = '21BCY10206'; 
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}
      className='result'
      >
        <input type='text'
        className='box'
          value={jsonInput}
          onChange={handleChange}
          placeholder="Enter JSON here"
          style={{ marginTop: '10px' }}

        />
        <br />
        <button type="submit"
          className='box'
          style={{ marginTop: '10px' }}
        >Submit</button>
      </form>
      <div
      className='error'
      >
      {error && <p style={{ color: 'red' }}>{error}</p>}

      </div>
<div className="result">

      {showDropdown && (
        <div style={{ marginTop: '10px' }}
        className='box'
        
        >
          <Select
            options={dropdownOptions}
            isMulti
            onChange={handleMultiSelectChange}
            value={selectedOptions}
          />
        </div>
      )}
      {filteredData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Filtered response:</h3>
          <pre>{JSON.stringify(filteredData, null, 2)}</pre>
        </div>
      )}
      </div>
    </div>
  );
};

export default JsonInput;
