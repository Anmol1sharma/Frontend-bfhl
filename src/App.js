import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";

// Options for the dropdown
const options = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    { value: "highest_lowercase_alphabet", label: "Highest Lowercase Alphabet" },
];

function App() {
    const [jsonInput, setJsonInput] = useState(""); // Input JSON
    const [response, setResponse] = useState(null); // Backend response
    const [selectedOptions, setSelectedOptions] = useState([]); // Selected dropdown options

    // Submit handler
    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput); // Validate JSON
            const res = await axios.post("https://backend-bfhl-nqvt.onrender.com/bfhl", parsedInput); // Backend URL
            setResponse(res.data); // Set response data from backend
        } catch (error) {
            alert("Invalid JSON or server error. Please try again.");
        }
    };

    // Filter response based on selected options
    const filteredResponse = () => {
        if (!response) return null;
        const result = {};
        selectedOptions.forEach(option => {
            result[option.value] = response[option.value];
        });
        return result;
    };

    return (
        <div className="App">
            <h1>Bajaj Finserv Health Challenge</h1>
            <textarea
                rows="10"
                cols="50"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON e.g. {"data": ["M", "1", "a", "7"]}'
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <br />
            {response && (
                <>
                    <h2>Filter Response</h2>
                    <Select
                        isMulti
                        options={options}
                        onChange={setSelectedOptions}
                    />
                    <h3>Filtered Data:</h3>
                    <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
                </>
            )}
        </div>
    );
}

export default App;
