import axios from 'axios';

// Base URL of your backend API
const API_BASE_URL = 'https://backend-bfhl-nqvt.onrender.com'; // Ensure this is correct

// POST Request function
export const postData = async (payload) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/bfhl`, payload);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error in POST request:', error);
        throw error;  // Propagate the error for error handling in frontend
    }
};
