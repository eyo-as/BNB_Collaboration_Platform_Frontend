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
      token,
    };
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error || "Network or server error";
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

const getSingleUser = async (user_id, token) => {
  try {
    const response = await axios.get(`${api_url}/api/user/${user_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const deleteUser = async (user_id, token) => {
  try {
    const response = await axios.delete(`${api_url}/api/user/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const updateUser = async (user_id, userData, token) => {
  try {
    const response = await axios.put(
      `${api_url}/api/user/${user_id}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data,
    };
  }
};

const totalUserQuestion = async (user_id, token) => {
  try {
    const response = await axios.get(
      `${api_url}/api/user/${user_id}/questions`,
      {
        headers: {
          "Content-Type": "applications/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const totalUserAnswer = async (user_id, token) => {
  try {
    const response = await axios.get(`${api_url}/api/user/${user_id}/answers`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export {
  createUser,
  login,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  totalUserQuestion,
  totalUserAnswer,
};
