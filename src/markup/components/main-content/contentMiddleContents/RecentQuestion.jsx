import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnswersByQuestionIdService } from "../../../../service/answer.service";
import { getAllQuestionService } from "../../../../service/question.service";
import { FaUser } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import Pagination from "../../pagination/Pagination";

const RecentQuestion = () => {
  const [questions, setAllQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const questionsPerPage = 3;
  const [questionsToDisplay, setQuestionsToDisplay] = useState([]);
  const [answersCache, setAnswersCache] = useState({});

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  // Fetch all questions
  useEffect(() => {
    getAllQuestionService(token)
      .then((res) => {
        const allQuestions = res.response.data.data?.map((question) => ({
          ...question,
          tags: question.tags || "", // Ensure tags is at least an empty string
        }));
        setAllQuestions(allQuestions);
        setTotalPages(Math.ceil(allQuestions.length / questionsPerPage));
        updateDisplayedQuestions(allQuestions); // Update display on initial load
      })
      .catch((error) => {
        console.log("Error fetching questions:", error);
      });
  }, [token]);

  // Update displayed questions when pagination or questions change
  useEffect(() => {
    updateDisplayedQuestions(questions);
  }, [questions, currentPage]);

  // Helper function to update displayed questions
  const updateDisplayedQuestions = (allQuestions) => {
    // Sort questions by `created_at` timestamp (most recent first)
    const sortedQuestions = [...allQuestions].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = Math.min(
      startIndex + questionsPerPage,
      sortedQuestions.length
    );
    const displayedQuestions = sortedQuestions.slice(startIndex, endIndex);
    setQuestionsToDisplay(displayedQuestions);

    // Pre-fetch answers for displayed questions
    displayedQuestions.forEach((question) => {
      if (!answersCache[question.question_id]) {
        fetchAnswersForQuestion(question.question_id);
      }
    });
  };

  // Fetch answers for a specific question
  const fetchAnswersForQuestion = async (questionId) => {
    try {
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

  // Get the latest answer for a question
  const getLatestAnswer = (questionId) => {
    const answers = answersCache[questionId] || [];
    if (answers.length === 0) return null;
    return answers.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    )[0];
  };

  // Handle pagination change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="recent-questions"
        role="tabpanel"
        aria-labelledby="recent-questions-tab"
      >
        <div>
          <div>
            {questionsToDisplay?.map((question) => {
              const answers = answersCache[question.question_id] || [];
              const latestAnswer = getLatestAnswer(question.question_id);
              const answerCount = answers.length;

              return (
                <div key={question.question_id}>
                  <div className="single-qa-box like-dislike">
                    <div className="d-flex">
                      <div className="link-unlike flex-shrink-0">
                        <span className="md:p-0 p-2">
                          <FaUser size={35} color="#000" />
                        </span>

                        <div className="donet-like-list">
                          <button className="like-unlink-count like">
                            <i className="ri-thumb-up-fill"></i>
                            <span>{question.upvotes}</span>
                          </button>
                        </div>

                        <div className="donet-like-list">
                          <button className="like-unlink-count dislike">
                            <i className="ri-thumb-down-fill"></i>
                            <span>{question.downvotes}</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex-grow-1 ms-3">
                        <ul className="graphic-design">
                          <li className="text-black">{decoded.username}</li>
                          <li>
                            <span>
                              Latest Answer:{" "}
                              {latestAnswer
                                ? new Date(
                                    latestAnswer.created_at
                                  ).toLocaleDateString()
                                : "No answers yet"}
                            </span>
                          </li>
                          <li>
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
                            <li>50 Vote</li>
                            <li>
                              {answerCount} Answer
                              {answerCount !== 1 ? "s" : ""}
                            </li>
                            <li>658 Views</li>
                            <li>
                              <ul className="qa-share">
                                <li className="share-option">
                                  <span>
                                    <i className="ri-share-fill"></i>
                                  </span>

                                  <ul className="social-icon">
                                    <li>
                                      <a
                                        href="https://www.facebook.com/"
                                        target="_blank"
                                      >
                                        <i className="ri-facebook-fill"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="https://www.twitter.com/"
                                        target="_blank"
                                      >
                                        <i className="ri-twitter-line"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="https://www.linkedin.com/"
                                        target="_blank"
                                      >
                                        <i className="ri-linkedin-fill"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="https://www.instagram.com/"
                                        target="_blank"
                                      >
                                        <i className="ri-instagram-line"></i>
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
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
    </>
  );
};

export default RecentQuestion;
