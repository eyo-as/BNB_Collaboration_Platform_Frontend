import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnswersByQuestionIdService } from "../../../../service/answer.service";
import { getAllQuestionService } from "../../../../service/question.service";
import { FaUser } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import Pagination from "../../pagination/Pagination";
import { createVoteService } from "../../../../service/vote.service";
import { getSingleUser } from "../../../../service/user.service";

const UnansweredQuestion = () => {
  const [questions, setAllQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const questionsPerPage = 4;
  const [questionsToDisplay, setQuestionsToDisplay] = useState([]);
  const [answersCache, setAnswersCache] = useState({});
  const [userVotes, setUserVotes] = useState({}); // Track user's vote state for each question
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [decoded, setDecoded] = useState({});
  const [usernames, setUsernames] = useState({}); // Store usernames by user_id

  // Fetch user details and store usernames
  const fetchUsername = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const user = await getSingleUser(userId, token);
      setUsernames((prev) => ({
        ...prev,
        [userId]: user.data.data.username,
      }));
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  // Fetch usernames for all questions
  useEffect(() => {
    if (isLoggedIn && questions.length > 0) {
      questions.forEach((question) => {
        if (!usernames[question.user_id]) {
          fetchUsername(question.user_id);
        }
      });
    }
  }, [isLoggedIn, questions, usernames]);

  // Render username instead of user_id
  const renderUsername = (userId) => {
    return usernames[userId] || `User ${userId}`;
  };

  // check if the user is logged in and decode the token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);
        setIsLoggedIn(true);
      } catch (error) {
        console.log("Error decoding token:", error);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Fetch all questions if the user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");

      getAllQuestionService(token)
        .then((res) => {
          const allQuestions = res.response.data.data?.map((question) => ({
            ...question,
            tags: question.tags || "", // Ensure tags is at least an empty string
          }));
          setAllQuestions(allQuestions);
          setTotalPages(Math.ceil(allQuestions.length / questionsPerPage));

          // Fetch answers for all questions
          allQuestions.forEach((question) => {
            fetchAnswersForQuestion(question.question_id);
          });
        })
        .catch((error) => {
          console.log("Error fetching questions:", error);
        });
    }
  }, [isLoggedIn]);

  // Update displayed questions when pagination or answersCache changes
  useEffect(() => {
    // Filter questions with no answers
    const unansweredQuestions = questions.filter((question) => {
      const answers = answersCache[question.question_id] || [];
      return answers.length === 0; // Only include questions with no answers
    });

    // Sort unanswered questions by `created_at` timestamp (most recent first)
    const sortedQuestions = [...unansweredQuestions].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = Math.min(
      startIndex + questionsPerPage,
      sortedQuestions.length
    );
    const displayedQuestions = sortedQuestions.slice(startIndex, endIndex);
    setQuestionsToDisplay(displayedQuestions);
  }, [questions, currentPage, answersCache]);

  // Fetch answers for a specific question
  const fetchAnswersForQuestion = async (questionId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await getAnswersByQuestionIdService(questionId, token);
      if (res.success) {
        setAnswersCache((prev) => ({
          ...prev,
          [questionId]: res.data.data,
        }));
      }
    } catch (error) {
      console.error(
        `Error fetching answers for question ${questionId}:`,
        error
      );
    }
  };

  // Handle voting for questions
  const handleVote = async (questionId, voteType) => {
    try {
      const token = localStorage.getItem("token");
      const currentVote = userVotes[questionId]; // Get the user's current vote state
      let newVoteType = voteType;

      // Toggle vote if the user clicks the same button again
      if (currentVote === voteType) {
        newVoteType = null; // Remove the vote
      }

      // Send the vote request to the backend
      const response = await createVoteService(
        {
          user_id: decoded.user_id,
          question_id: questionId,
          vote_type: newVoteType,
        },
        token
      );

      if (response.success) {
        // Update the question's vote count in the UI
        const updatedQuestions = questions.map((question) => {
          if (question.question_id === questionId) {
            let upvotes = question.upvotes;
            let downvotes = question.downvotes;

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
              ...question,
              upvotes,
              downvotes,
            };
          }
          return question;
        });

        setAllQuestions(updatedQuestions);

        // Update the user's vote state
        setUserVotes((prev) => ({
          ...prev,
          [questionId]: newVoteType,
        }));
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  // Handle pagination change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {isLoggedIn && (
        <div
          className="tab-pane fade"
          id="unanswered-question"
          role="tabpanel"
          aria-labelledby="unanswered-question-tab"
        >
          <div>
            <div>
              {questionsToDisplay?.map((question) => {
                const answers = answersCache[question.question_id] || [];
                const answerCount = answers.length;
                const userVote = userVotes[question.question_id]; // Get the user's vote state

                return (
                  <div key={question.question_id}>
                    <div className="single-qa-box like-dislike">
                      <div className="d-flex">
                        <div className="link-unlike flex-shrink-0 pt-1.5">
                          <span>
                            <FaUser size={35} color="#000" />
                          </span>

                          <div className="donet-like-list">
                            <button
                              className={`like-unlink-count like ${
                                userVote === "upvote" ? "active" : ""
                              }`}
                              onClick={() =>
                                handleVote(question.question_id, "upvote")
                              }
                            >
                              <i className="ri-thumb-up-fill"></i>
                              <span>{question.upvotes}</span>
                            </button>
                          </div>

                          <div className="donet-like-list">
                            <button
                              className={`like-unlink-count dislike ${
                                userVote === "downvote" ? "active" : ""
                              }`}
                              onClick={() =>
                                handleVote(question.question_id, "downvote")
                              }
                            >
                              <i className="ri-thumb-down-fill"></i>
                              <span>{question.downvotes}</span>
                            </button>
                          </div>
                        </div>

                        <div className="flex-grow-1 ms-3">
                          <ul className="graphic-design">
                            <li className="text-black">
                              {renderUsername(question.user_id)}
                            </li>
                            <li>
                              <span>
                                Latest Answer:{" "}
                                {answerCount > 0
                                  ? new Date(
                                      answers[0].created_at
                                    ).toLocaleDateString()
                                  : "No answers yet"}
                              </span>
                            </li>
                            <li className="lg:pt-2">
                              <span>In:</span>
                              {(() => {
                                const firstTag =
                                  question.tags?.split(",")[0] || "General";
                                return (
                                  <span className="text-orange-400 font-bold">
                                    {" "}
                                    {firstTag}
                                  </span>
                                );
                              })()}
                            </li>
                          </ul>

                          <h3>{question.title}</h3>

                          <p>{question.description}</p>

                          <ul className="tag-list">
                            {(question.tags?.split(",") || []).map((tag, i) => (
                              <li
                                key={i}
                                className="border p-1 rounded text-black"
                              >
                                {tag.trim()}
                              </li>
                            ))}
                          </ul>

                          <div className="d-flex justify-content-between align-items-center">
                            <ul className="anser-list">
                              <li>
                                Created at:{" "}
                                <span>
                                  {new Date(
                                    question.created_at
                                  ).toLocaleDateString()}
                                </span>
                              </li>
                              <li>
                                {answerCount} Answer
                                {answerCount !== 1 ? "s" : ""}
                              </li>
                              <li>{question.upvotes} Vote</li>
                            </ul>

                            <Link
                              to={`/questions/${question.question_id}/answers`}
                              className="default-btn"
                            >
                              Answer
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default UnansweredQuestion;
