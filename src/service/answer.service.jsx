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

export { createAnswerService };
