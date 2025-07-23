import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;

const createAnswerService = async (answerData, token) => {
  try {
    const response = await axios.post(
      `${api_url}/api/questions/${answerData.question_id}/answers`,
      answerData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error || "An error occurred",
    };
  }
};

const getAllAnswersService = async (token) => {
  try {
    const response = await axios.get(`${api_url}/api/answers`, {
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
      message: error || "An error occurred",
    };
  }
};

const getSingleAnswerService = async (answer_id, token) => {
  try {
    const response = await axios.get(`${api_url}/api/answers/${answer_id}`, {
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
      message: error || "An error occurred",
    };
  }
};

const getAnswersByQuestionIdService = async (question_id, token) => {
  try {
    const response = await axios.get(
      `${api_url}/api/questions/${question_id}/answers`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error || "An error occurred",
    };
  }
};

export {
  createAnswerService,
  getAllAnswersService,
  getSingleAnswerService,
  getAnswersByQuestionIdService,
};
