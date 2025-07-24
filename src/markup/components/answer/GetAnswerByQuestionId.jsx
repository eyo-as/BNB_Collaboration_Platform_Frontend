import { useEffect, useState } from "react";
import { getAnswersByQuestionIdService } from "../../../service/answer.service";
import { useParams } from "react-router";
import { useUser } from "../../../context/UserProvider";
import { getSingleQuestionService } from "../../../service/question.service";
import ContentLeft from "../main-content/ContentLeft";
import ContentRight from "../main-content/ContentRight";
import CreateAnswer from "../../pages/answer/CreateAnswer";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { createVoteService } from "../../../service/vote.service";
import { jwtDecode } from "jwt-decode";

const GetAnswerByQuestionId = () => {
  const [answers, setAnswers] = useState([]);
  const { users, fetchUser } = useUser();
  const { question_id } = useParams();
  const token = localStorage.getItem("token");
  const [questions, setQuestions] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const [userVotes, setUserVotes] = useState({});

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const res = await getAnswersByQuestionIdService(question_id, token);
        const allAnswers = res?.data?.data;
        setAnswers(allAnswers);

        // Fetch users for all answers
        allAnswers?.forEach((answer) => {
          if (!users[answer.user_id]) {
            fetchUser(answer.user_id);
          }
        });
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

    fetchAnswers();
  }, [fetchUser, question_id, token, users]);

  const fetchQuestion = async () => {
    try {
      const response = await getSingleQuestionService(question_id, token);
      const questions = response?.response?.data?.data;
      setQuestions(questions);
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };
  fetchQuestion();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 992);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle voting for answers
  const handleVote = async (answerId, voteType) => {
    try {
      const currentVote = userVotes[answerId]; // Get the user's current vote state
      let newVoteType = voteType;

      // Toggle vote if the user clicks the same button again
      if (currentVote === voteType) {
        newVoteType = null; // Remove the vote
      }

      // Send the vote request to the backend
      const response = await createVoteService(
        {
          user_id: jwtDecode(token).user_id,
          answer_id: answerId,
          vote_type: newVoteType,
        },
        token
      );

      if (response?.success) {
        // Update the answer's vote count in the UI
        const updatedAnswers = answers?.map((answer) => {
          if (answer.answer_id === answerId) {
            let upvotes = answer.upvotes;
            let downvotes = answer.downvotes;

            if (currentVote === "upvote" && newVoteType === null) {
              upvotes -= 1; // Remove upvote
            } else if (currentVote === "downvote" && newVoteType === null) {
              downvotes -= 1; // Remove downvote
            } else if (newVoteType === "upvote") {
              if (currentVote === "downvote") downvotes -= 1; // Switch from downvote to upvote
              upvotes += 1;
            } else if (newVoteType === "downvote") {
              if (currentVote === "upvote") upvotes -= 1; // Switch from upvote to downvote
              downvotes += 1;
            }

            return {
              ...answer,
              upvotes,
              downvotes,
            };
          }
          return answer;
        });

        setAnswers(updatedAnswers);

        // Update the user's vote state
        setUserVotes((prev) => ({
          ...prev,
          [answerId]: newVoteType,
        }));
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="main-container-area ptb-100">
      <div className="container">
        <div className="row">
          <ContentLeft />
          <div className="col-lg">
            {/* Question details */}
            <div className="mb-6 p-4 bg-white shadow rounded">
              <div className="text-xl font-bold text-black mb-2">
                Question title:{" "}
                <span className="text-gray-800">{questions?.title}</span>
              </div>
              <div className="text-black mb-2">
                Description:{" "}
                <span className="text-gray-900">{questions?.description}</span>
              </div>
              <div className="text-sm text-black mb-2">
                Tags: <span className="text-gray-600">{questions?.tags}</span>
              </div>
              <div className="text-sm text-black mb-2">
                Created at:{" "}
                <span className="text-gray-600">
                  {new Date(questions?.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="text-sm text-black">
                Class ID:{" "}
                <span className="text-gray-600">{questions?.class_id}</span>
              </div>
            </div>

            {/* Answers */}
            <div>
              <div className="text-black text-2xl mb-2 px-4 text-center">
                Answer from the other students
              </div>
              {answers?.length !== 0 ? (
                <div>
                  {answers?.map((answer) => {
                    const userVote = userVotes[answer.answer_id]; // Get the user's vote state

                    return (
                      <div
                        key={answer.answer_id}
                        className="mb-4 p-4 bg-white shadow rounded"
                      >
                        <div>
                          <div className="text-black mb-2">
                            Answer:{" "}
                            <span className="text-gray-900">
                              {answer.answer_text}
                            </span>
                          </div>
                          <div className="text-sm text-black mb-2">
                            Created at:{" "}
                            <span className="text-gray-600">
                              {new Date(answer.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-sm text-black mb-2">
                            Answered by:{" "}
                            <span className="text-gray-600">
                              {users[answer.user_id] || "Loading..."}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                              <span className="text-green-500">
                                {answer.upvotes}
                              </span>
                              <FaThumbsUp
                                className={`mr-2 text-black cursor-pointer ${
                                  userVote === "upvote" ? "text-blue-500" : ""
                                }`}
                                onClick={() =>
                                  handleVote(answer.answer_id, "upvote")
                                }
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-red-500">
                                {answer.downvotes}
                              </span>
                              <FaThumbsDown
                                className={`text-black cursor-pointer ${
                                  userVote === "downvote" ? "text-red-500" : ""
                                }`}
                                onClick={() =>
                                  handleVote(answer.answer_id, "downvote")
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-black text-center my-4">
                  No answers found for this question
                </div>
              )}
            </div>
          </div>
          {isLargeScreen && <ContentRight />}
        </div>
        <div>
          <CreateAnswer />
        </div>
      </div>
    </div>
  );
};

export default GetAnswerByQuestionId;
