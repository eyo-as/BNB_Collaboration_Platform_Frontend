import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;

const createQuestionService = async (questionData, token) => {
  try {
    const response = await axios.post(`${api_url}/api/question`, questionData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      response,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.response?.data?.error || "An error occurred",
    };
  }
};

const getAllQuestionService = async (token) => {
  try {
    const response = await axios.get(`${api_url}/api/questions`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      response,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const getSingleQuestionService = async (question_id, token) => {
  try {
    const response = await axios.get(
      `${api_url}/api/questions/${question_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      response,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};

export {
  createQuestionService,
  getAllQuestionService,
  getSingleQuestionService,
};
