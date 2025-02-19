import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;

const createUser = async (userData) => {
  try {
    const response = await axios.post(`${api_url}/api/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${api_url}/api/login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const token = response.data.token;
    localStorage.setItem("token", token);

    const successMessage = response.data.message;

    return {
      success: true,
      data: successMessage,
    };
  } catch (error) {
    const errorMessage = error.response.data.error;
    return {
      success: false,
      message: errorMessage,
    };
  }
};

const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("token"); // 1. Retrieve token

    if (!token) {
      throw new Error("No token found. Please login."); // 3. Handle missing token
    }

    const response = await axios.get(`${api_url}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`, // 2. Authorization header
      },
    });

    return response.data; // Return the data part of the response
  } catch (error) {
    console.error("Error in getAllUsers service:", error);
    throw error; // Re-throw the error for component handling
  }
};

export { createUser, login, getAllUsers };
