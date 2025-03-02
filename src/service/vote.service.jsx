import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;

const createVoteService = async (voteData, token) => {
  try {
    const response = await axios.post(`${api_url}/api/votes`, voteData, {
      headers: {
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

export { createVoteService };
